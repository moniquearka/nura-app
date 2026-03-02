<template>
  <AppShell :tabs="visibleTabs" :active-tab="activeTab" @tab-change="changeTab">
    <div class="page-content">

      <!-- ══ ABA 0 — DETALHES DA PORTABILIDADE ══ -->
      <template v-if="activeTab === 0">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </span>
          <h2 class="page-header__title">Detalhes da Portabilidade</h2>
        </div>

        <!-- Tipo de Portabilidade -->
        <div class="section-card">
          <h3 class="section-card__title">Selecione o Tipo de Portabilidade</h3>
          <div class="tipo-port-grid">
            <button
              class="tipo-port-card"
              :class="{ 'tipo-port-card--active': tipoPortabilidade === 'externa' }"
              @click="tipoPortabilidade = 'externa'"
            >
              <span class="tipo-port-card__radio" :class="{ 'tipo-port-card__radio--active': tipoPortabilidade === 'externa' }"></span>
              <span class="tipo-port-card__label">De outra instituição para a Nura</span>
            </button>
            <div class="tipo-port-card tipo-port-card--disabled">
              <div class="tipo-port-card__badge">Em breve</div>
              <span class="tipo-port-card__radio"></span>
              <span class="tipo-port-card__label">Entre planos da Nura</span>
            </div>
          </div>
        </div>

        <!-- Dados da Portabilidade -->
        <div class="section-card">
          <h3 class="section-card__title">Dados da Portabilidade</h3>
          <div class="form-grid">
            <!-- Linha 1: Processo SUSEP | Seguradora de Origem -->
            <div class="form-field">
              <label class="form-label">Processo SUSEP</label>
              <input v-model="form.susep" type="text" placeholder="Digite o número SUSEP" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Seguradora de Origem</label>
              <div class="autocomplete-wrapper">
                <input
                  v-model="seguradoraQuery"
                  type="text"
                  placeholder="Digite para buscar..."
                  class="form-input"
                  @input="onSeguradoraInput"
                  @blur="hideDropdownDelayed"
                  @focus="onSeguradoraInput"
                />
                <div v-if="showSeguradoraDropdown && seguradoraResults.length > 0" class="autocomplete-dropdown">
                  <button
                    v-for="s in seguradoraResults"
                    :key="s"
                    class="autocomplete-item"
                    @mousedown.prevent="selectSeguradora(s)"
                  >{{ s }}</button>
                </div>
              </div>
            </div>
            <!-- Linha 2: Número do Certificado | Nome do Plano -->
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
              <div class="btn-group">
                <button v-for="tp in ['PGBL','VGBL']" :key="tp" class="btn-option" :class="{ 'btn-option--active': form.tipoPlano === tp }" @click="form.tipoPlano = tp">{{ tp }}</button>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">Regime Tributário</label>
              <div class="btn-group">
                <button v-for="r in ['Progressiva','Regressiva']" :key="r" class="btn-option" :class="{ 'btn-option--active': form.regime === r }" @click="form.regime = r">{{ r }}</button>
              </div>
            </div>
            <!-- Linha 4: CNPJ do Fundo | Situação do Regime -->
            <div class="form-field">
              <label class="form-label">CNPJ do Fundo</label>
              <input v-model="form.cnpjFundo" type="text" placeholder="00.000.000/0000-00" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Situação do Regime</label>
              <div class="btn-group btn-group--3">
                <button v-for="s in ['Retratável','Irretratável','De acordo com Origem']" :key="s" class="btn-option" :class="{ 'btn-option--active': form.situacaoRegime === s }" @click="form.situacaoRegime = s">{{ s }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tipo de Transferência e Valor -->
        <div class="section-card">
          <h3 class="section-card__title">Configurações da Transferência</h3>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label">Tipo de Transferência</label>
              <div class="btn-group">
                <button v-for="t in ['Total','Parcial']" :key="t" class="btn-option" :class="{ 'btn-option--active': form.tipoTransferencia === t }" @click="form.tipoTransferencia = t">{{ t }}</button>
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
        </div>

        <!-- Aporte Adicional -->
        <div class="section-card">
          <h3 class="section-card__title">Aporte e Contribuição</h3>
          <div class="form-grid">
            <div class="form-field form-field--full">
              <label class="form-label">Além do valor da portabilidade, deseja fazer aporte adicional?</label>
              <div class="btn-group btn-group--fit">
                <button v-for="op in ['Sim','Não']" :key="op" class="btn-option" :class="{ 'btn-option--active': form.aporteAdicional === op }" @click="form.aporteAdicional = op">{{ op }}</button>
              </div>
            </div>

            <!-- Campos de Forma de Pagamento do Aporte Adicional -->
            <template v-if="form.aporteAdicional === 'Sim'">
              <div class="form-field">
                <label class="form-label">Valor do Aporte Adicional</label>
                <input v-model="form.valorAporte" type="text" placeholder="R$ 0,00" class="form-input" />
              </div>
              <div class="form-field"></div>
              <div class="form-field form-field--full">
                <div class="payment-section-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  Forma de Pagamento — Aporte Adicional
                </div>
              </div>
              <div class="form-field">
                <label class="form-label">Forma de Pagamento</label>
                <div class="btn-group btn-group--3">
                  <button v-for="f in ['Débito em Conta','Boleto Bancário','Cartão de Crédito']" :key="f" class="btn-option" :class="{ 'btn-option--active': form.formaPagAporte === f }" @click="form.formaPagAporte = f">{{ f }}</button>
                </div>
              </div>
              <div class="form-field">
                <label class="form-label">Banco</label>
                <select v-model="form.bancoAporte" class="form-select">
                  <option value="">Selecione</option>
                  <option>001 - Banco do Brasil</option><option>033 - Santander</option><option>104 - Caixa Econômica</option><option>237 - Bradesco</option><option>341 - Itaú</option>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label">Agência</label>
                <input v-model="form.agenciaAporte" type="text" class="form-input" placeholder="0123" />
              </div>
              <div class="form-field">
                <label class="form-label">Conta Corrente</label>
                <input v-model="form.contaAporte" type="text" class="form-input" placeholder="12345-6" />
              </div>
              <div class="form-field">
                <label class="form-label">Dia de Débito</label>
                <select v-model="form.diaDebitoAporte" class="form-select">
                  <option v-for="d in [5,10,15,20,25]" :key="d">Dia {{ d }}</option>
                </select>
              </div>
            </template>

            <!-- Contribuição Mensal -->
            <div class="form-field form-field--full" :class="{ 'form-field--mt': form.aporteAdicional === 'Sim' }">
              <label class="form-label">Programar Contribuição Mensal</label>
              <div class="btn-group btn-group--fit">
                <button v-for="op in ['Sim','Não']" :key="op" class="btn-option" :class="{ 'btn-option--active': form.contribuicaoMensal === op }" @click="form.contribuicaoMensal = op">{{ op }}</button>
              </div>
            </div>

            <!-- Campos de Forma de Pagamento da Contribuição Mensal -->
            <template v-if="form.contribuicaoMensal === 'Sim'">
              <div class="form-field">
                <label class="form-label">Valor da Contribuição Mensal</label>
                <input v-model="form.valorContribuicao" type="text" placeholder="R$ 0,00" class="form-input" />
              </div>
              <div class="form-field"></div>
              <div class="form-field form-field--full">
                <div class="payment-section-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  Forma de Pagamento — Contribuição Mensal
                </div>
              </div>
              <div class="form-field">
                <label class="form-label">Forma de Pagamento</label>
                <div class="btn-group btn-group--3">
                  <button v-for="f in ['Débito em Conta','Boleto Bancário','Cartão de Crédito']" :key="f" class="btn-option" :class="{ 'btn-option--active': form.formaPagContrib === f }" @click="form.formaPagContrib = f">{{ f }}</button>
                </div>
              </div>
              <div class="form-field">
                <label class="form-label">Banco</label>
                <select v-model="form.bancoContrib" class="form-select">
                  <option value="">Selecione</option>
                  <option>001 - Banco do Brasil</option><option>033 - Santander</option><option>104 - Caixa Econômica</option><option>237 - Bradesco</option><option>341 - Itaú</option>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label">Agência</label>
                <input v-model="form.agenciaContrib" type="text" class="form-input" placeholder="0123" />
              </div>
              <div class="form-field">
                <label class="form-label">Conta Corrente</label>
                <input v-model="form.contaContrib" type="text" class="form-input" placeholder="12345-6" />
              </div>
              <div class="form-field">
                <label class="form-label">Dia de Débito</label>
                <select v-model="form.diaDebitoContrib" class="form-select">
                  <option v-for="d in [5,10,15,20,25]" :key="d">Dia {{ d }}</option>
                </select>
              </div>
            </template>
          </div>
        </div>

        <div class="page-footer">
          <button class="btn-primary" @click="changeTab(1)">Continuar</button>
        </div>
      </template>

      <!-- ══ ABA 1 — BENEFICIÁRIOS (visível apenas quando aporteAdicional ou contribuicaoMensal === 'Sim') ══ -->
      <template v-if="activeTab === 1">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <h2 class="page-header__title">Beneficiários</h2>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Cadastro de Beneficiários</h3>
          <div v-for="(ben, i) in beneficiarios" :key="i" class="beneficiary-card">
            <div class="beneficiary-card__header">
              <span class="beneficiary-card__title">Beneficiário {{ i + 1 }}</span>
              <button v-if="beneficiarios.length > 1" class="btn-remove" @click="removeBen(i)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                Remover
              </button>
            </div>
            <div class="form-grid">
              <div class="form-field"><label class="form-label">CPF</label><input v-model="ben.cpf" type="text" class="form-input" placeholder="000.000.000-00" /></div>
              <div class="form-field"><label class="form-label">Nome Completo</label><input v-model="ben.nome" type="text" class="form-input" /></div>
              <div class="form-field"><label class="form-label">Data de Nascimento</label><input v-model="ben.dataNasc" type="date" class="form-input" /></div>
              <div class="form-field">
                <label class="form-label">Grau de Parentesco</label>
                <select v-model="ben.parentesco" class="form-select">
                  <option value="">Selecione</option>
                  <option>Cônjuge</option><option>Filho(a)</option><option>Pai/Mãe</option><option>Irmão/Irmã</option><option>Outro</option>
                </select>
              </div>
              <div class="form-field"><label class="form-label">Percentual (%)</label><input v-model.number="ben.percentual" type="number" class="form-input" placeholder="0" min="0" max="100" /></div>
              <div class="form-field"><label class="form-label">Telefone</label><input v-model="ben.telefone" type="text" class="form-input" placeholder="(00) 00000-0000" /></div>
              <div class="form-field form-field--full"><label class="form-label">E-mail</label><input v-model="ben.email" type="email" class="form-input" /></div>
            </div>
          </div>

          <div v-if="somaPercentual !== 100" class="alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            A soma dos percentuais deve ser igual a 100%. Atualmente: {{ somaPercentual }}%
          </div>

          <button class="btn-add" @click="addBen">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
            Adicionar Beneficiário
          </button>
        </div>

        <div class="page-footer">
          <button class="btn-primary" @click="changeTab(2)">Continuar</button>
        </div>
      </template>

      <!-- ══ ABA 2 (ou 1 sem beneficiários) — CONFIRMAÇÃO ══ -->
      <template v-if="activeTab === confirmacaoTab">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <h2 class="page-header__title">Confirmação da Portabilidade</h2>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Dados da Portabilidade</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Tipo de Portabilidade</span><span class="field-value">De outra instituição para a Nura</span></div>
            <div class="field-item"><span class="field-label">Processo SUSEP</span><span class="field-value">{{ form.susep || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Seguradora de Origem</span><span class="field-value">{{ form.seguradora || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Número do Certificado</span><span class="field-value">{{ form.certificado || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nome do Plano</span><span class="field-value">{{ form.nomePlano || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Tipo do Plano</span><span class="field-value">{{ form.tipoPlano || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Regime Tributário</span><span class="field-value">{{ form.regime || '—' }}</span></div>
            <div class="field-item"><span class="field-label">CNPJ do Fundo</span><span class="field-value">{{ form.cnpjFundo || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Situação do Regime</span><span class="field-value">{{ form.situacaoRegime || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Tipo de Transferência</span><span class="field-value">{{ form.tipoTransferencia || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Valor da Portabilidade</span><span class="field-value">{{ form.tipoTransferencia === 'Total' ? 'Transferência Total' : (form.valorPortabilidade || '—') }}</span></div>
          </div>
        </div>

        <div v-if="form.aporteAdicional === 'Sim'" class="section-card">
          <h3 class="section-card__title">Aporte Adicional</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Valor do Aporte</span><span class="field-value">{{ form.valorAporte || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Forma de Pagamento</span><span class="field-value">{{ form.formaPagAporte || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Banco</span><span class="field-value">{{ form.bancoAporte || '—' }}</span></div>
          </div>
        </div>

        <div v-if="form.contribuicaoMensal === 'Sim'" class="section-card">
          <h3 class="section-card__title">Contribuição Mensal</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Valor da Contribuição</span><span class="field-value">{{ form.valorContribuicao || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Forma de Pagamento</span><span class="field-value">{{ form.formaPagContrib || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Banco</span><span class="field-value">{{ form.bancoContrib || '—' }}</span></div>
          </div>
        </div>

        <div v-if="showBeneficiariosTab && beneficiarios.length > 0" class="section-card">
          <h3 class="section-card__title">Beneficiários</h3>
          <div v-for="(ben, i) in beneficiarios" :key="i" class="field-grid field-grid--3 mb-8">
            <div class="field-item"><span class="field-label">Nome</span><span class="field-value">{{ ben.nome || '—' }}</span></div>
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ ben.cpf || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Percentual</span><span class="field-value">{{ ben.percentual || 0 }}%</span></div>
          </div>
        </div>

        <div class="page-footer">
          <button class="btn-primary">Confirmar Portabilidade</button>
        </div>
      </template>

    </div>
  </AppShell>
</template>

<script setup lang="ts">
interface Beneficiary {
  cpf: string; nome: string; dataNasc: string; parentesco: string; percentual: number; telefone: string; email: string
}

const seguradoras = [
  'Bradesco Vida e Previdência', 'Itaú Vida e Previdência', 'Santander Previdência',
  'Zurich Santander Brasil Seguros', 'Porto Seguro Vida e Previdência', 'Caixa Vida e Previdência',
  'Icatu Seguros', 'XP Vida e Previdência', 'Mapfre Vida', 'Mongeral Aegon Seguros',
  'Tokio Marine Seguradora', 'Allianz Seguros', 'SulAmérica Seguros', 'Prudential do Brasil',
  'MetLife Seguros', 'Generali Brasil Seguros', 'Sompo Seguros', 'HDI Seguros',
]

const form = reactive({
  susep: '', seguradora: '', certificado: '', nomePlano: '',
  tipoPlano: 'PGBL', regime: 'Progressiva', cnpjFundo: '', situacaoRegime: 'Retratável',
  tipoTransferencia: 'Total', valorPortabilidade: '',
  aporteAdicional: 'Não', valorAporte: '', formaPagAporte: 'Débito em Conta',
  bancoAporte: '', agenciaAporte: '', contaAporte: '', diaDebitoAporte: 'Dia 5',
  contribuicaoMensal: 'Não', valorContribuicao: '', formaPagContrib: 'Débito em Conta',
  bancoContrib: '', agenciaContrib: '', contaContrib: '', diaDebitoContrib: 'Dia 5',
})

// Seguradora autocomplete
const seguradoraQuery = ref('')
const showSeguradoraDropdown = ref(false)
const seguradoraResults = computed(() => {
  if (!seguradoraQuery.value) return seguradoras.slice(0, 8)
  return seguradoras.filter(s => s.toLowerCase().includes(seguradoraQuery.value.toLowerCase())).slice(0, 8)
})
function onSeguradoraInput() { showSeguradoraDropdown.value = true }
function hideDropdownDelayed() { setTimeout(() => { showSeguradoraDropdown.value = false }, 200) }
function selectSeguradora(s: string) { form.seguradora = s; seguradoraQuery.value = s; showSeguradoraDropdown.value = false }

// Beneficiários
const newBen = () => ({ cpf: '', nome: '', dataNasc: '', parentesco: '', percentual: 0, telefone: '', email: '' })
const beneficiarios = ref<Beneficiary[]>([newBen()])
const somaPercentual = computed(() => beneficiarios.value.reduce((s, b) => s + (b.percentual || 0), 0))
function addBen() { beneficiarios.value.push(newBen()) }
function removeBen(i: number) { beneficiarios.value.splice(i, 1) }

// Abas dinâmicas: Beneficiários só aparece quando aporteAdicional ou contribuicaoMensal === 'Sim'
const showBeneficiariosTab = computed(() => form.aporteAdicional === 'Sim' || form.contribuicaoMensal === 'Sim')
const visibleTabs = computed(() => {
  const t = ['Detalhes da Portabilidade']
  if (showBeneficiariosTab.value) t.push('Beneficiários')
  t.push('Confirmação da Portabilidade')
  return t
})
const confirmacaoTab = computed(() => showBeneficiariosTab.value ? 2 : 1)

const activeTab = ref(0)
function changeTab(i: number) { activeTab.value = i }

// Quando a aba de beneficiários desaparece, ajustar activeTab
watch(showBeneficiariosTab, (val) => {
  if (!val && activeTab.value > 0) activeTab.value = 0
})
</script>

<style scoped>
.page-content { padding: 28px 40px 80px; }

/* Cabeçalho */
.page-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
.page-header__icon { color: var(--text-muted); display: flex; align-items: center; }
.page-header__title { font-family: var(--font-sans); font-size: 20px; font-weight: 600; color: var(--text-primary); margin: 0; }

/* Cards de seção */
.section-card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 24px; margin-bottom: 16px; }
.section-card__title { display: flex; align-items: center; gap: 8px; font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color); }

/* Tipo de Portabilidade */
.tipo-port-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.tipo-port-card {
  position: relative; display: flex; align-items: center; gap: 12px;
  padding: 16px; border: 1.5px solid var(--border-color); border-radius: 8px;
  background: white; cursor: pointer; text-align: left;
  transition: border-color 0.15s, background-color 0.15s;
  font-family: var(--font-sans);
}
.tipo-port-card--active { border-color: var(--btn-primary-bg); background-color: #f0f4ff; }
.tipo-port-card--disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
.tipo-port-card__radio {
  width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--border-color);
  flex-shrink: 0; transition: border-color 0.15s, background-color 0.15s;
}
.tipo-port-card__radio--active { border-color: var(--btn-primary-bg); background-color: var(--btn-primary-bg); box-shadow: inset 0 0 0 3px white; }
.tipo-port-card__label { font-size: 14px; font-weight: 500; color: var(--text-primary); }
.tipo-port-card__badge {
  position: absolute; top: 8px; right: 8px;
  background-color: var(--btn-primary-bg); color: white;
  font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.3px;
}

/* Grid de formulário */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field--full { grid-column: 1 / -1; }
.form-field--mt { margin-top: 8px; }
.form-label { font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.6px; }
.form-input { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); padding: 9px 12px; border: 1px solid var(--border-color); border-radius: 6px; background-color: white; outline: none; transition: border-color 0.15s; width: 100%; box-sizing: border-box; }
.form-input:focus { border-color: #94a3b8; }
.form-input::placeholder { color: #94a3b8; }
.form-input--disabled { background-color: #f1f5f9; color: var(--text-muted); cursor: not-allowed; }
.form-select { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); padding: 9px 12px; border: 1px solid var(--border-color); border-radius: 6px; background-color: white; outline: none; cursor: pointer; width: 100%; box-sizing: border-box; }

/* Botões de seleção (substituem radio-btn) */
.btn-group { display: flex; gap: 0; border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; }
.btn-group--3 { }
.btn-group--fit { width: fit-content; }
.btn-option { flex: 1; padding: 9px 14px; font-family: var(--font-sans); font-size: 13px; font-weight: 500; background: #f8fafc; color: var(--text-muted); border: none; border-right: 1px solid var(--border-color); cursor: pointer; transition: background-color 0.15s, color 0.15s; white-space: nowrap; }
.btn-option:last-child { border-right: none; }
.btn-option--active { background-color: var(--btn-primary-bg); color: var(--btn-primary-color); }

/* Autocomplete */
.autocomplete-wrapper { position: relative; }
.autocomplete-dropdown { position: absolute; top: calc(100% + 2px); left: 0; right: 0; background: white; border: 1px solid var(--border-color); border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); z-index: 100; max-height: 220px; overflow-y: auto; }
.autocomplete-item { display: block; width: 100%; padding: 9px 12px; text-align: left; background: none; border: none; cursor: pointer; font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); transition: background-color 0.1s; }
.autocomplete-item:hover { background-color: #f8fafc; }

/* Separador de seção de pagamento */
.payment-section-header { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background-color: #f8fafc; border: 1px solid var(--border-color); border-radius: 6px; font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--text-primary); }

/* Beneficiário card */
.beneficiary-card { border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
.beneficiary-card__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.beneficiary-card__title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.btn-remove { display: flex; align-items: center; gap: 4px; font-family: var(--font-sans); font-size: 12px; font-weight: 500; color: #ef4444; background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background-color 0.15s; }
.btn-remove:hover { background-color: #fef2f2; }
.btn-add { display: flex; align-items: center; gap: 6px; font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--text-muted); background: none; border: 1px dashed var(--border-color); border-radius: 6px; padding: 10px 16px; cursor: pointer; width: 100%; justify-content: center; transition: border-color 0.15s, color 0.15s, background-color 0.15s; }
.btn-add:hover { border-color: #94a3b8; color: var(--text-primary); background-color: #f8fafc; }

/* Alerta */
.alert-warning { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 6px; font-size: 13px; color: #854d0e; margin: 8px 0; }

/* Campos de revisão */
.field-grid { display: grid; gap: 16px 24px; }
.field-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
.field-item { display: flex; flex-direction: column; gap: 4px; }
.field-label { font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.6px; }
.field-value { font-family: var(--font-sans); font-size: 15px; font-weight: 400; color: var(--text-primary); }
.mb-8 { margin-bottom: 8px; }

/* Rodapé */
.page-footer { display: flex; justify-content: flex-end; padding-top: 24px; }
.btn-primary { font-family: var(--font-sans); font-size: 14px; font-weight: 500; padding: 10px 24px; border-radius: 8px; border: none; cursor: pointer; background-color: var(--btn-primary-bg); color: var(--btn-primary-color); transition: opacity 0.15s; line-height: 1; }
.btn-primary:hover { opacity: 0.85; }
</style>
