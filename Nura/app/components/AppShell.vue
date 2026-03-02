<template>
  <div class="flex h-screen bg-slate-100 overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-48 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <!-- Botão Voltar -->
      <div class="px-4 pt-5 pb-3">
        <button
          class="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors duration-150"
          @click="handleBack"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </div>

      <!-- Abas de navegação -->
      <nav class="flex-1 px-2 py-2 flex flex-col gap-0.5">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
          :class="activeTab === index
            ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 pl-[10px]'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'"
          @click="$emit('tab-change', index)"
        >
          {{ tab }}
        </button>
      </nav>
    </aside>

    <!-- Área principal de conteúdo -->
    <main ref="mainRef" class="flex-1 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: string[]
  activeTab: number
}>()

const emit = defineEmits<{
  (e: 'tab-change', index: number): void
}>()

const router = useRouter()
const mainRef = ref<HTMLElement | null>(null)

function handleBack() {
  if (props.activeTab === 0) {
    router.push('/')
  } else {
    emit('tab-change', props.activeTab - 1)
  }
}

// Scroll ao topo ao trocar de aba
watch(() => props.activeTab, () => {
  mainRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
