<template>
  <AppShell
    :tabs="tabs"
    :active-tab="activeTab"
    @tab-change="changeTab"
  >
    <div class="p-6 max-w-4xl mx-auto">

      <!-- ABA 0: Detalhes da Portabilidade -->
      <template v-if="activeTab === 0">
        <PageHeader title="Detalhes da Portabilidade">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </template>
        </PageHeader>

        <!-- Tipo de Investimento -->
        <SectionCard title="Selecione o Tipo de Investimento" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
          <div class="flex gap-3">
            <button
              v-for="tipo in tiposInvestimento"
              :key="tipo"
              class="flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-all duration-150"
              :class="tipoSelecionado === tipo
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'"
              @click="tipoSelecionado = tipo"
            >
              {{ tipo }}
            </button>
          </div>
        </SectionCard>

        <!-- Dados da Seguradora Atual -->
        <SectionCard title="Dados da Seguradora Atual" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </template>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Seguradora Atual</label>
              <input
                v-model="seguradora"
                type="text"
                placeholder="Digite para buscar..."
                class="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Nome do Plano</label>
              <input
                v-model="nomePlano"
                type="text"
                placeholder="Digite o nome do plano"
                class="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Número do Certificado ou da Apólice</label>
              <input
                v-model="numeroCertificado"
                type="text"
                placeholder="Digite o número"
                class="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">CNPJ do Fundo</label>
              <input
                v-model="cnpjFundo"
                type="text"
                placeholder="00.000.000/0000-00"
                class="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">SUSEP</label>
              <input
                v-model="susep"
                type="text"
                placeholder="Digite o número SUSEP"
                class="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </SectionCard>

        <!-- Tipo de Plano e Tributação -->
        <SectionCard title="Configurações do Plano" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </template>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tipo de Plano</label>
              <div class="flex gap-2">
                <button
                  v-for="tp in ['PGBL', 'VGBL']"
                  :key="tp"
                  class="flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-150"
                  :class="tipoPlano === tp
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'"
                  @click="tipoPlano = tp"
                >
                  {{ tp }}
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Regime de Tributação</label>
              <div class="flex gap-2">
                <button
                  v-for="regime in ['Progressiva', 'Regressiva']"
                  :key="regime"
                  class="flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-150"
                  :class="regimeTributacao === regime
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'"
                  @click="regimeTributacao = regime"
                >
                  {{ regime }}
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tipo de Portabilidade</label>
              <div class="flex gap-2">
                <button
                  v-for="tp in ['Total', 'Parcial']"
                  :key="tp"
                  class="flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-150"
                  :class="tipoPortabilidade === tp
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'"
                  @click="tipoPortabilidade = tp"
                >
                  {{ tp }}
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Valor da Portabilidade</label>
              <input
                v-model="valorPortabilidade"
                type="text"
                placeholder="R$ 0,00"
                class="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </SectionCard>

        <!-- Aporte e Contribuição -->
        <SectionCard title="Aporte e Contribuição" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </template>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Além do valor da portabilidade, deseja fazer aporte adicional?</label>
              <div class="flex gap-2">
                <button
                  v-for="op in ['Sim', 'Não']"
                  :key="op"
                  class="flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-150"
                  :class="aporteAdicional === op
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'"
                  @click="aporteAdicional = op"
                >
                  {{ op }}
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Deseja manter contribuição mensal?</label>
              <div class="flex gap-2">
                <button
                  v-for="op in ['Sim', 'Não']"
                  :key="op"
                  class="flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-150"
                  :class="contribuicaoMensal === op
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'"
                  @click="contribuicaoMensal = op"
                >
                  {{ op }}
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        <!-- Rodapé de navegação -->
        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
            @click="changeTab(1)"
          >
            Continuar
          </button>
        </div>
      </template>

      <!-- ABA 1: Beneficiários -->
      <template v-if="activeTab === 1">
        <PageHeader title="Beneficiários">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </template>
        </PageHeader>

        <!-- Lista de beneficiários -->
        <SectionCard title="Beneficiários Cadastrados" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </template>
          <div
            v-for="(benef, index) in beneficiarios"
            :key="index"
            class="border border-slate-100 rounded-lg p-4 bg-slate-50 mb-3"
          >
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Nome Completo</label>
                <input
                  v-model="benef.nome"
                  type="text"
                  placeholder="Nome do beneficiário"
                  class="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">CPF</label>
                <input
                  v-model="benef.cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  class="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Percentual (%)</label>
                <input
                  v-model="benef.percentual"
                  type="text"
                  placeholder="0%"
                  class="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <button
            class="mt-2 flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-150"
            @click="adicionarBeneficiario"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Adicionar Beneficiário
          </button>
        </SectionCard>

        <!-- Rodapé de navegação -->
        <div class="flex justify-end mt-6 gap-3">
          <button
            class="px-6 py-2.5 bg-white text-slate-600 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-150"
            @click="changeTab(0)"
          >
            Cancelar
          </button>
          <button
            class="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
            @click="changeTab(2)"
          >
            Continuar
          </button>
        </div>
      </template>

      <!-- ABA 2: Confirmação da Portabilidade -->
      <template v-if="activeTab === 2">
        <PageHeader title="Confirmação da Portabilidade">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
        </PageHeader>

        <!-- Resumo da Portabilidade -->
        <SectionCard title="Resumo da Portabilidade" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </template>
          <FieldGroup>
            <FieldItem label="Tipo de Investimento" :value="tipoSelecionado" />
            <FieldItem label="Seguradora Atual" :value="seguradora || '—'" />
            <FieldItem label="Nome do Plano" :value="nomePlano || '—'" />
            <FieldItem label="Número do Certificado" :value="numeroCertificado || '—'" />
            <FieldItem label="Tipo de Plano" :value="tipoPlano" />
            <FieldItem label="Regime de Tributação" :value="regimeTributacao" />
            <FieldItem label="Tipo de Portabilidade" :value="tipoPortabilidade" />
            <FieldItem label="Valor da Portabilidade" :value="valorPortabilidade || 'R$ 0,00'" />
          </FieldGroup>
        </SectionCard>

        <!-- Beneficiários confirmados -->
        <SectionCard title="Beneficiários" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </template>
          <div v-if="beneficiarios.filter(b => b.nome).length === 0" class="text-sm text-slate-400 italic">
            Nenhum beneficiário cadastrado.
          </div>
          <div v-else class="flex flex-col gap-2">
            <div
              v-for="(benef, index) in beneficiarios.filter(b => b.nome)"
              :key="index"
              class="flex items-center justify-between border border-slate-100 rounded-lg px-4 py-3 bg-slate-50"
            >
              <div>
                <p class="text-sm font-medium text-slate-800">{{ benef.nome }}</p>
                <p class="text-xs text-slate-400 mt-0.5">{{ benef.cpf || '—' }}</p>
              </div>
              <span class="text-sm font-semibold text-blue-600">{{ benef.percentual || '0' }}%</span>
            </div>
          </div>
        </SectionCard>

        <!-- Rodapé de navegação -->
        <div class="flex justify-end mt-6 gap-3">
          <button
            class="px-6 py-2.5 bg-white text-slate-600 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-150"
            @click="changeTab(1)"
          >
            Cancelar
          </button>
          <button
            class="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
          >
            Confirmar Portabilidade
          </button>
        </div>
      </template>

    </div>
  </AppShell>
</template>

<script setup lang="ts">
const tabs = ['Detalhes da Portabilidade', 'Beneficiários', 'Confirmação da Portabilidade']
const activeTab = ref(0)

const tiposInvestimento = ['Previdência', 'Seguro de Vida']
const tipoSelecionado = ref('Previdência')
const tipoPlano = ref('PGBL')
const regimeTributacao = ref('Progressiva')
const tipoPortabilidade = ref('Total')
const seguradora = ref('')
const nomePlano = ref('')
const numeroCertificado = ref('')
const cnpjFundo = ref('')
const susep = ref('')
const valorPortabilidade = ref('')
const aporteAdicional = ref('Não')
const contribuicaoMensal = ref('Não')

interface Beneficiario {
  nome: string
  cpf: string
  percentual: string
}

const beneficiarios = ref<Beneficiario[]>([
  { nome: '', cpf: '', percentual: '' }
])

function adicionarBeneficiario() {
  beneficiarios.value.push({ nome: '', cpf: '', percentual: '' })
}

function changeTab(index: number) {
  activeTab.value = index
}
</script>
