<template>
  <div class="section-card">
    <!-- Cabeçalho da seção -->
    <div v-if="title" class="section-card__header">
      <div class="section-card__icon">
        <slot name="icon" />
      </div>
      <h3 class="section-card__title">{{ title }}</h3>
    </div>
    <!-- Conteúdo -->
    <div class="section-card__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped>
.section-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.section-card__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.section-card__icon {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.section-card__title {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.section-card__body {
  /* herda do pai */
}
</style>
