<template>
  <input
    v-bind="$attrs"
    class="file:text-foreground placeholder:text-muted-foreground border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
  />
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>
