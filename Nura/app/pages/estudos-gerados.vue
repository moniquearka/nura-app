<template>
  <div class="list-screen">
    <!-- ── Botão Voltar ──────────────────────────────────────────────── -->
    <div class="list-topbar">
      <button class="back-btn" @click="navigateTo('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>
    </div>

    <!-- ── Cabeçalho ─────────────────────────────────────────────────── -->
    <div class="list-header">
      <div class="list-header__left">
        <h1 class="list-header__title">Estudos Gerados</h1>
        <p class="list-header__subtitle">
          Verifique os Estudos gerados para o seu cliente e gere a proposta com o que ele mais se identificou
        </p>
      </div>
    </div>

    <!-- ── Tabela de estudos ─────────────────────────────────────────── -->
    <div class="list-card">
      <table class="studies-table">
        <thead>
          <tr>
            <th class="col-check"></th>
            <th class="col-study">Estudo Gerado</th>
            <th class="col-products">Produtos Selecionados</th>
            <th class="col-date">Data de Emissão</th>
            <th class="col-value">Valor Total do Estudo</th>
            <th class="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="study in studies"
            :key="study.id"
            class="study-row"
            :class="{ 'study-row--selected': selectedId === study.id }"
            @click="toggleSelect(study.id)"
          >
            <!-- Checkbox -->
            <td class="col-check">
              <span class="row-checkbox" :class="{ 'row-checkbox--checked': selectedId === study.id }">
                <svg v-if="selectedId === study.id" xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </td>

            <!-- Estudo Gerado (link PDF) -->
            <td class="col-study">
              <a href="#" class="study-link" @click.stop="downloadPdf(study)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="study-link__icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ study.name }}
              </a>
            </td>

            <!-- Produtos Selecionados -->
            <td class="col-products">
              <span class="product-badge" :class="productBadgeClass(study.products)">
                {{ study.products }}
              </span>
            </td>

            <!-- Data de Emissão -->
            <td class="col-date">
              <span class="cell-value">{{ study.date }}</span>
            </td>

            <!-- Valor Total do Estudo -->
            <td class="col-value">
              <span class="cell-value">{{ study.totalValue }}</span>
            </td>

            <!-- Ações -->
            <td class="col-actions" @click.stop>
              <div class="action-btns">
                <button class="action-btn action-btn--delete" title="Excluir" @click="deleteStudy(study.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span class="action-btn__label">Excluir</span>
                </button>
                <button class="action-btn" title="Duplicar" @click="duplicateStudy(study)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span class="action-btn__label">Duplicar</span>
                </button>
                <button class="action-btn" title="Editar" @click.stop="editStudy(study.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span class="action-btn__label">Editar</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Estado vazio -->
      <div v-if="studies.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2" class="empty-state__icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>Nenhum estudo gerado ainda.</p>
      </div>
    </div>

    <!-- ── Rodapé com botão Gerar Proposta ───────────────────────────── -->
    <Transition name="footer-slide">
      <div v-if="selectedId !== null" class="list-footer">
        <button class="btn-gerar-proposta" @click="gerarProposta">
          Gerar Proposta
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Study {
  id: number
  name: string
  products: 'Previdência' | 'Seguro de Vida' | 'Previdência + Seguro de Vida'
  date: string
  totalValue: string
}

const studies = ref<Study[]>([
  { id: 1, name: 'Estudo Taís Oliveira Costa — v1', products: 'Previdência + Seguro de Vida', date: '02/03/2026', totalValue: 'R$ 4.150,00' },
  { id: 2, name: 'Estudo Taís Oliveira Costa — v2', products: 'Previdência', date: '02/03/2026', totalValue: 'R$ 1.650,00' },
])

const selectedId = ref<number | null>(null)
const router = useRouter()

function toggleSelect(id: number) {
  selectedId.value = selectedId.value === id ? null : id
}

function productBadgeClass(products: string) {
  if (products === 'Previdência + Seguro de Vida') return 'product-badge--both'
  if (products === 'Seguro de Vida') return 'product-badge--seguro'
  return 'product-badge--prev'
}

function downloadPdf(study: Study) {
  alert(`Download do PDF: ${study.name}`)
}

function deleteStudy(id: number) {
  if (confirm('Deseja excluir este estudo?')) {
    studies.value = studies.value.filter(s => s.id !== id)
    if (selectedId.value === id) selectedId.value = null
  }
}

function duplicateStudy(study: Study) {
  const newId = Math.max(...studies.value.map(s => s.id)) + 1
  const today = new Date().toLocaleDateString('pt-BR')
  studies.value.push({
    id: newId,
    name: study.name + ' (cópia)',
    products: study.products,
    date: today,
    totalValue: study.totalValue,
  })
}

function editStudy(_id: number) {
  window.open('https://aliaplan.zooxsmart.com/', '_blank')
}

function gerarProposta() {
  router.push('/proposta')
}
</script>

<style scoped>
/* ── Tela geral ──────────────────────────────────────────────────────────── */
.list-screen {
  min-height: 100vh;
  background-color: var(--bg-app);
  padding: 0 0 100px;
  position: relative;
}

/* ── Topbar com Voltar ───────────────────────────────────────────────────── */
.list-topbar {
  padding: 16px 48px 0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
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
.back-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-tab-active);
}

/* ── Cabeçalho ───────────────────────────────────────────────────────────── */
.list-header {
  padding: 16px 48px 24px;
}

.list-header__title {
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
  line-height: 1.2;
}

.list-header__subtitle {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

/* ── Card da tabela ──────────────────────────────────────────────────────── */
.list-card {
  margin: 0 48px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

/* ── Tabela ──────────────────────────────────────────────────────────────── */
.studies-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-sans);
}

.studies-table thead tr {
  border-bottom: 1px solid var(--border-color);
}

.studies-table th {
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  text-align: left;
  background-color: #f8fafc;
}

.studies-table th.col-check { width: 44px; padding-right: 0; }
.studies-table th.col-actions { width: 200px; text-align: right; }

/* ── Linhas ──────────────────────────────────────────────────────────────── */
.study-row {
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.12s;
}

.study-row:last-child { border-bottom: none; }

.study-row:hover { background-color: #f8fafc; }
.study-row--selected { background-color: #f0f4ff; }

.study-row td {
  padding: 14px 16px;
  vertical-align: middle;
}

.study-row td.col-check { padding-right: 0; }
.study-row td.col-actions { text-align: right; }

/* ── Checkbox ────────────────────────────────────────────────────────────── */
.row-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid #cbd5e1;
  background: white;
  transition: border-color 0.12s, background-color 0.12s;
  flex-shrink: 0;
}
.row-checkbox--checked {
  border-color: var(--btn-primary-bg);
  background-color: var(--btn-primary-bg);
  color: white;
}

/* ── Link do estudo (PDF) ────────────────────────────────────────────────── */
.study-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.12s;
}
.study-link:hover { color: #3b82f6; text-decoration: underline; }
.study-link__icon { color: var(--text-muted); flex-shrink: 0; }

/* ── Badge de produto ────────────────────────────────────────────────────── */
.product-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}
.product-badge--prev {
  background-color: #eff6ff;
  color: #1d4ed8;
}
.product-badge--seguro {
  background-color: #f0fdf4;
  color: #15803d;
}
.product-badge--both {
  background-color: #faf5ff;
  color: #7e22ce;
}

/* ── Valores de célula ───────────────────────────────────────────────────── */
.cell-value {
  font-size: 14px;
  color: var(--text-primary);
}

/* ── Botões de ação ──────────────────────────────────────────────────────── */
.action-btns {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
}

.action-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  border-radius: 6px;
  transition: background-color 0.12s, color 0.12s;
  font-family: var(--font-sans);
}
.action-btn:hover {
  background-color: var(--bg-tab-active);
  color: var(--text-primary);
}
.action-btn--delete:hover {
  background-color: #fef2f2;
  color: #ef4444;
}
.action-btn__label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

/* ── Estado vazio ────────────────────────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 24px;
  color: var(--text-muted);
}
.empty-state__icon { opacity: 0.4; }
.empty-state p { font-size: 14px; margin: 0; }

/* ── Rodapé flutuante ────────────────────────────────────────────────────── */
.list-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  padding: 16px 48px;
  background-color: rgba(241, 245, 249, 0.95);
  backdrop-filter: blur(4px);
  border-top: 1px solid var(--border-color);
  z-index: 50;
}

.btn-gerar-proposta {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-color);
  transition: opacity 0.15s;
  line-height: 1;
}
.btn-gerar-proposta:hover { opacity: 0.85; }

/* ── Transição do rodapé ─────────────────────────────────────────────────── */
.footer-slide-enter-active,
.footer-slide-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.footer-slide-enter-from,
.footer-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
