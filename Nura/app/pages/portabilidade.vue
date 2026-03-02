<template>
  <AppShell :tabs="tabs" :active-tab="activeTab" @tab-change="changeTab">
    <div class="page-content">

      <!-- ABA 0 — Detalhes da Portabilidade -->
      <template v-if="activeTab === 0">
        <PageHeader title="Detalhes da Portabilidade">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </template>
        </PageHeader>

        <!-- Selecione o Tipo de Portabilidade -->
        <SectionCard title="Selecione o Tipo de Portabilidade">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </template>
          <div class="tipo-port-grid">
            <!-- Opção 1: De outra instituição para a Nura -->
            <button
              class="tipo-port-card"
              :class="{ 'tipo-port-card--active': tipoPortabilidade === 'externa' }"
              @click="tipoPortabilidade = 'externa'"
            >
              <span class="tipo-port-card__radio" :class="{ 'tipo-port-card__radio--active': tipoPortabilidade === 'externa' }"></span>
              <div class="tipo-port-card__body">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" class="tipo-port-card__icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="tipo-port-card__label">De outra instituição para a Nura</span>
              </div>
            </button>

            <!-- Opção 2: Entre planos da Nura (Em breve) -->
            <div class="tipo-port-card tipo-port-card--disabled">
              <div class="tipo-port-card__badge">Em breve</div>
              <span class="tipo-port-card__radio"></span>
              <div class="tipo-port-card__body">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" class="tipo-port-card__icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span class="tipo-port-card__label">Entre planos da Nura</span>
              </div>
            </div>
          </div>
        </SectionCard>

        <!-- Dados da Portabilidade -->
        <SectionCard title="Dados da Portabilidade">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </template>
          <div class="form-grid">
            <!-- Linha 1: Processo SUSEP | Seguradora de Origem -->
            <div class="form-field">
              <label class="form-label">Processo SUSEP</label>
              <input v-model="form.susep" type="text" placeholder="Digite o número SUSEP" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Seguradora de Origem</label>
              <input v-model="form.seguradora" type="text" placeholder="Digite para buscar..." class="form-input" />
            </div>
            <!-- Linha 2: Número do Certificado ou da Apólice | Nome do Plano -->
            <div class="form-field">
              <label class="form-label">Número do Certificado ou da Apólice</label>
              <input v-model="form.certificado" type="text" placeholder="Digite o número" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Nome do Plano</label>
              <input v-model="form.nomePlano" type="text" placeholder="Digite o nome do plano" class="form-input" />
            </div>
            <!-- Linha 3: Tipo do Plano | Regime Tributário -->
            <div class="form-field">
              <label class="form-label">Tipo do Plano</label>
              <div class="radio-group">
                <button v-for="tp in ['PGBL','VGBL']" :key="tp" class="radio-btn" :class="{ 'radio-btn--active': form.tipoPlano === tp }" @click="form.tipoPlano = tp">{{ tp }}</button>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">Regime Tributário</label>
              <div class="radio-group">
                <button v-for="r in ['Progressiva','Regressiva']" :key="r" class="radio-btn" :class="{ 'radio-btn--active': form.regime === r }" @click="form.regime = r">{{ r }}</button>
              </div>
            </div>
            <!-- Linha 4: CNPJ do Fundo | Situação do Regime -->
            <div class="form-field">
              <label class="form-label">CNPJ do Fundo</label>
              <input v-model="form.cnpjFundo" type="text" placeholder="00.000.000/0000-00" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Situação do Regime</label>
              <div class="radio-group radio-group--3">
                <button v-for="s in ['Retratável','Irretratável','De acordo com Origem']" :key="s" class="radio-btn" :class="{ 'radio-btn--active': form.situacaoRegime === s }" @click="form.situacaoRegime = s">{{ s }}</button>
              </div>
            </div>
          </div>
        </SectionCard>

        <!-- Configurações da Transferência -->
        <SectionCard title="Configurações da Transferência">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </template>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label">Tipo de Transferência</label>
              <div class="radio-group">
                <button v-for="t in ['Total','Parcial']" :key="t" class="radio-btn" :class="{ 'radio-btn--active': form.tipoTransferencia === t }" @click="form.tipoTransferencia = t">{{ t }}</button>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">Valor da Portabilidade</label>
              <input
                v-model="form.valorPortabilidade"
                type="text"
                placeholder="R$ 0,00"
                class="form-input"
                :disabled="form.tipoTransferencia === 'Total'"
                :class="{ 'form-input--disabled': form.tipoTransferencia === 'Total' }"
              />
            </div>
          </div>
        </SectionCard>

        <!-- Aporte e Contribuição -->
        <SectionCard title="Aporte e Contribuição">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </template>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label">Além do valor da portabilidade, deseja fazer aporte adicional?</label>
              <div class="radio-group">
                <button v-for="op in ['Sim','Não']" :key="op" class="radio-btn" :class="{ 'radio-btn--active': form.aporteAdicional === op }" @click="form.aporteAdicional = op">{{ op }}</button>
              </div>
            </div>
            <div v-if="form.aporteAdicional === 'Sim'" class="form-field">
              <label class="form-label">Valor do Aporte Adicional</label>
              <input v-model="form.valorAporte" type="text" placeholder="R$ 0,00" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Programar Contribuição Mensal</label>
              <div class="radio-group">
                <button v-for="op in ['Sim','Não']" :key="op" class="radio-btn" :class="{ 'radio-btn--active': form.contribuicaoMensal === op }" @click="form.contribuicaoMensal = op">{{ op }}</button>
              </div>
            </div>
            <div v-if="form.contribuicaoMensal === 'Sim'" class="form-field">
              <label class="form-label">Valor da Contribuição Mensal</label>
              <input v-model="form.valorContribuicao" type="text" placeholder="R$ 0,00" class="form-input" />
            </div>
          </div>
        </SectionCard>

        <NavFooter confirm-label="Continuar" @confirm="changeTab(1)" />
      </template>

      <!-- ABA 1 — Beneficiários -->
      <template v-if="activeTab === 1">
        <PageHeader title="Beneficiários">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </template>
        </PageHeader>

        <SectionCard title="Cadastro de Beneficiários">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </template>
          <div v-for="(ben, idx) in beneficiarios" :key="idx" class="beneficiario-card">
            <div class="beneficiario-card__header">
              <span class="beneficiario-card__num">Beneficiário {{ idx + 1 }}</span>
              <button v-if="beneficiarios.length > 1" class="btn-remove" @click="removeBeneficiario(idx)">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Remover
              </button>
            </div>
            <div class="form-grid">
              <div class="form-field">
                <label class="form-label">Nome Completo</label>
                <input v-model="ben.nome" type="text" placeholder="Nome do beneficiário" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">CPF</label>
                <input v-model="ben.cpf" type="text" placeholder="000.000.000-00" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Parentesco</label>
                <input v-model="ben.parentesco" type="text" placeholder="Ex: Cônjuge, Filho(a)" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Percentual (%)</label>
                <input v-model="ben.percentual" type="text" placeholder="Ex: 50" class="form-input" />
              </div>
            </div>
          </div>
          <button class="btn-add" @click="addBeneficiario">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Adicionar Beneficiário
          </button>
        </SectionCard>

        <NavFooter confirm-label="Continuar" :show-cancel="true" @confirm="changeTab(2)" @cancel="changeTab(0)" />
      </template>

      <!-- ABA 2 — Confirmação da Portabilidade -->
      <template v-if="activeTab === 2">
        <PageHeader title="Confirmação da Portabilidade">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </template>
        </PageHeader>

        <SectionCard title="Dados da Portabilidade">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </template>
          <FieldGroup>
            <FieldItem label="Tipo de Portabilidade" :value="tipoPortabilidade === 'externa' ? 'De outra instituição para a Nura' : '—'" />
            <FieldItem label="Processo SUSEP" :value="form.susep || '—'" />
            <FieldItem label="Seguradora de Origem" :value="form.seguradora || '—'" />
            <FieldItem label="Número do Certificado ou da Apólice" :value="form.certificado || '—'" />
            <FieldItem label="Nome do Plano" :value="form.nomePlano || '—'" />
            <FieldItem label="Tipo do Plano" :value="form.tipoPlano" />
            <FieldItem label="Regime Tributário" :value="form.regime" />
            <FieldItem label="CNPJ do Fundo" :value="form.cnpjFundo || '—'" />
            <FieldItem label="Situação do Regime" :value="form.situacaoRegime" />
            <FieldItem label="Tipo de Transferência" :value="form.tipoTransferencia" />
            <FieldItem v-if="form.tipoTransferencia === 'Parcial'" label="Valor da Portabilidade" :value="form.valorPortabilidade || '—'" />
          </FieldGroup>
        </SectionCard>

        <SectionCard title="Beneficiários">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </template>
          <div v-for="(ben, idx) in beneficiarios" :key="idx">
            <FieldGroup>
              <FieldItem :label="`Beneficiário ${idx + 1} — Nome`" :value="ben.nome || '—'" />
              <FieldItem label="CPF" :value="ben.cpf || '—'" />
              <FieldItem label="Parentesco" :value="ben.parentesco || '—'" />
              <FieldItem label="Percentual" :value="ben.percentual ? ben.percentual + '%' : '—'" />
            </FieldGroup>
            <div v-if="idx < beneficiarios.length - 1" class="confirm-divider"></div>
          </div>
        </SectionCard>

        <SectionCard title="Aporte e Contribuição">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </template>
          <FieldGroup>
            <template v-if="form.aporteAdicional === 'Sim'">
              <FieldItem label="Aporte Adicional" :value="form.valorAporte || '—'" />
              <FieldItem label="Tipo de Cobrança — Aporte" value="Cobrança única" />
            </template>
            <template v-if="form.contribuicaoMensal === 'Sim'">
              <FieldItem label="Contribuição Mensal" :value="form.valorContribuicao || '—'" />
              <FieldItem label="Tipo de Cobrança — Contribuição" value="Cobrança mensal" />
            </template>
            <FieldItem
              v-if="form.aporteAdicional !== 'Sim' && form.contribuicaoMensal !== 'Sim'"
              label="Aporte / Contribuição"
              value="Nenhum informado"
            />
          </FieldGroup>
        </SectionCard>

        <NavFooter confirm-label="Finalizar" :show-cancel="true" @confirm="() => {}" @cancel="changeTab(1)" />
      </template>

    </div>
  </AppShell>
</template>

<script setup lang="ts">
const tabs = ['Detalhes da Portabilidade', 'Beneficiários', 'Confirmação da Portabilidade']
const activeTab = ref(0)
const tipoPortabilidade = ref('externa')

const form = reactive({
  susep: '',
  seguradora: '',
  certificado: '',
  nomePlano: '',
  tipoPlano: 'PGBL',
  regime: 'Progressiva',
  cnpjFundo: '',
  situacaoRegime: 'Retratável',
  tipoTransferencia: 'Total',
  valorPortabilidade: '',
  aporteAdicional: 'Não',
  valorAporte: '',
  contribuicaoMensal: 'Não',
  valorContribuicao: '',
})

const beneficiarios = ref([{ nome: '', cpf: '', parentesco: '', percentual: '' }])

function addBeneficiario() {
  beneficiarios.value.push({ nome: '', cpf: '', parentesco: '', percentual: '' })
}
function removeBeneficiario(idx: number) {
  beneficiarios.value.splice(idx, 1)
}
function changeTab(i: number) { activeTab.value = i }
</script>

<style scoped>
.page-content { padding: 28px 40px; }

/* Tipo de Portabilidade */
.tipo-port-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 600px) { .tipo-port-grid { grid-template-columns: 1fr; } }

.tipo-port-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background-color: #f8fafc;
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
  font-family: var(--font-sans);
  text-align: left;
}
.tipo-port-card:hover:not(.tipo-port-card--disabled) {
  border-color: #94a3b8;
  background-color: #f1f5f9;
}
.tipo-port-card--active {
  border-color: var(--btn-primary-bg) !important;
  background-color: #f0f4ff !important;
}
.tipo-port-card--disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}
.tipo-port-card__badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #e2e8f0;
  color: #64748b;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 4px;
}
.tipo-port-card__radio {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #cbd5e1;
  background: white;
  flex-shrink: 0;
  transition: border-color 0.15s, background-color 0.15s;
}
.tipo-port-card__radio--active {
  border-color: var(--btn-primary-bg);
  background: var(--btn-primary-bg);
  box-shadow: inset 0 0 0 3px white;
}
.tipo-port-card__body {
  display: flex;
  align-items: center;
  gap: 10px;
}
.tipo-port-card__icon { color: var(--text-muted); flex-shrink: 0; }
.tipo-port-card__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.3;
}

/* Form grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 16px;
  column-gap: 24px;
}
@media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }

.form-field { display: flex; flex-direction: column; gap: 6px; }

.form-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  line-height: 1.4;
}

.form-input {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-primary);
  background-color: #f8fafc;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 9px 12px;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}
.form-input:focus { border-color: #94a3b8; }
.form-input::placeholder { color: #94a3b8; }
.form-input--disabled { background-color: #f1f5f9; color: #94a3b8; cursor: not-allowed; }

/* Radio buttons */
.radio-group {
  display: flex;
  gap: 0;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow: hidden;
}
.radio-group--3 .radio-btn { font-size: 11px; padding: 8px 6px; }

.radio-btn {
  flex: 1;
  padding: 8px 12px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  background: #f8fafc;
  color: var(--text-muted);
  border: none;
  border-right: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  line-height: 1.3;
}
.radio-btn:last-child { border-right: none; }
.radio-btn--active {
  background-color: var(--btn-primary-bg);
  color: #ffffff;
}

/* Beneficiários */
.beneficiario-card {
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #f8fafc;
}
.beneficiario-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.beneficiario-card__num {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}
.btn-remove {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.15s;
}
.btn-remove:hover { background-color: #fef2f2; }

.btn-add {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  background: none;
  border: 1px dashed var(--border-color);
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  transition: border-color 0.15s, color 0.15s, background-color 0.15s;
}
.btn-add:hover {
  border-color: #94a3b8;
  color: var(--text-primary);
  background-color: #f8fafc;
}

/* Confirmação */
.confirm-divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 12px 0;
}
</style>
