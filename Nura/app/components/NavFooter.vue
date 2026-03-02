<template>
  <div class="nav-footer">
    <slot name="left" />
    <div class="nav-footer__right">
      <slot name="cancel">
        <button v-if="showCancel" class="btn btn--secondary" @click="$emit('cancel')">
          {{ cancelLabel }}
        </button>
      </slot>
      <slot name="confirm">
        <button class="btn btn--primary" @click="$emit('confirm')">
          {{ confirmLabel }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  confirmLabel?: string
  cancelLabel?: string
  showCancel?: boolean
}>(), {
  confirmLabel: 'Continuar',
  cancelLabel: 'Cancelar',
  showCancel: false,
})

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<style scoped>
.nav-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
  padding-top: 8px;
}

.btn {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s, background-color 0.15s;
  line-height: 1;
}

.btn--primary {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-color);
}

.btn--primary:hover {
  opacity: 0.85;
}

.btn--secondary {
  background-color: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.btn--secondary:hover {
  background-color: var(--bg-tab-active);
  color: var(--text-primary);
}
</style>
