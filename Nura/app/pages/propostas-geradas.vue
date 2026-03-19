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
              <th class="col-products">Produtos</th>
              <th class="col-type">Tipo de Solicitação</th>
              <th class="col-date">Proposta Gerada em</th>
              <th class="col-value">Valor Total</th>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="proposal-name__icon">
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
                  <button
                    class="status-tag"
                    :class="statusPrevClass(proposal.statusPrev)"
                    @click.stop="onStatusPrevClick(proposal)"
                    :title="statusPrevLabel(proposal.statusPrev)"
                  >
                    {{ statusPrevLabel(proposal.statusPrev) }}
                  </button>
                </template>
                <template v-else>
                  <span class="cell-empty">—</span>
                </template>
              </td>

              <!-- Status — Seguro de Vida -->
              <td class="col-status-seg">
                <template v-if="showStatusSeg(proposal)">
                  <button
                    class="status-tag"
                    :class="statusSegClass(proposal.statusSeg)"
                    @click.stop="onStatusSegClick(proposal)"
                    :title="statusSegLabel(proposal.statusSeg)"
                  >
                    {{ statusSegLabel(proposal.statusSeg) }}
                  </button>
                </template>
                <template v-else>
                  <span class="cell-empty">—</span>
                </template>
              </td>

              <!-- Ações: apenas Baixar PDF -->
              <td class="col-actions" @click.stop>
                <div class="action-btns">
                  <button class="action-btn" title="Baixar PDF" @click.stop="downloadPdf(proposal)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
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

// Dados de exemplo cobrindo todas as combinações de status visíveis
const proposals = ref<Proposal[]>([
  {
    id: 1,
    name: 'Proposta Taís Oliveira Costa — v1',
    products: 'Previdência + Seguro de Vida',
    type: 'Estudo + Proposta',
    date: '19/03/2026',
    totalValue: 'R$ 4.150,00',
    pdfFile: 'proposta-v1.pdf',
    statusPrev: 'assinatura-andamento',
    statusSeg: 'assinatura-andamento',
  },
  {
    id: 2,
    name: 'Proposta Taís Oliveira Costa — v2',
    products: 'Previdência + Seguro de Vida',
    type: 'Estudo + Proposta',
    date: '18/03/2026',
    totalValue: 'R$ 4.150,00',
    pdfFile: 'proposta-v2.pdf',
    statusPrev: 'assinatura-concluida',
    statusSeg: 'dps-pendente',
  },
  {
    id: 3,
    name: 'Proposta Taís Oliveira Costa — v3',
    products: 'Previdência + Seguro de Vida',
    type: 'Estudo + Proposta',
    date: '17/03/2026',
    totalValue: 'R$ 4.150,00',
    pdfFile: 'proposta-v3.pdf',
    statusPrev: 'pendente-pagamento',
    statusSeg: 'tele-entrevista-pendente',
  },
  {
    id: 4,
    name: 'Proposta Taís Oliveira Costa — v4',
    products: 'Previdência + Seguro de Vida',
    type: 'Estudo + Proposta',
    date: '16/03/2026',
    totalValue: 'R$ 4.150,00',
    pdfFile: 'proposta-v4.pdf',
    statusPrev: 'pagamento-concluido',
    statusSeg: 'implementacao-simplificada',
  },
  {
    id: 5,
    name: 'Proposta Taís Oliveira Costa — v5',
    products: 'Previdência + Seguro de Vida',
    type: 'Estudo + Proposta',
    date: '15/03/2026',
    totalValue: 'R$ 4.150,00',
    pdfFile: 'proposta-v5.pdf',
    statusPrev: 'contratacao-implementada',
    statusSeg: 'implementacao-andamento',
  },
  {
    id: 6,
    name: 'Proposta Taís Oliveira Costa — v6',
    products: 'Previdência + Seguro de Vida',
    type: 'Estudo + Proposta',
    date: '14/03/2026',
    totalValue: 'R$ 4.150,00',
    pdfFile: 'proposta-v6.pdf',
    statusPrev: 'contratacao-implementada',
    statusSeg: 'contratacao-implementada',
  },
  {
    id: 7,
    name: 'Proposta Taís Oliveira Costa — Prev',
    products: 'Previdência',
    type: 'Proposta sem Estudo',
    date: '13/03/2026',
    totalValue: 'R$ 1.650,00',
    pdfFile: 'proposta-prev.pdf',
    statusPrev: 'assinatura-andamento',
    statusSeg: '',
  },
  {
    id: 8,
    name: 'Portabilidade Taís Oliveira Costa — v1',
    products: 'Previdência',
    type: 'Portabilidade',
    date: '12/03/2026',
    totalValue: 'R$ 1.650,00',
    pdfFile: 'portabilidade-v1.pdf',
    statusPrev: 'pendente-pagamento',
    statusSeg: '',
  },
])

const showTeleEntrevistaModal = ref(false)

// ── Visibilidade das colunas de status ────────────────────────────────────

function showStatusPrev(p: Proposal): boolean {
  if (p.products === 'Seguro de Vida') return false
  return true
}

function showStatusSeg(p: Proposal): boolean {
  if (p.type === 'Proposta sem Estudo' || p.type === 'Portabilidade') return false
  if (p.type === 'Estudo + Proposta' && p.products === 'Previdência') return false
  return true
}

// ── Labels de status ──────────────────────────────────────────────────────

const STATUS_PREV_LABELS: Record<string, string> = {
  '': 'Aguardando',
  'assinatura-andamento': 'Assinatura em andamento',
  'assinatura-concluida': 'Assinatura Concluída',
  'pendente-pagamento': 'Pendente de Pagamento',
  'pagamento-concluido': 'Pagamento Concluído',
  'contratacao-implementada': 'Contratação Implementada',
}

const STATUS_SEG_LABELS: Record<string, string> = {
  '': 'Aguardando',
  'assinatura-andamento': 'Assinatura em andamento',
  'assinatura-concluida': 'Assinatura Concluída',
  'pendente-pagamento': 'Pendente de Pagamento',
  'pagamento-concluido': 'Pagamento Concluído',
  'implementacao-simplificada': 'Implementação Simplificada',
  'dps-pendente': 'DPS Pendente',
  'tele-entrevista-pendente': 'Tele Entrevista Pendente',
  'implementacao-andamento': 'Implementação em andamento',
  'contratacao-implementada': 'Contratação Implementada',
}

function statusPrevLabel(status: string): string {
  return STATUS_PREV_LABELS[status] ?? status
}

function statusSegLabel(status: string): string {
  return STATUS_SEG_LABELS[status] ?? status
}

// ── Handlers de clique nas tags de status ─────────────────────────────────

function onStatusPrevClick(p: Proposal) {
  if (p.statusPrev === 'assinatura-andamento' || p.statusPrev === 'assinatura-concluida') {
    window.open(ICATU_SIGN_URL, '_blank', 'noopener,noreferrer')
  }
}

function onStatusSegClick(p: Proposal) {
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
  if (!status) return 'status-tag--waiting'
  if (status === 'contratacao-implementada') return 'status-tag--done'
  if (status === 'assinatura-concluida' || status === 'pagamento-concluido') return 'status-tag--progress'
  if (status === 'pendente-pagamento') return 'status-tag--pending'
  if (status === 'assinatura-andamento') return 'status-tag--active'
  return 'status-tag--waiting'
}

function statusSegClass(status: string) {
  if (!status) return 'status-tag--waiting'
  if (status === 'contratacao-implementada') return 'status-tag--done'
  if (status === 'assinatura-concluida' || status === 'pagamento-concluido' || status === 'implementacao-simplificada') return 'status-tag--progress'
  if (status === 'dps-pendente' || status === 'tele-entrevista-pendente' || status === 'pendente-pagamento') return 'status-tag--pending'
  if (status === 'assinatura-andamento' || status === 'implementacao-andamento') return 'status-tag--active'
  return 'status-tag--waiting'
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
  padding: 11px 14px;
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
.proposals-table th.col-status-seg { min-width: 190px; }
.proposals-table th.col-type { min-width: 150px; }
.proposals-table th.col-products { min-width: 130px; }

/* ── Linhas ──────────────────────────────────────────────────────────────── */
.proposal-row {
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.12s;
}

.proposal-row:last-child { border-bottom: none; }
.proposal-row:hover { background-color: #f8fafc; }

.proposal-row td {
  padding: 10px 14px;
  vertical-align: middle;
  white-space: nowrap;
}

.proposal-row td.col-actions { text-align: right; }

/* ── Nome da proposta ────────────────────────────────────────────────────── */
.proposal-name {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
}
.proposal-name__icon { color: var(--text-muted); flex-shrink: 0; }

/* ── Badge de produto ────────────────────────────────────────────────────── */
.product-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
}
/* Tons de azul discretos para todos os badges de produto */
.product-badge--prev   { background-color: #eff6ff; color: #2563eb; border: 1px solid #dbeafe; }
.product-badge--seguro { background-color: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; }
.product-badge--both   { background-color: #eef2ff; color: #4338ca; border: 1px solid #c7d2fe; }

/* ── Badge de tipo de solicitação ────────────────────────────────────────── */
.type-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
}
/* Tons de azul discretos para tipos */
.type-badge--com-estudo  { background-color: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; }
.type-badge--sem-estudo  { background-color: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.type-badge--port        { background-color: #eef2ff; color: #3730a3; border: 1px solid #c7d2fe; }

/* ── Valores de célula ───────────────────────────────────────────────────── */
.cell-value {
  font-size: 12.5px;
  color: var(--text-primary);
  white-space: nowrap;
}
.cell-empty {
  font-size: 12.5px;
  color: var(--text-muted);
}

/* ── Tags de status (clicáveis, substituem os selects) ───────────────────── */
.status-tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 20px;
  font-family: var(--font-sans);
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid transparent;
  cursor: default;
  transition: filter 0.15s;
  line-height: 1.4;
  background: none;
  outline: none;
}

/* Tags com ação clicável têm cursor pointer */
.status-tag--active,
.status-tag--pending {
  cursor: pointer;
}
.status-tag--active:hover,
.status-tag--pending:hover {
  filter: brightness(0.94);
}

/* Paleta de status — todos em tons de azul/slate discretos */
/* Aguardando: cinza neutro */
.status-tag--waiting {
  background-color: #f1f5f9;
  color: #64748b;
  border-color: #e2e8f0;
}

/* Assinatura em andamento / Implementação em andamento: azul médio */
.status-tag--active {
  background-color: #dbeafe;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

/* Assinatura Concluída / Pagamento Concluído / Impl. Simplificada: azul mais escuro */
.status-tag--progress {
  background-color: #eff6ff;
  color: #1e40af;
  border-color: #bfdbfe;
}

/* Pendente de Pagamento / DPS Pendente / Tele Entrevista Pendente: azul acinzentado */
.status-tag--pending {
  background-color: #e0e7ff;
  color: #3730a3;
  border-color: #c7d2fe;
}

/* Contratação Implementada: azul navy sólido */
.status-tag--done {
  background-color: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
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
  padding: 5px 10px;
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
