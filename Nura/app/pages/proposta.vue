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

        <!-- Dados do Proponente (somente leitura) -->
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
            <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">(11) 98765-4321</span></div>
            <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">tais.oliveira@email.com</span></div>
            <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">R$ 18.000,00</span></div>
            <div class="field-item"><span class="field-label">Ocupação</span><span class="field-value">Gerente de Marketing</span></div>
            <div class="field-item"><span class="field-label">Empresa</span><span class="field-value">Tech Solutions Brasil</span></div>
          </div>
        </div>

        <!-- Dados do Plano 1 — Previdência (somente leitura) -->
        <div class="section-card">
          <h3 class="section-card__title">Dados do Plano 1 — Previdência</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Tipo de Investimento</span><span class="field-value">Previdência</span></div>
            <div class="field-item">
              <span class="field-label">Idade que Deseja se Aposentar</span>
              <span class="field-value">60 anos</span>
            </div>
            <div class="field-item"><span class="field-label">Tipo de Plano</span><span class="field-value"><span class="badge badge--neutral">PGBL</span></span></div>
            <div class="field-item"><span class="field-label">Contribuição Mensal</span><span class="field-value">R$ 1.650,00</span></div>
            <div class="field-item"><span class="field-label">Valor do Aporte Inicial</span><span class="field-value">R$ 10.000,00</span></div>
          </div>
          <div class="fund-card mt-16">
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
        </div>

        <!-- Dados do Plano 2 — Seguro de Vida (somente leitura) -->
        <div class="section-card">
          <h3 class="section-card__title">Dados do Plano 2 — Seguro de Vida</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Tipo de Investimento</span><span class="field-value">Seguro de Vida</span></div>
            <div class="field-item"><span class="field-label">Produto</span><span class="field-value">Horizonte</span></div>
          </div>
          <div class="product-card mt-16">
            <span class="product-card__name">Horizonte</span>
            <p class="product-card__desc">O Horizonte é o seguro de vida que oferece a combinação perfeita entre proteção e a possibilidade de formação de reserva, de forma temporária ou durante toda a vida.</p>
          </div>
          <table class="coverage-table mt-12">
            <thead><tr><th>Cobertura</th><th>Vigência</th><th>Prazo de Pagamento</th><th>Capital Segurado</th><th>Contribuição Mensal</th></tr></thead>
            <tbody>
              <tr><td>Morte Natural ou Acidental + Adiantamento por Doença Terminal (obrigatório)</td><td>Vitalícia</td><td>—</td><td>R$ 2.961.000,00</td><td><strong>R$ 1.184,40</strong></td></tr>
              <tr><td>Indenização Especial de Morte por Acidente (IEA)</td><td>Vitalícia</td><td>—</td><td>R$ 1.484.000,00</td><td><strong>R$ 593,60</strong></td></tr>
              <tr><td>Invalidez Permanente por Acidente - Total ou Parcial (IPA)</td><td>Vitalícia</td><td>—</td><td>R$ 1.484.000,00</td><td><strong>R$ 593,60</strong></td></tr>
              <tr><td>Indenização Especial de Invalidez por Doença (IED)</td><td>Vitalícia</td><td>—</td><td>R$ 155.000,00</td><td><strong>R$ 62,00</strong></td></tr>
              <tr><td>Doenças Graves (DG)</td><td>Vitalícia</td><td>—</td><td>R$ 155.000,00</td><td><strong>R$ 62,00</strong></td></tr>
              <tr><td>Diária por Incapacidade Temporária (DIT)</td><td>Vitalícia</td><td>—</td><td>R$ 4.000,00</td><td><strong>R$ 1,60</strong></td></tr>
              <tr><td>Diária por Internação Hospitalar (DIH)</td><td>Vitalícia</td><td>—</td><td>R$ 2.000,00</td><td><strong>R$ 0,80</strong></td></tr>
              <tr><td>Serviço de Assistência Funeral (SAF)</td><td>Vitalícia</td><td>—</td><td>R$ 5.000,00</td><td><strong>R$ 2,00</strong></td></tr>
            </tbody>
            <tfoot>
              <tr class="coverage-table__total">
                <td colspan="3"><strong>Total</strong></td>
                <td>—</td>
                <td>R$ 2.500,00/mês</td>
              </tr>
            </tfoot>
          </table>
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

        <!-- ── Pagamento Previdência (sem Cartão de Crédito) ── -->
        <template v-if="activeSubTab === 0">
          <div class="section-card">
            <h3 class="section-card__title">Forma de Pagamento — Previdência</h3>
            <div class="radio-group mb-16">
              <label class="radio-item"><input v-model="pagamentoPrev.forma" type="radio" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
              <label class="radio-item"><input v-model="pagamentoPrev.forma" type="radio" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
            </div>

            <!-- Débito em Conta Corrente -->
            <template v-if="pagamentoPrev.forma === 'debito'">
              <h4 class="subsection-title">Dados Bancários</h4>
              <div class="field-grid field-grid--3">
                <div class="form-field">
                  <label class="field-label">Banco</label>
                  <select v-model="pagamentoPrev.banco" class="form-select">
                    <option value="">Selecione</option>
                    <option>001 - Banco do Brasil</option><option>033 - Santander</option><option>104 - Caixa Econômica Federal</option><option>237 - Bradesco</option><option>341 - Itaú</option><option>756 - Sicoob</option><option>748 - Sicredi</option><option>260 - Nubank</option>
                  </select>
                </div>
                <div class="form-field"><label class="field-label">Agência</label><input v-model="pagamentoPrev.agencia" type="text" class="form-input" placeholder="0123" /></div>
                <div class="form-field"><label class="field-label">Conta Corrente</label><input v-model="pagamentoPrev.conta" type="text" class="form-input" placeholder="12345-6" /></div>
                <div class="form-field"><label class="field-label">Titular da Conta</label><input v-model="pagamentoPrev.titular" type="text" class="form-input" placeholder="Nome do titular" /></div>
                <div class="form-field"><label class="field-label">CPF do Titular</label><input v-model="pagamentoPrev.cpfTitular" type="text" class="form-input" placeholder="000.000.000-00" /></div>
                <div class="form-field">
                  <label class="field-label">Dia de Vencimento</label>
                  <select v-model="pagamentoPrev.diaVencimento" class="form-select">
                    <option value="">Selecione o dia</option>
                    <option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option>
                  </select>
                </div>
              </div>
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>O débito será realizado automaticamente no {{ pagamentoPrev.diaVencimento || 'dia selecionado' }} de cada mês.<br>Certifique-se de que há saldo suficiente na conta para evitar problemas no processamento.<br>Caso tenha selecionado a opção de um aporte único e contribuições mensais, o primeiro débito será a soma destes valores e ocorrerá em 7 dias úteis após a conclusão da contratação da proposta.</span>
              </div>
            </template>

            <!-- Boleto Bancário -->
            <template v-if="pagamentoPrev.forma === 'boleto'">
              <div class="field-grid field-grid--2 mt-16">
                <div class="form-field">
                  <label class="field-label">Dia de Vencimento</label>
                  <select v-model="pagamentoPrev.diaVencimento" class="form-select">
                    <option value="">Selecione o dia</option>
                    <option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option>
                  </select>
                </div>
              </div>
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><strong>Atenção:</strong> Após a emissão do certificado, a seguradora enviará o boleto em até 5 dias úteis para o e-mail cadastrado. Fique atento à caixa de Spam.<br>Caso tenha selecionado a opção de um aporte único e contribuições mensais, o primeiro boleto será a soma destes valores. Este será emitido somente após a conclusão da contratação da proposta.</span>
              </div>
            </template>

            <!-- Pergunta Responsável Financeiro -->
            <div class="field-block mt-20">
              <span class="field-label">Dados do Responsável Financeiro serão os mesmos aos Dados do Proponente?</span>
              <div class="radio-group mt-8">
                <label class="radio-item"><input v-model="pagamentoPrev.respFinanceiro" type="radio" value="sim" class="radio-input" @change="preencherRespFinanceiroPrev" /><span class="radio-label">Sim</span></label>
                <label class="radio-item"><input v-model="pagamentoPrev.respFinanceiro" type="radio" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
              </div>
            </div>

            <!-- Dados do Responsável Financeiro (quando Não) -->
            <template v-if="pagamentoPrev.respFinanceiro === 'nao'">
              <div class="section-card mt-16" style="background:#f8fafc;">
                <h4 class="subsection-title" style="margin-top:0">Dados do Responsável Financeiro</h4>
                <div class="field-grid field-grid--3">
                  <div class="form-field"><label class="field-label">Nome Completo</label><input v-model="pagamentoPrev.rfNome" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="field-label">CPF</label><input v-model="pagamentoPrev.rfCpf" type="text" class="form-input" placeholder="000.000.000-00" /></div>
                  <div class="form-field"><label class="field-label">Data de Nascimento</label><input v-model="pagamentoPrev.rfDataNasc" type="date" class="form-input" /></div>
                  <div class="form-field"><label class="field-label">Telefone</label><input v-model="pagamentoPrev.rfTelefone" type="text" class="form-input" placeholder="(00) 00000-0000" /></div>
                  <div class="form-field"><label class="field-label">E-mail</label><input v-model="pagamentoPrev.rfEmail" type="email" class="form-input" /></div>
                </div>
              </div>
            </template>

            <!-- Valor Total -->
            <div class="valor-total-row mt-16">
              <span class="field-label">Valor Total</span>
              <span class="valor-total-value">R$ 10.000 de Aporte Inicial + R$ 1.650/mês de Contribuição Mensal</span>
            </div>
          </div>
        </template>

        <!-- ── Pagamento Seguro de Vida (com Cartão de Crédito) ── -->
        <template v-if="activeSubTab === 1">
          <div class="section-card">
            <h3 class="section-card__title">Forma de Pagamento — Seguro de Vida</h3>
            <div class="radio-group mb-16">
              <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
              <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
              <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="cartao" class="radio-input" /><span class="radio-label">Cartão de Crédito</span></label>
            </div>

            <!-- Débito em Conta Corrente -->
            <template v-if="pagamentoSeguro.forma === 'debito'">
              <h4 class="subsection-title">Dados Bancários</h4>
              <div class="field-grid field-grid--3">
                <div class="form-field">
                  <label class="field-label">Banco</label>
                  <select v-model="pagamentoSeguro.banco" class="form-select">
                    <option value="">Selecione</option>
                    <option>001 - Banco do Brasil</option><option>033 - Santander</option><option>104 - Caixa Econômica Federal</option><option>237 - Bradesco</option><option>341 - Itaú</option><option>756 - Sicoob</option><option>748 - Sicredi</option><option>260 - Nubank</option>
                  </select>
                </div>
                <div class="form-field"><label class="field-label">Agência</label><input v-model="pagamentoSeguro.agencia" type="text" class="form-input" placeholder="0123" /></div>
                <div class="form-field"><label class="field-label">Conta Corrente</label><input v-model="pagamentoSeguro.conta" type="text" class="form-input" placeholder="12345-6" /></div>
                <div class="form-field"><label class="field-label">Titular da Conta</label><input v-model="pagamentoSeguro.titular" type="text" class="form-input" placeholder="Nome do titular" /></div>
                <div class="form-field"><label class="field-label">CPF do Titular</label><input v-model="pagamentoSeguro.cpfTitular" type="text" class="form-input" placeholder="000.000.000-00" /></div>
                <div class="form-field">
                  <label class="field-label">Dia de Vencimento</label>
                  <select v-model="pagamentoSeguro.diaVencimento" class="form-select">
                    <option value="">Selecione o dia</option>
                    <option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option>
                  </select>
                </div>
              </div>
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>O débito será realizado automaticamente no {{ pagamentoSeguro.diaVencimento || 'dia selecionado' }} de cada mês.<br>Certifique-se de que há saldo suficiente na conta para evitar problemas no processamento.<br>Caso tenha selecionado a opção de um aporte único e contribuições mensais, o primeiro débito será a soma destes valores e ocorrerá em 7 dias úteis após a conclusão da contratação da proposta.</span>
              </div>
            </template>

            <!-- Boleto Bancário -->
            <template v-if="pagamentoSeguro.forma === 'boleto'">
              <div class="field-grid field-grid--2 mt-16">
                <div class="form-field">
                  <label class="field-label">Dia de Vencimento</label>
                  <select v-model="pagamentoSeguro.diaVencimento" class="form-select">
                    <option value="">Selecione o dia</option>
                    <option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option>
                  </select>
                </div>
              </div>
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><strong>Atenção:</strong> Após a emissão do certificado, a seguradora enviará o boleto em até 5 dias úteis para o e-mail cadastrado. Fique atento à caixa de Spam.<br>Caso tenha selecionado a opção de um aporte único e contribuições mensais, o primeiro boleto será a soma destes valores. Este será emitido somente após a conclusão da contratação da proposta.</span>
              </div>
            </template>

            <!-- Cartão de Crédito (apenas Seguro de Vida) -->
            <template v-if="pagamentoSeguro.forma === 'cartao'">
              <h4 class="subsection-title">Dados do Cartão</h4>
              <div class="field-grid field-grid--2">
                <div class="form-field"><label class="field-label">Nome no Cartão</label><input v-model="pagamentoSeguro.nomeCartao" type="text" class="form-input" placeholder="Nome como está no cartão" /></div>
                <div class="form-field"><label class="field-label">Número do Cartão</label><input v-model="pagamentoSeguro.numeroCartao" type="text" class="form-input" placeholder="0000 0000 0000 0000" /></div>
                <div class="form-field"><label class="field-label">Validade</label><input v-model="pagamentoSeguro.validade" type="text" class="form-input" placeholder="MM/AA" /></div>
                <div class="form-field"><label class="field-label">CVV</label><input v-model="pagamentoSeguro.cvv" type="text" class="form-input" placeholder="000" /></div>
                <div class="form-field"><label class="field-label">CPF do Titular</label><input v-model="pagamentoSeguro.cpfTitular" type="text" class="form-input" placeholder="000.000.000-00" /></div>
              </div>
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Será realizada apenas uma <strong>reserva do valor</strong> junto à operadora e ao banco do cartão de crédito.<br>A cobrança só será finalizada após a conclusão do processo de contratação da proposta.</span>
              </div>
            </template>

            <!-- Pergunta Responsável Financeiro -->
            <div class="field-block mt-20">
              <span class="field-label">Dados do Responsável Financeiro serão os mesmos aos Dados do Proponente?</span>
              <div class="radio-group mt-8">
                <label class="radio-item"><input v-model="pagamentoSeguro.respFinanceiro" type="radio" value="sim" class="radio-input" @change="preencherRespFinanceiroSeguro" /><span class="radio-label">Sim</span></label>
                <label class="radio-item"><input v-model="pagamentoSeguro.respFinanceiro" type="radio" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
              </div>
            </div>

            <!-- Dados do Responsável Financeiro (quando Não) -->
            <template v-if="pagamentoSeguro.respFinanceiro === 'nao'">
              <div class="section-card mt-16" style="background:#f8fafc;">
                <h4 class="subsection-title" style="margin-top:0">Dados do Responsável Financeiro</h4>
                <div class="field-grid field-grid--3">
                  <div class="form-field"><label class="field-label">Nome Completo</label><input v-model="pagamentoSeguro.rfNome" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="field-label">CPF</label><input v-model="pagamentoSeguro.rfCpf" type="text" class="form-input" placeholder="000.000.000-00" /></div>
                  <div class="form-field"><label class="field-label">Data de Nascimento</label><input v-model="pagamentoSeguro.rfDataNasc" type="date" class="form-input" /></div>
                  <div class="form-field"><label class="field-label">Telefone</label><input v-model="pagamentoSeguro.rfTelefone" type="text" class="form-input" placeholder="(00) 00000-0000" /></div>
                  <div class="form-field"><label class="field-label">E-mail</label><input v-model="pagamentoSeguro.rfEmail" type="email" class="form-input" /></div>
                </div>
              </div>
            </template>

            <!-- Valor Total -->
            <div class="valor-total-row mt-16">
              <span class="field-label">Valor Total</span>
              <span class="valor-total-value">R$ 2.500,00/mês</span>
            </div>
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

        <!-- Dados do Proponente -->
        <div class="section-card">
          <h3 class="section-card__title">Dados do Proponente</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">123.456.789-00</span></div>
            <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">Taís Oliveira Costa</span></div>
            <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">15/05/1984</span></div>
            <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">(11) 98765-4321</span></div>
            <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">tais.oliveira@email.com</span></div>
            <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">R$ 18.000,00</span></div>
          </div>
        </div>

        <!-- Resumo do Plano — separado por sub-aba -->
        <div class="section-card">
          <h3 class="section-card__title">Resumo do Plano</h3>

          <!-- Previdência -->
          <div class="review-subtab-header">Previdência</div>
          <div class="field-grid field-grid--3 mb-16">
            <div class="field-item"><span class="field-label">Tipo de Investimento</span><span class="field-value">Previdência</span></div>
            <div class="field-item"><span class="field-label">Idade que Deseja se Aposentar</span><span class="field-value">60 anos</span></div>
            <div class="field-item"><span class="field-label">Tipo de Plano</span><span class="field-value"><span class="badge badge--neutral">PGBL</span></span></div>
            <div class="field-item"><span class="field-label">Contribuição Mensal</span><span class="field-value">R$ 1.650,00</span></div>
            <div class="field-item"><span class="field-label">Valor do Aporte Inicial</span><span class="field-value">R$ 10.000,00</span></div>
          </div>
          <div class="fund-card mb-16">
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

          <!-- Separador -->
          <div class="review-subtab-divider"></div>

          <!-- Seguro de Vida -->
          <div class="review-subtab-header">Seguro de Vida</div>
          <div class="field-grid field-grid--3 mb-16">
            <div class="field-item"><span class="field-label">Tipo de Investimento</span><span class="field-value">Seguro de Vida</span></div>
            <div class="field-item"><span class="field-label">Produto</span><span class="field-value">Horizonte</span></div>
          </div>
          <div class="product-card mb-12">
            <span class="product-card__name">Horizonte</span>
            <p class="product-card__desc">O Horizonte é o seguro de vida que oferece a combinação perfeita entre proteção e a possibilidade de formação de reserva, de forma temporária ou durante toda a vida.</p>
          </div>
          <table class="coverage-table">
            <thead><tr><th>Cobertura</th><th>Vigência</th><th>Prazo de Pagamento</th><th>Capital Segurado</th><th>Contribuição Mensal</th></tr></thead>
            <tbody>
              <tr><td>Morte Natural ou Acidental + Adiantamento por Doença Terminal (obrigatório)</td><td>Vitalícia</td><td>—</td><td>R$ 2.961.000,00</td><td><strong>R$ 1.184,40</strong></td></tr>
              <tr><td>Indenização Especial de Morte por Acidente (IEA)</td><td>Vitalícia</td><td>—</td><td>R$ 1.484.000,00</td><td><strong>R$ 593,60</strong></td></tr>
              <tr><td>Invalidez Permanente por Acidente - Total ou Parcial (IPA)</td><td>Vitalícia</td><td>—</td><td>R$ 1.484.000,00</td><td><strong>R$ 593,60</strong></td></tr>
              <tr><td>Indenização Especial de Invalidez por Doença (IED)</td><td>Vitalícia</td><td>—</td><td>R$ 155.000,00</td><td><strong>R$ 62,00</strong></td></tr>
              <tr><td>Doenças Graves (DG)</td><td>Vitalícia</td><td>—</td><td>R$ 155.000,00</td><td><strong>R$ 62,00</strong></td></tr>
              <tr><td>Diária por Incapacidade Temporária (DIT)</td><td>Vitalícia</td><td>—</td><td>R$ 4.000,00</td><td><strong>R$ 1,60</strong></td></tr>
              <tr><td>Diária por Internação Hospitalar (DIH)</td><td>Vitalícia</td><td>—</td><td>R$ 2.000,00</td><td><strong>R$ 0,80</strong></td></tr>
              <tr><td>Serviço de Assistência Funeral (SAF)</td><td>Vitalícia</td><td>—</td><td>R$ 5.000,00</td><td><strong>R$ 2,00</strong></td></tr>
            </tbody>
            <tfoot>
              <tr class="coverage-table__total">
                <td colspan="3"><strong>Total</strong></td>
                <td>—</td>
                <td>R$ 2.500,00/mês</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Beneficiários — separado por sub-aba -->
        <div class="section-card">
          <h3 class="section-card__title">Beneficiários</h3>

          <!-- Previdência -->
          <div class="review-subtab-header">Previdência</div>
          <div v-for="(ben, i) in beneficiariosPrev" :key="`prev-${i}`" class="beneficiary-review mb-8">
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">Nome</span><span class="field-value">{{ ben.nome || '—' }}</span></div>
              <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ ben.cpf || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Percentual</span><span class="field-value">{{ ben.percentual || 0 }}%</span></div>
              <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ ben.dataNasc || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Grau de Parentesco</span><span class="field-value">{{ ben.parentesco || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">{{ ben.telefone || '—' }}</span></div>
              <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">{{ ben.email || '—' }}</span></div>
            </div>
          </div>

          <!-- Separador -->
          <div class="review-subtab-divider"></div>

          <!-- Seguro de Vida -->
          <div class="review-subtab-header">Seguro de Vida</div>
          <div v-for="(ben, i) in beneficiariosSeguro" :key="`seg-${i}`" class="beneficiary-review mb-8">
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">Nome</span><span class="field-value">{{ ben.nome || '—' }}</span></div>
              <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ ben.cpf || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Percentual</span><span class="field-value">{{ ben.percentual || 0 }}%</span></div>
              <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ ben.dataNasc || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Grau de Parentesco</span><span class="field-value">{{ ben.parentesco || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">{{ ben.telefone || '—' }}</span></div>
              <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">{{ ben.email || '—' }}</span></div>
            </div>
          </div>
        </div>

        <!-- Forma de Pagamento — separado por sub-aba -->
        <div class="section-card">
          <h3 class="section-card__title">Forma de Pagamento</h3>

          <!-- Previdência -->
          <div class="review-subtab-header">Previdência</div>
          <div class="field-grid field-grid--3 mb-16">
            <div class="field-item"><span class="field-label">Forma</span><span class="field-value">{{ formaLabel(pagamentoPrev.forma) }}</span></div>
            <template v-if="pagamentoPrev.forma === 'debito'">
              <div class="field-item"><span class="field-label">Banco</span><span class="field-value">{{ pagamentoPrev.banco || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Agência</span><span class="field-value">{{ pagamentoPrev.agencia || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Conta Corrente</span><span class="field-value">{{ pagamentoPrev.conta || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Titular da Conta</span><span class="field-value">{{ pagamentoPrev.titular || '—' }}</span></div>
              <div class="field-item"><span class="field-label">CPF do Titular</span><span class="field-value">{{ pagamentoPrev.cpfTitular || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Dia de Vencimento</span><span class="field-value">{{ pagamentoPrev.diaVencimento || '—' }}</span></div>
            </template>
            <template v-if="pagamentoPrev.forma === 'boleto'">
              <div class="field-item"><span class="field-label">Dia de Vencimento</span><span class="field-value">{{ pagamentoPrev.diaVencimento || '—' }}</span></div>
            </template>
            <div class="field-item" style="grid-column:1/-1"><span class="field-label">Valor Total</span><span class="valor-total-value">R$ 10.000 de Aporte Inicial + R$ 1.650/mês de Contribuição Mensal</span></div>
            <template v-if="pagamentoPrev.respFinanceiro">
              <div class="field-item"><span class="field-label">Responsável Financeiro</span><span class="field-value">{{ pagamentoPrev.respFinanceiro === 'sim' ? 'Mesmo que o Proponente' : pagamentoPrev.rfNome || '—' }}</span></div>
            </template>
          </div>

          <!-- Separador -->
          <div class="review-subtab-divider"></div>

          <!-- Seguro de Vida -->
          <div class="review-subtab-header">Seguro de Vida</div>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Forma</span><span class="field-value">{{ formaLabel(pagamentoSeguro.forma) }}</span></div>
            <template v-if="pagamentoSeguro.forma === 'debito'">
              <div class="field-item"><span class="field-label">Banco</span><span class="field-value">{{ pagamentoSeguro.banco || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Agência</span><span class="field-value">{{ pagamentoSeguro.agencia || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Conta Corrente</span><span class="field-value">{{ pagamentoSeguro.conta || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Titular da Conta</span><span class="field-value">{{ pagamentoSeguro.titular || '—' }}</span></div>
              <div class="field-item"><span class="field-label">CPF do Titular</span><span class="field-value">{{ pagamentoSeguro.cpfTitular || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Dia de Vencimento</span><span class="field-value">{{ pagamentoSeguro.diaVencimento || '—' }}</span></div>
            </template>
            <template v-if="pagamentoSeguro.forma === 'boleto'">
              <div class="field-item"><span class="field-label">Dia de Vencimento</span><span class="field-value">{{ pagamentoSeguro.diaVencimento || '—' }}</span></div>
            </template>
            <template v-if="pagamentoSeguro.forma === 'cartao'">
              <div class="field-item"><span class="field-label">Nome no Cartão</span><span class="field-value">{{ pagamentoSeguro.nomeCartao || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Número do Cartão</span><span class="field-value">{{ pagamentoSeguro.numeroCartao ? '•••• •••• •••• ' + pagamentoSeguro.numeroCartao.slice(-4) : '—' }}</span></div>
              <div class="field-item"><span class="field-label">Validade</span><span class="field-value">{{ pagamentoSeguro.validade || '—' }}</span></div>
              <div class="field-item"><span class="field-label">CPF do Titular</span><span class="field-value">{{ pagamentoSeguro.cpfTitular || '—' }}</span></div>
            </template>
            <div class="field-item" style="grid-column:1/-1"><span class="field-label">Valor Total</span><span class="valor-total-value">R$ 2.500,00/mês</span></div>
            <template v-if="pagamentoSeguro.respFinanceiro">
              <div class="field-item"><span class="field-label">Responsável Financeiro</span><span class="field-value">{{ pagamentoSeguro.respFinanceiro === 'sim' ? 'Mesmo que o Proponente' : pagamentoSeguro.rfNome || '—' }}</span></div>
            </template>
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
  nomeCartao?: string; numeroCartao?: string; validade?: string; cvv?: string
  respFinanceiro?: string
  rfNome?: string; rfCpf?: string; rfDataNasc?: string; rfTelefone?: string; rfEmail?: string
}

const tabs = [
  { label: 'Detalhamento da Proposta' },
  { label: 'Beneficiários', subTabs: ['Previdência', 'Seguro de Vida'] },
  { label: 'Forma de Pagamento', subTabs: ['Previdência', 'Seguro de Vida'] },
  { label: 'Revisão da Proposta' },
]

const activeTab = ref(0)
const activeSubTab = ref(0)
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

const newPag = (): PagamentoData => ({ forma: 'debito', banco: '', agencia: '', conta: '', titular: '', cpfTitular: '', diaVencimento: '' })
const pagamentoPrev = reactive(newPag())
const pagamentoSeguro = reactive({ ...newPag(), nomeCartao: '', numeroCartao: '', validade: '', cvv: '' })

function preencherRespFinanceiroPrev() {
  pagamentoPrev.rfNome = 'Taís Oliveira Costa'
  pagamentoPrev.rfCpf = '123.456.789-00'
  pagamentoPrev.rfDataNasc = '1990-05-15'
  pagamentoPrev.rfTelefone = '(11) 99999-9999'
  pagamentoPrev.rfEmail = 'tais@email.com'
}
function preencherRespFinanceiroSeguro() {
  pagamentoSeguro.rfNome = 'Taís Oliveira Costa'
  pagamentoSeguro.rfCpf = '123.456.789-00'
  pagamentoSeguro.rfDataNasc = '1990-05-15'
  pagamentoSeguro.rfTelefone = '(11) 99999-9999'
  pagamentoSeguro.rfEmail = 'tais@email.com'
}
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
.section-card__title { display: flex; align-items: center; gap: 8px; font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color); }
.field-grid { display: grid; gap: 16px 24px; }
.field-grid--2 { grid-template-columns: 1fr 1fr; }
.field-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
.field-item { display: flex; flex-direction: column; gap: 4px; }
.field-label { font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.6px; }
.field-value { font-family: var(--font-sans); font-size: 15px; font-weight: 400; color: var(--text-primary); }
.field-value--lg { font-size: 16px; font-weight: 600; }
.field-block { margin-bottom: 16px; }
.inner-card { background-color: #f8fafc; border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; display: flex; flex-direction: column; gap: 6px; }
.fund-card { border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; }
.fund-card__header { padding: 12px 16px; background-color: #f8fafc; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 12px; }
.fund-card__name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.fund-card__cnpj { font-size: 12px; color: var(--text-muted); }
.fund-card__body { padding: 12px 16px; display: flex; flex-direction: column; gap: 6px; }
.fund-card__row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.fund-card__label { font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.5px; min-width: 140px; }
.fund-card__text { font-size: 12px; color: var(--text-primary); }
.fund-card__meta { display: flex; gap: 20px; margin-top: 4px; flex-wrap: wrap; }
.fund-card__meta span { font-size: 12px; color: var(--text-muted); }
.product-card { border: 1px solid var(--border-color); border-radius: 6px; padding: 14px 16px; }
.product-card__name { font-size: 14px; font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 6px; }
.product-card__desc { font-size: 13px; color: var(--text-muted); margin: 0; line-height: 1.5; }
.coverage-table { width: 100%; border-collapse: collapse; font-family: var(--font-sans); font-size: 13px; }
.coverage-table th { padding: 8px 12px; text-align: left; font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.5px; background-color: #f8fafc; border-bottom: 1px solid var(--border-color); }
.coverage-table td { padding: 10px 12px; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
.coverage-table tr:last-child td { border-bottom: none; }
.coverage-table__total td { background-color: #f8fafc; font-size: 13px; font-weight: 600; color: var(--text-primary); border-top: 2px solid var(--border-color); padding: 10px 12px; }
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
.btn-add-beneficiary { display: flex; align-items: center; gap: 6px; padding: 9px 16px; background: none; border: 1.5px dashed var(--border-color); border-radius: 6px; cursor: pointer; font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--text-muted); transition: border-color 0.12s, color 0.12s; margin-top: 4px; }
.btn-add-beneficiary:hover { border-color: #94a3b8; color: var(--text-primary); }
.alert-warning { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 6px; font-size: 13px; color: #854d0e; margin: 8px 0; }
.radio-group { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
.radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.radio-input { width: 16px; height: 16px; cursor: pointer; accent-color: var(--btn-primary-bg); }
.radio-label { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); }
.info-box-blue { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.5; }
.info-box-blue svg { flex-shrink: 0; width: 18px; height: 18px; margin-top: 1px; color: #1e40af; }
.info-box-yellow { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.5; }
.info-box-yellow svg { flex-shrink: 0; width: 18px; height: 18px; margin-top: 1px; color: #1e40af; }
.prazo-cotizacao { font-family: var(--font-sans); font-size: 13px; color: var(--text-muted); margin: 0; line-height: 1.5; }
.valor-total-row { display: flex; align-items: baseline; gap: 12px; padding-top: 16px; border-top: 1px solid var(--border-color); margin-top: 8px; }
.valor-total-row .field-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); }
.valor-total-value { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
.subsection-title { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 16px 0 12px; }
/* ── Separação visual entre sub-abas na Revisão ── */
.review-subtab-header { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 14px; padding: 8px 12px; background-color: #f8fafc; border-radius: 6px; border-left: 3px solid var(--btn-primary-bg); }
.review-subtab-divider { border: none; border-top: 1px solid var(--border-color); margin: 20px 0; }
.beneficiary-review { padding: 12px; background-color: #fafafa; border-radius: 6px; border: 1px solid var(--border-color); }
.page-footer { display: flex; justify-content: flex-end; padding-top: 24px; }
.btn-primary { font-family: var(--font-sans); font-size: 14px; font-weight: 500; padding: 10px 24px; border-radius: 8px; border: none; cursor: pointer; background-color: var(--btn-primary-bg); color: var(--btn-primary-color); transition: opacity 0.15s; line-height: 1; }
.btn-primary:hover { opacity: 0.85; }
.mt-8 { margin-top: 8px; }
.mt-12 { margin-top: 12px; }
.mt-16 { margin-top: 16px; }
.mb-8 { margin-bottom: 8px; }
.mb-16 { margin-bottom: 16px; }
</style>
