<template>
  <div class="app-shell">
    <!-- ── Sidebar ─────────────────────────────────────────────────────── -->
    <aside class="sidebar">
      <!-- Logo ALIA -->
      <div class="sidebar-logo">
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031821263/MgbGpHqkCRImoSLY.png"
          alt="ALIA"
          class="sidebar-logo-img"
        />
      </div>

      <!-- Botão Voltar -->
      <button class="sidebar-back" @click="handleBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>

      <!-- Abas de navegação com sub-abas -->
      <nav class="sidebar-nav">
        <template v-for="(tab, index) in tabs" :key="index">
          <!-- Aba principal -->
          <button
            class="sidebar-tab"
            :class="{ 'sidebar-tab--active': activeTab === index && !tab.subTabs }"
            @click="handleTabClick(index)"
          >
            {{ tab.label }}
          </button>

          <!-- Sub-abas (visíveis quando a aba pai está ativa) -->
          <template v-if="tab.subTabs && activeTab === index">
            <button
              v-for="(sub, subIndex) in tab.subTabs"
              :key="`sub-${subIndex}`"
              class="sidebar-subtab"
              :class="{ 'sidebar-subtab--active': activeSubTab === subIndex }"
              @click="$emit('subtab-change', subIndex)"
            >
              {{ sub }}
            </button>
          </template>
        </template>
      </nav>
    </aside>

    <!-- ── Área principal ──────────────────────────────────────────────── -->
    <main ref="mainRef" class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  label: string
  subTabs?: string[]
}

const props = defineProps<{
  tabs: Tab[]
  activeTab: number
  activeSubTab?: number
  backTo?: string
}>()

const emit = defineEmits<{
  (e: 'tab-change', index: number): void
  (e: 'subtab-change', index: number): void
}>()

const router = useRouter()
const mainRef = ref<HTMLElement | null>(null)

function handleTabClick(index: number) {
  emit('tab-change', index)
  // Se a aba tem sub-abas, resetar para a primeira
  if (props.tabs[index].subTabs) {
    emit('subtab-change', 0)
  }
}

function handleBack() {
  if (props.activeTab === 0) {
    router.push(props.backTo || '/')
  } else {
    emit('tab-change', props.activeTab - 1)
  }
}

watch(() => props.activeTab, () => {
  nextTick(() => {
    mainRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  })
})
</script>

<style scoped>
/* ── Shell container ──────────────────────────────────────────────────────── */
.app-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-app);
}

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-logo {
  padding: 20px 20px 16px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-logo-img {
  height: 28px;
  width: auto;
  object-fit: contain;
}

.sidebar-back {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  margin: 12px 12px 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
  border-radius: 6px;
  transition: color 0.15s, background-color 0.15s;
}

.sidebar-back:hover {
  color: var(--text-primary);
  background-color: var(--bg-tab-active);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 12px 16px;
}

.sidebar-tab {
  width: 100%;
  text-align: left;
  padding: 9px 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
  border-radius: 6px;
  transition: color 0.15s, background-color 0.15s, font-weight 0.1s;
  line-height: 1.4;
}

.sidebar-tab:hover {
  background-color: var(--bg-tab-active);
  color: var(--text-primary);
}

.sidebar-tab--active {
  background-color: var(--bg-tab-active);
  color: var(--text-primary);
  font-weight: 600;
}

/* ── Sub-abas ─────────────────────────────────────────────────────────────── */
.sidebar-subtab {
  width: 100%;
  text-align: left;
  padding: 7px 10px 7px 22px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  border-radius: 6px;
  transition: color 0.15s, background-color 0.15s;
  line-height: 1.4;
  position: relative;
}

.sidebar-subtab::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--text-muted);
  opacity: 0.5;
}

.sidebar-subtab:hover {
  background-color: var(--bg-tab-active);
  color: var(--text-primary);
}

.sidebar-subtab--active {
  background-color: var(--bg-tab-active);
  color: var(--text-primary);
  font-weight: 600;
}

.sidebar-subtab--active::before {
  background-color: var(--btn-primary-bg);
  opacity: 1;
}

/* ── Main content ─────────────────────────────────────────────────────────── */
.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--bg-app);
}
</style>
