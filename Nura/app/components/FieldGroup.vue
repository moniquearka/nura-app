<template>
  <div class="field-group">
    <slot />
  </div>
</template>

<style scoped>
.field-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 16px;
  column-gap: 24px;
}

@media (max-width: 900px) {
  .field-group {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .field-group {
    grid-template-columns: 1fr;
  }
}
</style>
