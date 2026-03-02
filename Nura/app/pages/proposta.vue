<template>
  <AppShell :tabs="tabs" :active-tab="activeTab" @tab-change="changeTab">
    <div class="page-content">

      <!-- ══════════════════════════════════════════════════════════════════
           ABA 0 — Detalhamento do Plano
      ══════════════════════════════════════════════════════════════════════ -->
      <template v-if="activeTab === 0">
        <PageHeader title="Detalhamento do Plano">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </template>
        </PageHeader>

        <!-- Tipo de Investimento -->
        <SectionCard title="Tipo de Investimento">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
          <div class="toggle-group">
            <button
              v-for="tipo in ['Previdência', 'Seguro de Vida']"
              :key="tipo"
              class="toggle-btn"
              :class="{ 'toggle-btn--active': tipoSelecionado === tipo }"
              @click="tipoSelecionado = tipo"
            >{{ tipo }}</button>
          </div>
        </SectionCard>

        <!-- Dados do Plano -->
        <SectionCard title="Dados do Plano">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </template>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label">Tipo de Plano</label>
              <div class="radio-group">
                <button v-for="tp in ['PGBL','VGBL']" :key="tp" class="radio-btn" :class="{ 'radio-btn--active': tipoPlano === tp }" @click="tipoPlano = tp">{{ tp }}</button>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">Regime de Tributação</label>
              <div class="radio-group">
                <button v-for="r in ['Progressiva','Regressiva']" :key="r" class="radio-btn" :class="{ 'radio-btn--active': regimeTributacao === r }" @click="regimeTributacao = r">{{ r }}</button>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">Contribuição Mensal</label>
              <input v-model="contribuicaoMensal" type="text" placeholder="R$ 0,00" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Aporte Inicial</label>
              <input v-model="aporteInicial" type="text" placeholder="R$ 0,00" class="form-input" />
            </div>
          </div>
        </SectionCard>

        <NavFooter confirm-label="Continuar" @confirm="changeTab(1)" />
      </template>

      <!-- ══════════════════════════════════════════════════════════════════
           ABA 1 — Revisão do Estudo
      ══════════════════════════════════════════════════════════════════════ -->
      <template v-if="activeTab === 1">
        <PageHeader title="Revisão do Estudo">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </template>
        </PageHeader>

        <!-- Dados do Proponente -->
        <SectionCard title="Dados do Proponente">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
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
        <SectionCard title="Resumo do Plano">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </template>
          <FieldGroup>
            <FieldItem label="Tipo de Investimento" :value="tipoSelecionado" />
            <FieldItem label="Tipo de Plano" :value="tipoPlano" />
            <FieldItem label="Regime de Tributação" :value="regimeTributacao" />
            <FieldItem label="Contribuição Mensal" :value="contribuicaoMensal || 'R$ 0,00'" />
            <FieldItem label="Aporte Inicial" :value="aporteInicial || 'R$ 0,00'" />
            <FieldItem label="Data de Emissão" value="02/03/2026" />
          </FieldGroup>
        </SectionCard>

        <!-- Soluções Propostas -->
        <SectionCard title="Soluções Propostas">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
          <div class="info-box">
            <p class="info-box__label">Destinar <strong>R$ 2.500,00/mês</strong> (<strong>18% do saldo</strong>) garante:</p>
            <ul class="info-box__list">
              <li>Tranquilidade total para a família</li>
              <li>Educação garantida até a faculdade</li>
              <li>Proteção do patrimônio de R$ 800.000</li>
              <li>Segurança para empreender</li>
            </ul>
            <div class="info-box__total">
              <p class="info-box__total-label">Investimento Mensal</p>
              <p class="info-box__total-value">R$ 4.150</p>
              <p class="info-box__total-sub">Apenas 30% do saldo mensal</p>
            </div>
          </div>
        </SectionCard>

        <NavFooter confirm-label="Salvar" :show-cancel="true" @confirm="() => {}" @cancel="changeTab(0)" />
      </template>

    </div>
  </AppShell>
</template>

<script setup lang="ts">
const tabs = ['Detalhamento do Plano', 'Revisão do Estudo']
const activeTab = ref(0)
const tipoSelecionado = ref('Previdência')
const tipoPlano = ref('PGBL')
const regimeTributacao = ref('Progressiva')
const contribuicaoMensal = ref('')
const aporteInicial = ref('')

function changeTab(i: number) { activeTab.value = i }
</script>

<style scoped>
.page-content { padding: 28px 40px; }

/* Toggle */
.toggle-group {
  display: flex;
  gap: 0;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  width: fit-content;
}

.toggle-btn {
  padding: 9px 20px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  background: var(--bg-card);
  color: var(--text-muted);
  border: none;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  border-right: 1px solid var(--border-color);
}
.toggle-btn:last-child { border-right: none; }
.toggle-btn--active {
  background-color: var(--btn-primary-bg);
  color: #ffffff;
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

/* Radio buttons */
.radio-group {
  display: flex;
  gap: 0;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow: hidden;
}
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
}
.radio-btn:last-child { border-right: none; }
.radio-btn--active {
  background-color: var(--btn-primary-bg);
  color: #ffffff;
}

/* Info box */
.info-box {
  background-color: #f8fafc;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 16px;
}
.info-box__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 10px;
}
.info-box__list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.info-box__list li {
  font-size: 14px;
  color: var(--text-muted);
}
.info-box__total {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}
.info-box__total-label { font-size: 13px; font-weight: 500; color: var(--text-primary); margin: 0; }
.info-box__total-value { font-size: 24px; font-weight: 700; color: var(--text-primary); margin: 4px 0 2px; }
.info-box__total-sub { font-size: 12px; color: var(--text-muted); margin: 0; }
</style>
