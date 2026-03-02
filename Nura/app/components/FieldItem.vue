<template>
  <div class="flex flex-col gap-0.5">
    <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{{ label }}</span>
    <span class="text-sm text-slate-800 font-medium">{{ value || '—' }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value?: string
}>()
</script>
