<template>
  <div class="page-header">
    <div class="page-header__left">
      <div class="page-header__icon">
        <slot name="icon" />
      </div>
      <h2 class="page-header__title">{{ title }}</h2>
    </div>
    <div v-if="$slots.actions" class="page-header__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-header__left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-header__icon {
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

.page-header__title {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.page-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
