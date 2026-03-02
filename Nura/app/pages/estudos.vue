<template>
  <AppShell
    :tabs="tabs"
    :active-tab="activeTab"
    @tab-change="changeTab"
  >
    <!-- Conteúdo das abas -->
    <div class="p-6 max-w-4xl mx-auto">

      <!-- ABA 0: Resumo Jornada de Vida -->
      <template v-if="activeTab === 0">
        <PageHeader title="Resumo Jornada de Vida">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </template>
        </PageHeader>

        <!-- Dados do Proponente -->
        <SectionCard title="Dados do Proponente" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </template>
          <FieldGroup>
            <FieldItem label="CPF" value="123.456.789-00" />
            <FieldItem label="Nome Completo" value="Taís Oliveira Costa" />
            <FieldItem label="Nome Social" value="—" />
            <FieldItem label="Data de Nascimento" value="15/05/1984" />
            <FieldItem label="Telefone" value="(21) 99999-0000" />
            <FieldItem label="E-mail" value="tais.oliveira@email.com" />
            <FieldItem label="Renda Mensal" value="R$ 18.000,00" />
            <FieldItem label="Ocupação" value="Gerente de Marketing" />
            <FieldItem label="Empresa" value="Medley Farmacêutica Ltda." />
          </FieldGroup>
        </SectionCard>

        <!-- Perfil de Personalidade -->
        <SectionCard title="Perfil de Personalidade" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </template>
          <div class="flex flex-col gap-3">
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tipo de Perfil</span>
              <p class="text-sm font-bold text-slate-800 mt-0.5">EXECUTORA - ANALÍTICA - CONSERVADORA</p>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Descrição</span>
              <p class="text-sm text-slate-700 mt-0.5 leading-relaxed">
                Orientada a resultados, toma decisões financeiras com cautela e conservadorismo, priorizando a segurança familiar e a previsibilidade do futuro.
              </p>
            </div>
          </div>
        </SectionCard>

        <!-- Cenários de Risco Atual -->
        <SectionCard title="Cenários de Risco Atual" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </template>
          <div class="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p class="text-sm font-semibold text-slate-700 mb-2">Impacto da perda de uma renda:</p>
            <ul class="list-disc list-inside space-y-1">
              <li class="text-sm text-blue-700">Perda imediata de 42% a 58% da renda familiar</li>
              <li class="text-sm text-blue-700">Patrimônio consumido em ~27 meses</li>
              <li class="text-sm text-blue-700">Futuro dos filhos comprometido</li>
            </ul>
          </div>
        </SectionCard>

        <!-- Vulnerabilidades Identificadas -->
        <SectionCard title="Vulnerabilidades Identificadas" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </template>
          <div class="flex flex-col gap-3">
            <div
              v-for="vuln in vulnerabilidades"
              :key="vuln.titulo"
              class="border border-slate-100 rounded-lg p-4 bg-slate-50"
            >
              <p class="text-sm font-semibold text-slate-800">{{ vuln.titulo }}</p>
              <p class="text-xs text-slate-500 mt-1">{{ vuln.descricao }}</p>
              <p class="text-xs text-blue-600 font-medium mt-2">Solução Recomendada: <span class="font-semibold">{{ vuln.solucao }}</span></p>
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

      <!-- ABA 1: Detalhamento do Plano -->
      <template v-if="activeTab === 1">
        <PageHeader title="Detalhamento do Plano">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </template>
        </PageHeader>

        <!-- Tipo de Investimento -->
        <SectionCard title="Tipo de Investimento" :icon="true">
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

        <!-- Dados do Plano -->
        <SectionCard title="Dados do Plano" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Contribuição Mensal</label>
              <input
                v-model="contribuicaoMensal"
                type="text"
                placeholder="R$ 0,00"
                class="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Aporte Inicial</label>
              <input
                v-model="aporteInicial"
                type="text"
                placeholder="R$ 0,00"
                class="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
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

      <!-- ABA 2: Revisão do Estudo -->
      <template v-if="activeTab === 2">
        <PageHeader title="Revisão do Estudo">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </template>
        </PageHeader>

        <!-- Resumo do Proponente -->
        <SectionCard title="Dados do Proponente" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </template>
          <FieldGroup>
            <FieldItem label="Nome Completo" value="Taís Oliveira Costa" />
            <FieldItem label="CPF" value="123.456.789-00" />
            <FieldItem label="Data de Nascimento" value="15/05/1984" />
            <FieldItem label="Renda Mensal" value="R$ 18.000,00" />
            <FieldItem label="Ocupação" value="Gerente de Marketing" />
            <FieldItem label="Empresa" value="Medley Farmacêutica Ltda." />
          </FieldGroup>
        </SectionCard>

        <!-- Resumo do Plano -->
        <SectionCard title="Resumo do Plano" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </template>
          <FieldGroup>
            <FieldItem label="Tipo de Investimento" :value="tipoSelecionado" />
            <FieldItem label="Tipo de Plano" :value="tipoPlano" />
            <FieldItem label="Regime de Tributação" :value="regimeTributacao" />
            <FieldItem label="Contribuição Mensal" :value="contribuicaoMensal || 'R$ 0,00'" />
            <FieldItem label="Aporte Inicial" :value="aporteInicial || 'R$ 0,00'" />
          </FieldGroup>
        </SectionCard>

        <!-- Soluções Propostas -->
        <SectionCard title="Soluções Propostas" :icon="true">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </template>
          <div class="bg-blue-50 border border-blue-100 rounded-lg p-5">
            <p class="text-sm text-slate-700 mb-3">
              Destinar <strong>R$ 2.500,00/mês</strong> (<strong>18% do saldo</strong>) garante:
            </p>
            <ul class="list-disc list-inside space-y-1 mb-4">
              <li class="text-sm text-slate-700">Tranquilidade total para a família</li>
              <li class="text-sm text-slate-700">Educação garantida até a faculdade</li>
              <li class="text-sm text-slate-700">Proteção do patrimônio de R$ 800.000</li>
              <li class="text-sm text-slate-700">Segurança para empreender</li>
            </ul>
            <div class="border-t border-blue-200 pt-4 mt-4">
              <p class="text-sm font-semibold text-slate-800">Investimento Mensal Total</p>
              <p class="text-2xl font-bold text-blue-700 mt-1">R$ 4.150</p>
              <p class="text-xs text-slate-500 mt-0.5">Apenas 30% do saldo mensal</p>
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
            Salvar
          </button>
        </div>
      </template>

    </div>
  </AppShell>
</template>

<script setup lang="ts">
const tabs = ['Resumo Jornada de Vida', 'Detalhamento do Plano', 'Revisão do Estudo']
const activeTab = ref(0)

const tiposInvestimento = ['Previdência', 'Seguro de Vida']
const tipoSelecionado = ref('Previdência')
const tipoPlano = ref('PGBL')
const regimeTributacao = ref('Progressiva')
const contribuicaoMensal = ref('')
const aporteInicial = ref('')

const vulnerabilidades = [
  {
    titulo: 'Ausência Prematura',
    descricao: 'Impacto severo no padrão de vida dos filhos e dependentes devido à perda da renda principal.',
    solucao: 'Seguro de Vida Vitalício',
  },
  {
    titulo: 'Invalidez Laborativa',
    descricao: 'Interrupção da capacidade de gerar receita por doença ou acidente, comprometendo o fluxo de caixa.',
    solucao: 'Seguro de Invalidez + DIT',
  },
  {
    titulo: 'Doenças Graves',
    descricao: 'Custos elevados de tratamento que podem consumir rapidamente a reserva de liquidez e investimentos.',
    solucao: 'Cobertura para Doenças Graves',
  },
  {
    titulo: 'Sucessão Patrimonial',
    descricao: 'Custos de inventário e impostos (ITCMD) podem bloquear até 20% do patrimônio familiar.',
    solucao: 'Seguro para Custeio de Inventário',
  },
  {
    titulo: 'Longevidade Financeira',
    descricao: 'Risco de sobreviver à capacidade da reserva financeira acumulada (viver mais que o dinheiro).',
    solucao: 'Aporte em Previdência Privada',
  },
]

function changeTab(index: number) {
  activeTab.value = index
}
</script>
