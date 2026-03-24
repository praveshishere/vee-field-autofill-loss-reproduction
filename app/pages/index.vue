<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'


const router = useRouter()
const email = useState<string>('user-email')
const apiError = ref('')

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  apiError.value = ''
  try {
    const data = await $fetch('/api/login', {
      method: 'POST',
      body: { email: values.email, password: values.password },
    })
    email.value = data.user.email
    router.push('/dashboard')
  }
  catch (err: any) {
    apiError.value = err?.data?.message ?? 'Something went wrong'
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <div class="w-full max-w-sm space-y-6 border rounded-xl p-8 shadow-sm bg-card">
      <div class="space-y-1 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p class="text-sm text-muted-foreground">
          Enter your credentials to continue
        </p>
      </div>

      <form class="space-y-4" @submit="onSubmit">
        <!-- Email -->
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="you@example.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Password -->
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="••••••••"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <p v-if="apiError" class="text-sm text-destructive text-center">
          {{ apiError }}
        </p>

        <Button type="submit" class="w-full" :disabled="isSubmitting">
          {{ isSubmitting ? 'Signing in…' : 'Sign In' }}
        </Button>
      </form>
    </div>
  </div>
</template>
