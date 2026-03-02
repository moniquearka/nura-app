<template>
  <div class="field-item">
    <span class="field-item__label">{{ label }}</span>
    <span class="field-item__value">{{ value || '—' }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value?: string
}>()
</script>

<style scoped>
.field-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.field-item__label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  line-height: 1.4;
}

.field-item__value {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.4;
}
</style>
