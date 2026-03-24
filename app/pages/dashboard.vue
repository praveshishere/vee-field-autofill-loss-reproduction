<script setup lang="ts">
const email = useState<string>('user-email')

const cards = [
  { label: 'Total Users', value: '1,284' },
  { label: 'Revenue', value: '$48,200' },
  { label: 'Active Sessions', value: '37' },
]
</script>

<template>
  <div class="min-h-screen bg-background p-8">
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="border rounded-xl p-6 bg-card shadow-sm">
        <h1 class="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p class="text-sm text-muted-foreground mt-1">
          Welcome back, <span class="font-medium text-foreground">{{ email }}</span>
        </p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="border rounded-xl p-5 bg-card shadow-sm space-y-1"
        >
          <p class="text-sm text-muted-foreground">{{ card.label }}</p>
          <p class="text-2xl font-bold">{{ card.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
