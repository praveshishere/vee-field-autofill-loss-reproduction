<script setup lang="ts">
definePageMeta({ ssr: false });

import { Button } from "@/components/ui/button";

const router = useRouter();
const email = useState<string>("user-email");
const apiError = ref("");

const isSubmitting = ref(false);

const onSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  apiError.value = "";
  isSubmitting.value = true;
  try {
    const data = await $fetch<{
      user: { email: string };
    }>("/api/login", {
      method: "POST",
      body: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });
    email.value = data.user.email;
    router.push("/dashboard");
  } catch (err: any) {
    apiError.value = err?.data?.message ?? "Something went wrong";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <div
      class="w-full max-w-sm space-y-6 border rounded-xl p-8 shadow-sm bg-card"
    >
      <div class="space-y-1 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p class="text-sm text-muted-foreground">
          Enter your credentials to continue
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <!-- Email -->

        <UiInput type="email" name="email" placeholder="you@example.com" />

        <MyInput type="password" name="password" placeholder="••••••••" />

        <p v-if="apiError" class="text-sm text-destructive text-center">
          {{ apiError }}
        </p>

        <Button type="submit" class="w-full" :disabled="isSubmitting">
          {{ isSubmitting ? "Signing in…" : "Sign In" }}
        </Button>
      </form>
    </div>
  </div>
</template>
