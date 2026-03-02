<template>
  <AppShellNested
    :tabs="tabs"
    :active-tab="activeTab"
    :active-sub-tab="activeSubTab"
    back-to="/estudos-gerados"
    @tab-change="onTabChange"
    @subtab-change="onSubTabChange"
  >
    <!-- ══ ABA 0 — DETALHAMENTO DA PROPOSTA ══ -->
    <template v-if="activeTab === 0">
      <div class="page-content">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </span>
          <h2 class="page-header__title">Detalhamento da Proposta</h2>
        </div>

        <!-- Dados do Proponente -->
        <div class="section-card">
          <h3 class="section-card__title">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Dados do Proponente
          </h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">123.456.789-00</span></div>
            <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">Taís Oliveira Costa</span></div>
            <div class="field-item"><span class="field-label">Nome Social</span><span class="field-value">—</span></div>
            <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">15/05/1984</span></div>
            <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">(21) 99999-0000</span></div>
            <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">tais.oliveira@email.com</span></div>
            <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">R$ 18.000,00</span></div>
            <div class="field-item"><span class="field-label">Ocupação</span><span class="field-value">Gerente de Marketing</span></div>
            <div class="field-item"><span class="field-label">Empresa</span><span class="field-value">Medley Farmacêutica Ltda.</span></div>
          </div>
        </div>

        <!-- Dados do Plano 1 -->
        <div class="section-card">
          <h3 class="section-card__title">Dados do Plano 1</h3>
          <div class="field-block">
            <span class="field-label">Tipo de Investimento</span>
            <div class="toggle-group">
              <button class="toggle-btn" :class="{ 'toggle-btn--active': plano1.tipo === 'previdencia' }" @click="plano1.tipo = 'previdencia'">Previdência</button>
              <button class="toggle-btn" :class="{ 'toggle-btn--active': plano1.tipo === 'seguro' }" @click="plano1.tipo = 'seguro'">Seguro de Vida</button>
            </div>
          </div>
          <template v-if="plano1.tipo === 'previdencia'">
            <div class="field-block"><span class="field-label">Idade que Deseja se Aposentar</span><span class="field-value">60 anos</span></div>
            <div class="field-grid field-grid--2">
              <div class="inner-card"><span class="field-label">Contribuição Mensal</span><span class="field-value field-value--lg">R$ 1.650,00</span></div>
              <div class="inner-card"><span class="field-label">Valor do Aporte Inicial</span><span class="field-value field-value--lg">R$ 10.000,00</span></div>
            </div>
            <div class="field-block mt-16"><span class="field-label">Tipo de Plano</span><span class="badge badge--neutral">PGBL</span></div>
            <div class="fund-card">
              <div class="fund-card__header">
                <span class="fund-card__name">Absolute Atenas Icatu Prev FIC FIRF CP</span>
                <span class="fund-card__cnpj">47.612.701/0001-45</span>
              </div>
              <div class="fund-card__body">
                <div class="fund-card__row"><span class="fund-card__label">CONTRIBUIÇÃO MENSAL:</span><span class="fund-card__text">Valor Atribuído <strong>R$ 1.650,00</strong></span><span class="fund-card__text">Percentual Atribuído <strong>100%</strong></span></div>
                <div class="fund-card__row"><span class="fund-card__label">APORTE INICIAL:</span><span class="fund-card__text">Valor Atribuído <strong>R$ 10.000,00</strong></span><span class="fund-card__text">Percentual Atribuído <strong>100%</strong></span></div>
                <div class="fund-card__meta"><span>Taxa Máx. Adm.: <strong>0,98% a.a.</strong></span><span>Rentabilidade: <strong>—</strong></span><span>Classificação: <strong>Renda Fixa</strong></span></div>
              </div>
            </div>
          </template>
          <template v-if="plano1.tipo === 'seguro'">
            <div class="product-card"><span class="product-card__name">Horizonte</span><p class="product-card__desc">O Horizonte é o seguro de vida que oferece a combinação perfeita entre proteção e a possibilidade de formação de reserva, de forma temporária ou durante toda a vida.</p></div>
            <table class="coverage-table">
              <thead><tr><th>Cobertura</th><th>Vigência</th><th>Prazo de Pagamento</th><th>Capital Segurado</th><th>Contribuição Mensal</th></tr></thead>
              <tbody>
                <tr><td>Morte por Qualquer Causa</td><td>Vitalício</td><td>20 anos</td><td>R$ 500.000,00</td><td>R$ 850,00</td></tr>
                <tr><td>Invalidez por Acidente</td><td>Vitalício</td><td>20 anos</td><td>R$ 500.000,00</td><td>R$ 300,00</td></tr>
              </tbody>
            </table>
          </template>
        </div>

        <!-- Dados do Plano 2 -->
        <div class="section-card">
          <h3 class="section-card__title">Dados do Plano 2</h3>
          <div class="field-block">
            <span class="field-label">Tipo de Investimento</span>
            <div class="toggle-group">
              <button class="toggle-btn" :class="{ 'toggle-btn--active': plano2.tipo === 'previdencia' }" @click="plano2.tipo = 'previdencia'">Previdência</button>
              <button class="toggle-btn" :class="{ 'toggle-btn--active': plano2.tipo === 'seguro' }" @click="plano2.tipo = 'seguro'">Seguro de Vida</button>
            </div>
          </div>
          <template v-if="plano2.tipo === 'seguro'">
            <div class="product-card"><span class="product-card__name">Horizonte</span><p class="product-card__desc">O Horizonte é o seguro de vida que oferece a combinação perfeita entre proteção e a possibilidade de formação de reserva, de forma temporária ou durante toda a vida.</p></div>
            <table class="coverage-table">
              <thead><tr><th>Cobertura</th><th>Vigência</th><th>Prazo de Pagamento</th><th>Capital Segurado</th><th>Contribuição Mensal</th></tr></thead>
              <tbody>
                <tr><td>Morte por Qualquer Causa</td><td>Vitalício</td><td>20 anos</td><td>R$ 500.000,00</td><td>R$ 850,00</td></tr>
                <tr><td>Invalidez por Acidente</td><td>Vitalício</td><td>20 anos</td><td>R$ 500.000,00</td><td>R$ 300,00</td></tr>
              </tbody>
            </table>
          </template>
          <template v-if="plano2.tipo === 'previdencia'">
            <div class="field-grid field-grid--2">
              <div class="inner-card"><span class="field-label">Contribuição Mensal</span><span class="field-value field-value--lg">R$ 1.650,00</span></div>
              <div class="inner-card"><span class="field-label">Valor do Aporte Inicial</span><span class="field-value field-value--lg">R$ 10.000,00</span></div>
            </div>
          </template>
        </div>

        <div class="page-footer">
          <button class="btn-primary" @click="onTabChange(1)">Continuar</button>
        </div>
      </div>
    </template>

    <!-- ══ ABA 1 — BENEFICIÁRIOS ══ -->
    <template v-if="activeTab === 1">
      <div class="page-content">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <h2 class="page-header__title">Beneficiários</h2>
        </div>

        <div class="inner-tabs">
          <button class="inner-tab" :class="{ 'inner-tab--active': activeSubTab === 0 }" @click="onSubTabChange(0)">Previdência</button>
          <button class="inner-tab" :class="{ 'inner-tab--active': activeSubTab === 1 }" @click="onSubTabChange(1)">Seguro de Vida</button>
        </div>

        <!-- Beneficiários Previdência -->
        <template v-if="activeSubTab === 0">
          <div class="section-card">
            <h3 class="section-card__title">Beneficiários — Previdência</h3>
            <div v-for="(ben, i) in beneficiariosPrev" :key="i" class="beneficiary-card">
              <div class="beneficiary-card__header">
                <span class="beneficiary-card__title">Beneficiário {{ i + 1 }}</span>
                <button v-if="beneficiariosPrev.length > 1" class="btn-remove" @click="removeBenPrev(i)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div class="field-grid field-grid--2">
                <div class="form-field"><label class="field-label">CPF</label><input v-model="ben.cpf" type="text" class="form-input" placeholder="000.000.000-00" /></div>
                <div class="form-field"><label class="field-label">Nome Completo</label><input v-model="ben.nome" type="text" class="form-input" /></div>
                <div class="form-field"><label class="field-label">Data de Nascimento</label><input v-model="ben.dataNasc" type="date" class="form-input" /></div>
                <div class="form-field">
                  <label class="field-label">Grau de Parentesco</label>
                  <select v-model="ben.parentesco" class="form-select">
                    <option value="">Selecione</option>
                    <option>Cônjuge</option><option>Filho(a)</option><option>Pai/Mãe</option><option>Irmão/Irmã</option><option>Outro</option>
                  </select>
                </div>
                <div class="form-field"><label class="field-label">Percentual (%)</label><input v-model.number="ben.percentual" type="number" class="form-input" placeholder="0" min="0" max="100" /></div>
                <div class="form-field"><label class="field-label">Telefone</label><input v-model="ben.telefone" type="text" class="form-input" placeholder="(00) 00000-0000" /></div>
                <div class="form-field form-field--full"><label class="field-label">E-mail</label><input v-model="ben.email" type="email" class="form-input" /></div>
              </div>
            </div>
            <div v-if="somaPrevPercentual !== 100" class="alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              A soma dos percentuais deve ser igual a 100%. Atualmente: {{ somaPrevPercentual }}%
            </div>
            <button class="btn-add-beneficiary" @click="addBenPrev">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
              Adicionar Beneficiário
            </button>
          </div>
        </template>

        <!-- Beneficiários Seguro de Vida -->
        <template v-if="activeSubTab === 1">
          <div class="section-card">
            <h3 class="section-card__title">Beneficiários — Seguro de Vida</h3>
            <div v-for="(ben, i) in beneficiariosSeguro" :key="i" class="beneficiary-card">
              <div class="beneficiary-card__header">
                <span class="beneficiary-card__title">Beneficiário {{ i + 1 }}</span>
                <button v-if="beneficiariosSeguro.length > 1" class="btn-remove" @click="removeBenSeguro(i)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div class="field-grid field-grid--2">
                <div class="form-field"><label class="field-label">CPF</label><input v-model="ben.cpf" type="text" class="form-input" placeholder="000.000.000-00" /></div>
                <div class="form-field"><label class="field-label">Nome Completo</label><input v-model="ben.nome" type="text" class="form-input" /></div>
                <div class="form-field"><label class="field-label">Data de Nascimento</label><input v-model="ben.dataNasc" type="date" class="form-input" /></div>
                <div class="form-field">
                  <label class="field-label">Grau de Parentesco</label>
                  <select v-model="ben.parentesco" class="form-select">
                    <option value="">Selecione</option>
                    <option>Cônjuge</option><option>Filho(a)</option><option>Pai/Mãe</option><option>Irmão/Irmã</option><option>Outro</option>
                  </select>
                </div>
                <div class="form-field"><label class="field-label">Percentual (%)</label><input v-model.number="ben.percentual" type="number" class="form-input" placeholder="0" min="0" max="100" /></div>
                <div class="form-field"><label class="field-label">Telefone</label><input v-model="ben.telefone" type="text" class="form-input" placeholder="(00) 00000-0000" /></div>
                <div class="form-field form-field--full"><label class="field-label">E-mail</label><input v-model="ben.email" type="email" class="form-input" /></div>
              </div>
            </div>
            <div v-if="somaSeguroPercentual !== 100" class="alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              A soma dos percentuais deve ser igual a 100%. Atualmente: {{ somaSeguroPercentual }}%
            </div>
            <button class="btn-add-beneficiary" @click="addBenSeguro">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
              Adicionar Beneficiário
            </button>
          </div>
        </template>

        <div class="page-footer">
          <button class="btn-primary" @click="onTabChange(2)">Continuar</button>
        </div>
      </div>
    </template>

    <!-- ══ ABA 2 — FORMA DE PAGAMENTO ══ -->
    <template v-if="activeTab === 2">
      <div class="page-content">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </span>
          <h2 class="page-header__title">Forma de Pagamento</h2>
        </div>

        <div class="inner-tabs">
          <button class="inner-tab" :class="{ 'inner-tab--active': activeSubTab === 0 }" @click="onSubTabChange(0)">Previdência</button>
          <button class="inner-tab" :class="{ 'inner-tab--active': activeSubTab === 1 }" @click="onSubTabChange(1)">Seguro de Vida</button>
        </div>

        <!-- Pagamento Previdência -->
        <template v-if="activeSubTab === 0">
          <div class="section-card">
            <h3 class="section-card__title">Forma de Pagamento — Previdência</h3>
            <div class="field-block">
              <span class="field-label">Forma de Pagamento</span>
              <div class="radio-group">
                <label class="radio-item"><input v-model="pagamentoPrev.forma" type="radio" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
                <label class="radio-item"><input v-model="pagamentoPrev.forma" type="radio" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
                <label class="radio-item"><input v-model="pagamentoPrev.forma" type="radio" value="cartao" class="radio-input" /><span class="radio-label">Cartão de Crédito</span></label>
              </div>
            </div>
            <template v-if="pagamentoPrev.forma === 'debito'">
              <h4 class="subsection-title">Dados Bancários</h4>
              <div class="field-grid field-grid--3">
                <div class="form-field">
                  <label class="field-label">Banco</label>
                  <select v-model="pagamentoPrev.banco" class="form-select">
                    <option value="">Selecione</option>
                    <option>001 - Banco do Brasil</option><option>033 - Santander</option><option>104 - Caixa Econômica</option><option>237 - Bradesco</option><option>341 - Itaú</option>
                  </select>
                </div>
                <div class="form-field"><label class="field-label">Agência</label><input v-model="pagamentoPrev.agencia" type="text" class="form-input" placeholder="0123" /></div>
                <div class="form-field"><label class="field-label">Conta Corrente</label><input v-model="pagamentoPrev.conta" type="text" class="form-input" placeholder="12345-6" /></div>
                <div class="form-field"><label class="field-label">Titular da Conta</label><input v-model="pagamentoPrev.titular" type="text" class="form-input" /></div>
                <div class="form-field"><label class="field-label">CPF do Titular</label><input v-model="pagamentoPrev.cpfTitular" type="text" class="form-input" /></div>
                <div class="form-field">
                  <label class="field-label">Dia de Vencimento</label>
                  <select v-model="pagamentoPrev.diaVencimento" class="form-select">
                    <option v-for="d in [5,10,15,20,25]" :key="d">Dia {{ d }}</option>
                  </select>
                </div>
              </div>
              <div class="info-box-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                O débito será realizado automaticamente no dia {{ pagamentoPrev.diaVencimento || 'Dia 5' }} de cada mês.
              </div>
            </template>
            <div class="field-block mt-16"><span class="field-label">Valor Mensal Total</span><span class="field-value field-value--lg">R$ 1.650,00</span></div>
          </div>
        </template>

        <!-- Pagamento Seguro de Vida -->
        <template v-if="activeSubTab === 1">
          <div class="section-card">
            <h3 class="section-card__title">Forma de Pagamento — Seguro de Vida</h3>
            <div class="field-block">
              <span class="field-label">Forma de Pagamento</span>
              <div class="radio-group">
                <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
                <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
                <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="cartao" class="radio-input" /><span class="radio-label">Cartão de Crédito</span></label>
              </div>
            </div>
            <template v-if="pagamentoSeguro.forma === 'debito'">
              <h4 class="subsection-title">Dados Bancários</h4>
              <div class="field-grid field-grid--3">
                <div class="form-field">
                  <label class="field-label">Banco</label>
                  <select v-model="pagamentoSeguro.banco" class="form-select">
                    <option value="">Selecione</option>
                    <option>001 - Banco do Brasil</option><option>033 - Santander</option><option>104 - Caixa Econômica</option><option>237 - Bradesco</option><option>341 - Itaú</option>
                  </select>
                </div>
                <div class="form-field"><label class="field-label">Agência</label><input v-model="pagamentoSeguro.agencia" type="text" class="form-input" placeholder="0123" /></div>
                <div class="form-field"><label class="field-label">Conta Corrente</label><input v-model="pagamentoSeguro.conta" type="text" class="form-input" placeholder="12345-6" /></div>
                <div class="form-field"><label class="field-label">Titular da Conta</label><input v-model="pagamentoSeguro.titular" type="text" class="form-input" /></div>
                <div class="form-field"><label class="field-label">CPF do Titular</label><input v-model="pagamentoSeguro.cpfTitular" type="text" class="form-input" /></div>
                <div class="form-field">
                  <label class="field-label">Dia de Vencimento</label>
                  <select v-model="pagamentoSeguro.diaVencimento" class="form-select">
                    <option v-for="d in [5,10,15,20,25]" :key="d">Dia {{ d }}</option>
                  </select>
                </div>
              </div>
              <div class="info-box-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                O débito será realizado automaticamente no dia {{ pagamentoSeguro.diaVencimento || 'Dia 5' }} de cada mês.
              </div>
            </template>
            <div class="field-block mt-16"><span class="field-label">Valor Mensal Total</span><span class="field-value field-value--lg">R$ 2.500,00</span></div>
          </div>
        </template>

        <div class="page-footer">
          <button class="btn-primary" @click="onTabChange(3)">Continuar</button>
        </div>
      </div>
    </template>

    <!-- ══ ABA 3 — REVISÃO DA PROPOSTA ══ -->
    <template v-if="activeTab === 3">
      <div class="page-content">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </span>
          <h2 class="page-header__title">Revisão da Proposta</h2>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Dados do Proponente</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">123.456.789-00</span></div>
            <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">Taís Oliveira Costa</span></div>
            <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">15/05/1984</span></div>
            <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">(21) 99999-0000</span></div>
            <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">tais.oliveira@email.com</span></div>
            <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">R$ 18.000,00</span></div>
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Resumo do Plano</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Tipo de Investimento</span><span class="field-value">Previdência + Seguro de Vida</span></div>
            <div class="field-item"><span class="field-label">Tipo de Plano (Previdência)</span><span class="field-value">PGBL</span></div>
            <div class="field-item"><span class="field-label">Contribuição Mensal (Previdência)</span><span class="field-value">R$ 1.650,00</span></div>
            <div class="field-item"><span class="field-label">Aporte Inicial</span><span class="field-value">R$ 10.000,00</span></div>
            <div class="field-item"><span class="field-label">Contribuição Mensal (Seguro)</span><span class="field-value">R$ 2.500,00</span></div>
            <div class="field-item"><span class="field-label">Data de Emissão</span><span class="field-value">{{ emissaoDate }}</span></div>
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Beneficiários</h3>
          <p class="subsection-label">Previdência</p>
          <div v-for="(ben, i) in beneficiariosPrev" :key="i" class="field-grid field-grid--3 mb-8">
            <div class="field-item"><span class="field-label">Nome</span><span class="field-value">{{ ben.nome || '—' }}</span></div>
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ ben.cpf || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Percentual</span><span class="field-value">{{ ben.percentual || 0 }}%</span></div>
          </div>
          <p class="subsection-label mt-12">Seguro de Vida</p>
          <div v-for="(ben, i) in beneficiariosSeguro" :key="i" class="field-grid field-grid--3 mb-8">
            <div class="field-item"><span class="field-label">Nome</span><span class="field-value">{{ ben.nome || '—' }}</span></div>
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ ben.cpf || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Percentual</span><span class="field-value">{{ ben.percentual || 0 }}%</span></div>
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Forma de Pagamento</h3>
          <div class="field-grid field-grid--2">
            <div class="field-item"><span class="field-label">Previdência</span><span class="field-value">{{ formaLabel(pagamentoPrev.forma) }}</span></div>
            <div class="field-item"><span class="field-label">Seguro de Vida</span><span class="field-value">{{ formaLabel(pagamentoSeguro.forma) }}</span></div>
          </div>
        </div>



        <div class="page-footer">
          <button class="btn-primary">Finalizar Proposta</button>
        </div>
      </div>
    </template>
  </AppShellNested>
</template>

<script setup lang="ts">
interface Beneficiary {
  cpf: string; nome: string; dataNasc: string; parentesco: string; percentual: number; telefone: string; email: string
}
interface PagamentoData {
  forma: string; banco: string; agencia: string; conta: string; titular: string; cpfTitular: string; diaVencimento: string
}

const tabs = [
  { label: 'Detalhamento da Proposta' },
  { label: 'Beneficiários', subTabs: ['Previdência', 'Seguro de Vida'] },
  { label: 'Forma de Pagamento', subTabs: ['Previdência', 'Seguro de Vida'] },
  { label: 'Revisão da Proposta' },
]

const activeTab = ref(0)
const activeSubTab = ref(0)
const plano1 = reactive({ tipo: 'previdencia' })
const plano2 = reactive({ tipo: 'seguro' })
const emissaoDate = new Date().toLocaleDateString('pt-BR')

const newBen = (): Beneficiary => ({ cpf: '', nome: '', dataNasc: '', parentesco: '', percentual: 0, telefone: '', email: '' })
const beneficiariosPrev = ref<Beneficiary[]>([newBen()])
const beneficiariosSeguro = ref<Beneficiary[]>([newBen()])

const somaPrevPercentual = computed(() => beneficiariosPrev.value.reduce((s, b) => s + (b.percentual || 0), 0))
const somaSeguroPercentual = computed(() => beneficiariosSeguro.value.reduce((s, b) => s + (b.percentual || 0), 0))

function addBenPrev() { beneficiariosPrev.value.push(newBen()) }
function removeBenPrev(i: number) { beneficiariosPrev.value.splice(i, 1) }
function addBenSeguro() { beneficiariosSeguro.value.push(newBen()) }
function removeBenSeguro(i: number) { beneficiariosSeguro.value.splice(i, 1) }

const newPag = (): PagamentoData => ({ forma: 'debito', banco: '341 - Itaú', agencia: '', conta: '', titular: 'Taís Oliveira Costa', cpfTitular: '123.456.789-00', diaVencimento: 'Dia 5' })
const pagamentoPrev = reactive(newPag())
const pagamentoSeguro = reactive(newPag())

function formaLabel(forma: string) {
  const m: Record<string, string> = { debito: 'Débito em Conta Corrente', boleto: 'Boleto Bancário', cartao: 'Cartão de Crédito' }
  return m[forma] || '—'
}
function onTabChange(index: number) { activeTab.value = index; activeSubTab.value = 0 }
function onSubTabChange(index: number) { activeSubTab.value = index }
</script>

<style scoped>
.page-content { padding: 28px 40px 80px; }
.page-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
.page-header__icon { color: var(--text-muted); display: flex; align-items: center; }
.page-header__title { font-family: var(--font-sans); font-size: 20px; font-weight: 600; color: var(--text-primary); margin: 0; }
.inner-tabs { display: flex; gap: 0; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); }
.inner-tab { padding: 10px 20px; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--text-muted); transition: color 0.15s, border-color 0.15s; margin-bottom: -1px; }
.inner-tab:hover { color: var(--text-primary); }
.inner-tab--active { color: var(--text-primary); border-bottom-color: var(--btn-primary-bg); font-weight: 600; }
.section-card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 24px; margin-bottom: 16px; }
.section-card--highlight { background-color: #f8fafc; }
.section-card__title { display: flex; align-items: center; gap: 8px; font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color); }
.field-grid { display: grid; gap: 16px 24px; }
.field-grid--2 { grid-template-columns: 1fr 1fr; }
.field-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
.field-item { display: flex; flex-direction: column; gap: 4px; }
.field-label { font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.6px; }
.field-value { font-family: var(--font-sans); font-size: 15px; font-weight: 400; color: var(--text-primary); }
.field-value--lg { font-size: 16px; font-weight: 600; }
.field-value--xl { font-size: 18px; font-weight: 700; }
.field-block { margin-bottom: 16px; }
.toggle-group { display: flex; gap: 0; margin-top: 8px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); }
.toggle-btn { flex: 1; padding: 10px 16px; background: white; border: none; cursor: pointer; font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--text-muted); transition: background-color 0.15s, color 0.15s; }
.toggle-btn + .toggle-btn { border-left: 1px solid var(--border-color); }
.toggle-btn--active { background-color: var(--btn-primary-bg); color: var(--btn-primary-color); }
.inner-card { background-color: #f8fafc; border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; display: flex; flex-direction: column; gap: 6px; }
.fund-card { border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; margin-top: 8px; }
.fund-card__header { padding: 12px 16px; background-color: #f8fafc; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 12px; }
.fund-card__name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.fund-card__cnpj { font-size: 12px; color: var(--text-muted); }
.fund-card__body { padding: 12px 16px; display: flex; flex-direction: column; gap: 6px; }
.fund-card__row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.fund-card__label { font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.5px; min-width: 140px; }
.fund-card__text { font-size: 12px; color: var(--text-primary); }
.fund-card__meta { display: flex; gap: 20px; margin-top: 4px; flex-wrap: wrap; }
.fund-card__meta span { font-size: 12px; color: var(--text-muted); }
.product-card { border: 1px solid var(--border-color); border-radius: 6px; padding: 14px 16px; margin-top: 8px; }
.product-card__name { font-size: 14px; font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 6px; }
.product-card__desc { font-size: 13px; color: var(--text-muted); margin: 0; line-height: 1.5; }
.coverage-table { width: 100%; border-collapse: collapse; margin-top: 12px; font-family: var(--font-sans); font-size: 13px; }
.coverage-table th { padding: 8px 12px; text-align: left; font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.5px; background-color: #f8fafc; border-bottom: 1px solid var(--border-color); }
.coverage-table td { padding: 10px 12px; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
.coverage-table tr:last-child td { border-bottom: none; }
.badge { display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-top: 4px; }
.badge--neutral { background-color: #f1f5f9; color: var(--text-primary); border: 1px solid var(--border-color); }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field--full { grid-column: 1 / -1; }
.form-input { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); padding: 9px 12px; border: 1px solid var(--border-color); border-radius: 6px; background-color: white; outline: none; transition: border-color 0.15s; width: 100%; box-sizing: border-box; }
.form-input:focus { border-color: #94a3b8; }
.form-select { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); padding: 9px 12px; border: 1px solid var(--border-color); border-radius: 6px; background-color: white; outline: none; cursor: pointer; width: 100%; box-sizing: border-box; }
.beneficiary-card { border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
.beneficiary-card__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.beneficiary-card__title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.btn-remove { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 4px; display: flex; align-items: center; transition: color 0.12s, background-color 0.12s; }
.btn-remove:hover { color: #ef4444; background-color: #fef2f2; }
.btn-add-beneficiary { display: flex; align-items: center; gap: 6px; padding: 9px 16px; background: none; border: 1.5px dashed var(--border-color); border-radius: 6px; cursor: pointer; font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--text-muted); width: 100%; justify-content: center; transition: border-color 0.15s, color 0.15s; margin-top: 4px; }
.btn-add-beneficiary:hover { border-color: #94a3b8; color: var(--text-primary); }
.alert-warning { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 6px; font-size: 13px; color: #854d0e; margin: 8px 0; }
.radio-group { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
.radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.radio-input { width: 16px; height: 16px; cursor: pointer; accent-color: var(--btn-primary-bg); }
.radio-label { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); }
.info-box-blue { display: flex; align-items: flex-start; gap: 8px; padding: 12px 14px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; margin-top: 12px; line-height: 1.5; }
.subsection-title { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 16px 0 12px; }
.subsection-label { font-family: var(--font-sans); font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px; }
.solutions-text { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); line-height: 1.6; margin: 0 0 4px; }
.page-footer { display: flex; justify-content: flex-end; padding-top: 24px; }
.btn-primary { font-family: var(--font-sans); font-size: 14px; font-weight: 500; padding: 10px 24px; border-radius: 8px; border: none; cursor: pointer; background-color: var(--btn-primary-bg); color: var(--btn-primary-color); transition: opacity 0.15s; line-height: 1; }
.btn-primary:hover { opacity: 0.85; }
.mt-16 { margin-top: 16px; }
.mt-12 { margin-top: 12px; }
.mb-8 { margin-bottom: 8px; }
</style>
