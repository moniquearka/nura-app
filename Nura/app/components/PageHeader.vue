<template>
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="text-slate-400">
        <slot name="icon" />
      </div>
      <h2 class="text-xl font-semibold text-slate-800">{{ title }}</h2>
    </div>
    <div v-if="$slots.actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
