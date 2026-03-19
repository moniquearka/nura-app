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
        <h1 class="list-header__title">Propostas Geradas</h1>
        <p class="list-header__subtitle">
          Acompanhe o status das propostas geradas para o seu cliente
        </p>
      </div>
    </div>

    <!-- ── Tabela de propostas ─────────────────────────────────────────── -->
    <div class="list-card">
      <div class="table-wrapper">
        <table class="proposals-table">
          <thead>
            <tr>
              <th class="col-proposal">Solicitações Geradas</th>
              <th class="col-products">Produtos Selecionados</th>
              <th class="col-type">Tipo de Solicitação</th>
              <th class="col-date">Data de Emissão</th>
              <th class="col-value">Valor Total do Estudo</th>
              <th class="col-status-prev">Status — Previdência</th>
              <th class="col-status-seg">Status — Seguro de Vida</th>
              <th class="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="proposal in proposals"
              :key="proposal.id"
              class="proposal-row"
            >
              <!-- Solicitação Gerada -->
              <td class="col-proposal">
                <span class="proposal-name">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="proposal-name__icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ proposal.name }}
                </span>
              </td>

              <!-- Produtos Selecionados -->
              <td class="col-products">
                <span class="product-badge" :class="productBadgeClass(proposal.products)">
                  {{ proposal.products }}
                </span>
              </td>

              <!-- Tipo de Solicitação -->
              <td class="col-type">
                <span class="type-badge" :class="typeBadgeClass(proposal.type)">
                  {{ proposal.type }}
                </span>
              </td>

              <!-- Data de Emissão -->
              <td class="col-date">
                <span class="cell-value">{{ proposal.date }}</span>
              </td>

              <!-- Valor Total -->
              <td class="col-value">
                <span class="cell-value">{{ proposal.totalValue }}</span>
              </td>

              <!-- Status — Previdência -->
              <td class="col-status-prev">
                <template v-if="showStatusPrev(proposal)">
                  <div class="status-cell" @click.stop>
                    <select
                      v-model="proposal.statusPrev"
                      class="status-select"
                      :class="statusPrevClass(proposal.statusPrev)"
                      @change="onStatusPrevChange(proposal)"
                    >
                      <option value="">— Selecionar —</option>
                      <option value="assinatura-andamento">Assinatura em andamento</option>
                      <option value="assinatura-concluida">Assinatura Concluída</option>
                      <option value="pendente-pagamento">Pendente de Pagamento</option>
                      <option value="pagamento-concluido">Pagamento Concluído</option>
                      <option value="contratacao-implementada">Contratação Implementada</option>
                    </select>
                  </div>
                </template>
                <template v-else>
                  <span class="cell-empty">—</span>
                </template>
              </td>

              <!-- Status — Seguro de Vida -->
              <td class="col-status-seg">
                <template v-if="showStatusSeg(proposal)">
                  <div class="status-cell" @click.stop>
                    <select
                      v-model="proposal.statusSeg"
                      class="status-select"
                      :class="statusSegClass(proposal.statusSeg)"
                      @change="onStatusSegChange(proposal)"
                    >
                      <option value="">— Selecionar —</option>
                      <option value="assinatura-andamento">Assinatura em andamento</option>
                      <option value="assinatura-concluida">Assinatura Concluída</option>
                      <option value="pendente-pagamento">Pendente de Pagamento</option>
                      <option value="pagamento-concluido">Pagamento Concluído</option>
                      <option value="implementacao-simplificada">Implementação Simplificada</option>
                      <option value="dps-pendente">DPS Pendente</option>
                      <option value="tele-entrevista-pendente">Tele Entrevista Pendente</option>
                      <option value="implementacao-andamento">Implementação em andamento</option>
                      <option value="contratacao-implementada">Contratação Implementada</option>
                    </select>
                  </div>
                </template>
                <template v-else>
                  <span class="cell-empty">—</span>
                </template>
              </td>

              <!-- Ações: apenas Baixar PDF -->
              <td class="col-actions" @click.stop>
                <div class="action-btns">
                  <button class="action-btn" title="Baixar PDF" @click.stop="downloadPdf(proposal)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="action-btn__label">Baixar</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Estado vazio -->
      <div v-if="proposals.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2" class="empty-state__icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>Nenhuma proposta gerada ainda.</p>
      </div>
    </div>

    <!-- ── Modal: Tele Entrevista Pendente ──────────────────────────── -->
    <Transition name="modal-fade">
      <div v-if="showTeleEntrevistaModal" class="modal-overlay" @click.self="showTeleEntrevistaModal = false">
        <div class="modal-box">
          <div class="modal-box__header">
            <h3 class="modal-box__title">Tele Entrevista Pendente</h3>
            <button class="modal-box__close" @click="showTeleEntrevistaModal = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="modal-box__body">
            <div class="modal-box__icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p class="modal-box__message">
              O Proponente receberá uma ligação do número de telefone <strong>(11) 3154-3322</strong> após a assinatura da proposta, para agendamento da Tele Entrevista.
            </p>
          </div>
          <div class="modal-box__footer">
            <button class="btn-modal-ok" @click="showTeleEntrevistaModal = false">Entendido</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">

// Link do Icatu Sign (placeholder)
const ICATU_SIGN_URL = 'https://icatusign.com.br/assinar'
// Link DPS parceiro externo (placeholder)
const DPS_URL = 'https://dps.parceiro.com.br/preencher'

interface Proposal {
  id: number
  name: string
  products: 'Previdência' | 'Seguro de Vida' | 'Previdência + Seguro de Vida'
  type: 'Estudo + Proposta' | 'Proposta sem Estudo' | 'Portabilidade'
  date: string
  totalValue: string
  pdfFile: string
  statusPrev: string
  statusSeg: string
}

const proposals = ref<Proposal[]>([
  {
    id: 1,
    name: 'Proposta Taís Oliveira Costa — v1',
    products: 'Previdência + Seguro de Vida',
    type: 'Estudo + Proposta',
    date: '19/03/2026',
    totalValue: 'R$ 4.150,00',
    pdfFile: 'proposta-v1.pdf',
    statusPrev: '',
    statusSeg: '',
  },
  {
    id: 2,
    name: 'Proposta Taís Oliveira Costa — v2',
    products: 'Previdência',
    type: 'Proposta sem Estudo',
    date: '19/03/2026',
    totalValue: 'R$ 1.650,00',
    pdfFile: 'proposta-v2.pdf',
    statusPrev: '',
    statusSeg: '',
  },
  {
    id: 3,
    name: 'Portabilidade Taís Oliveira Costa — v1',
    products: 'Previdência',
    type: 'Portabilidade',
    date: '19/03/2026',
    totalValue: 'R$ 1.650,00',
    pdfFile: 'portabilidade-v1.pdf',
    statusPrev: '',
    statusSeg: '',
  },
])

const showTeleEntrevistaModal = ref(false)

// ── Regras de visibilidade das colunas de status ──────────────────────────

function showStatusPrev(p: Proposal): boolean {
  // Status Previdência não aparece quando Produtos = "Seguro de Vida"
  if (p.products === 'Seguro de Vida') return false
  return true
}

function showStatusSeg(p: Proposal): boolean {
  // Status Seguro de Vida não aparece quando:
  // - Tipo = "Proposta sem Estudo" ou "Portabilidade"
  // - Tipo = "Estudo + Proposta" com Produtos = "Previdência"
  if (p.type === 'Proposta sem Estudo' || p.type === 'Portabilidade') return false
  if (p.type === 'Estudo + Proposta' && p.products === 'Previdência') return false
  return true
}

// ── Handlers de mudança de status ────────────────────────────────────────

function onStatusPrevChange(p: Proposal) {
  if (p.statusPrev === 'assinatura-andamento' || p.statusPrev === 'assinatura-concluida') {
    window.open(ICATU_SIGN_URL, '_blank', 'noopener,noreferrer')
  }
}

function onStatusSegChange(p: Proposal) {
  if (p.statusSeg === 'assinatura-andamento' || p.statusSeg === 'assinatura-concluida') {
    window.open(ICATU_SIGN_URL, '_blank', 'noopener,noreferrer')
  } else if (p.statusSeg === 'dps-pendente') {
    window.open(DPS_URL, '_blank', 'noopener,noreferrer')
  } else if (p.statusSeg === 'tele-entrevista-pendente') {
    showTeleEntrevistaModal.value = true
  }
}

// ── Classes de badge ──────────────────────────────────────────────────────

function productBadgeClass(products: string) {
  if (products === 'Previdência + Seguro de Vida') return 'product-badge--both'
  if (products === 'Seguro de Vida') return 'product-badge--seguro'
  return 'product-badge--prev'
}

function typeBadgeClass(type: string) {
  if (type === 'Portabilidade') return 'type-badge--port'
  if (type === 'Proposta sem Estudo') return 'type-badge--sem-estudo'
  return 'type-badge--com-estudo'
}

function statusPrevClass(status: string) {
  if (!status) return 'status-select--empty'
  if (status === 'contratacao-implementada') return 'status-select--success'
  if (status === 'assinatura-concluida' || status === 'pagamento-concluido') return 'status-select--done'
  if (status === 'pendente-pagamento') return 'status-select--warning'
  return 'status-select--info'
}

function statusSegClass(status: string) {
  if (!status) return 'status-select--empty'
  if (status === 'contratacao-implementada') return 'status-select--success'
  if (status === 'assinatura-concluida' || status === 'pagamento-concluido' || status === 'implementacao-simplificada') return 'status-select--done'
  if (status === 'pendente-pagamento' || status === 'dps-pendente' || status === 'tele-entrevista-pendente') return 'status-select--warning'
  if (status === 'implementacao-andamento') return 'status-select--info'
  return 'status-select--info'
}

// ── Download PDF ──────────────────────────────────────────────────────────

async function downloadPdf(proposal: Proposal) {
  try {
    const baseUrl = '/nura-app/pdfs/'
    const response = await fetch(baseUrl + proposal.pdfFile)
    if (!response.ok) throw new Error('PDF não encontrado')
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = proposal.pdfFile
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Erro ao baixar PDF:', err)
    alert('Erro ao baixar o PDF. Tente novamente.')
  }
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

.table-wrapper {
  overflow-x: auto;
}

/* ── Tabela ──────────────────────────────────────────────────────────────── */
.proposals-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-sans);
  min-width: 1100px;
}

.proposals-table thead tr {
  border-bottom: 1px solid var(--border-color);
}

.proposals-table th {
  padding: 12px 14px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  text-align: left;
  background-color: #f8fafc;
  white-space: nowrap;
}

.proposals-table th.col-actions { width: 70px; text-align: right; }
.proposals-table th.col-status-prev,
.proposals-table th.col-status-seg { min-width: 200px; }
.proposals-table th.col-type { min-width: 160px; }

/* ── Linhas ──────────────────────────────────────────────────────────────── */
.proposal-row {
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.12s;
}

.proposal-row:last-child { border-bottom: none; }
.proposal-row:hover { background-color: #f8fafc; }

.proposal-row td {
  padding: 12px 14px;
  vertical-align: middle;
}

.proposal-row td.col-actions { text-align: right; }

/* ── Nome da proposta ────────────────────────────────────────────────────── */
.proposal-name {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}
.proposal-name__icon { color: var(--text-muted); flex-shrink: 0; }

/* ── Badge de produto ────────────────────────────────────────────────────── */
.product-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}
.product-badge--prev  { background-color: #eff6ff; color: #1d4ed8; }
.product-badge--seguro { background-color: #f0fdf4; color: #15803d; }
.product-badge--both  { background-color: #faf5ff; color: #7e22ce; }

/* ── Badge de tipo de solicitação ────────────────────────────────────────── */
.type-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}
.type-badge--com-estudo  { background-color: #fff7ed; color: #c2410c; }
.type-badge--sem-estudo  { background-color: #f0f9ff; color: #0369a1; }
.type-badge--port        { background-color: #f0fdf4; color: #15803d; }

/* ── Valores de célula ───────────────────────────────────────────────────── */
.cell-value {
  font-size: 14px;
  color: var(--text-primary);
}
.cell-empty {
  font-size: 14px;
  color: var(--text-muted);
}

/* ── Select de status ────────────────────────────────────────────────────── */
.status-cell {
  display: flex;
  align-items: center;
}

.status-select {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  outline: none;
  cursor: pointer;
  width: 100%;
  min-width: 180px;
  transition: border-color 0.15s, background-color 0.15s;
  appearance: auto;
}
.status-select:focus { border-color: var(--btn-primary-bg); }

.status-select--empty     { background-color: #f8fafc; color: var(--text-muted); }
.status-select--info      { background-color: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
.status-select--done      { background-color: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
.status-select--warning   { background-color: #fffbeb; color: #b45309; border-color: #fde68a; }
.status-select--success   { background-color: #f0fdf4; color: #166534; border-color: #86efac; font-weight: 600; }

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

/* ── Modal ───────────────────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 440px;
  margin: 24px;
  overflow: hidden;
}

.modal-box__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border-color);
}

.modal-box__title {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.modal-box__close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: color 0.12s;
}
.modal-box__close:hover { color: var(--text-primary); }

.modal-box__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.modal-box__icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #eff6ff;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-box__message {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
}

.modal-box__footer {
  padding: 16px 24px 20px;
  display: flex;
  justify-content: center;
}

.btn-modal-ok {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  padding: 10px 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-color);
  transition: opacity 0.15s;
}
.btn-modal-ok:hover { opacity: 0.85; }

/* ── Transição do modal ──────────────────────────────────────────────────── */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
