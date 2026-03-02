<template>
  <div class="bg-white border border-slate-200 rounded-xl p-6 mb-4">
    <!-- Cabeçalho da seção -->
    <div v-if="title" class="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
      <div v-if="icon" class="text-slate-400">
        <slot name="icon" />
      </div>
      <h3 class="text-base font-semibold text-slate-800">{{ title }}</h3>
    </div>
    <!-- Conteúdo -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  icon?: boolean
}>()
</script>
