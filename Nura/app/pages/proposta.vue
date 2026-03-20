<template>
  <AppShellNested
    :tabs="tabs"
    :active-tab="activeTab"
    :active-sub-tab="activeSubTab"
    back-to="/estudos-gerados"
    @tab-change="onTabChange"
    @subtab-change="onSubTabChange"
  >
    <!-- ABA 0 - DETALHAMENTO DA PROPOSTA -->
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

        <div class="section-card">
          <h3 class="section-card__title">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Dados do Proponente
          </h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">123.456.789-00</span></div>
            <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">Taís Oliveira Costa</span></div>
            <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">15/05/1984</span></div>
            <div class="field-item"><span class="field-label">Sexo</span><span class="field-value">Feminino</span></div>
            <div class="field-item"><span class="field-label">País de Nascimento</span><span class="field-value">Brasil</span></div>
            <div class="field-item"><span class="field-label">Nacionalidade</span><span class="field-value">Brasileira</span></div>
            <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">(11) 98765-4321</span></div>
            <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">tais.oliveira@email.com</span></div>
            <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">R$ 18.000,00</span></div>
            <div class="field-item"><span class="field-label">Profissão</span><span class="field-value">Gerente de Marketing</span></div>
            <div class="field-item"><span class="field-label">Origem da Renda</span><span class="field-value">Salário CLT</span></div>
            <div class="field-item"><span class="field-label">Patrimônio</span><span class="field-value">R$ 350.000,00</span></div>
          </div>

          <!-- PPE, US Person e NIF em grid alinhado com as colunas acima -->
          <div class="field-grid field-grid--3" style="margin-top:16px; padding-top:16px; border-top:1px solid var(--border-color);">
            <!-- Coluna 1: PPE -->
            <div class="field-item">
              <span class="field-label">Pessoa Politicamente Exposta?</span>
              <div class="flag-radio-group" style="margin-top:6px;">
                <label class="flag-radio-label"><input type="radio" v-model="proponente.pessoaPolitica" value="sim" class="radio-input" /><span>Sim</span></label>
                <label class="flag-radio-label"><input type="radio" v-model="proponente.pessoaPolitica" value="nao" class="radio-input" /><span>Não</span></label>
              </div>
            </div>
            <!-- Coluna 2: US Person -->
            <div class="field-item">
              <span class="field-label">É US Person?</span>
              <div class="flag-radio-group" style="margin-top:6px;">
                <label class="flag-radio-label"><input type="radio" v-model="proponente.usPerson" value="sim" class="radio-input" /><span>Sim</span></label>
                <label class="flag-radio-label"><input type="radio" v-model="proponente.usPerson" value="nao" class="radio-input" /><span>Não</span></label>
              </div>
            </div>
            <!-- Coluna 3: NIF (condicional) -->
            <div class="field-item" v-if="proponente.usPerson === 'sim'">
              <span class="field-label">NIF</span>
              <input type="text" v-model="proponente.nif" class="form-input" placeholder="Número de Identificação Fiscal" />
            </div>
          </div>

          <div class="proponente-residencial">
            <h4 class="subsection-divider-title">Dados Residenciais</h4>
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">CEP</span><span class="field-value">01310-100</span></div>
              <div class="field-item" style="grid-column: span 2"><span class="field-label">Rua</span><span class="field-value">Av. Paulista</span></div>
              <div class="field-item"><span class="field-label">Número</span><span class="field-value">1000</span></div>
              <div class="field-item"><span class="field-label">Complemento</span><span class="field-value">Apto 42</span></div>
              <div class="field-item"><span class="field-label">Bairro</span><span class="field-value">Bela Vista</span></div>
              <div class="field-item" style="grid-column: 1"><span class="field-label">Município</span><span class="field-value">São Paulo</span></div>
              <div class="field-item" style="grid-column: 2"><span class="field-label">Estado</span><span class="field-value">SP</span></div>
              <div class="field-item" style="grid-column: 3"><span class="field-label">País de Residência</span><span class="field-value">Brasil</span></div>
            </div>
          </div>

          <div class="proponente-complementar">
            <h4 class="subsection-divider-title">Informações Complementares do Proponente</h4>
            <div class="complementar-grid">
              <div class="form-field">
                <label class="flag-question">Foi diagnosticado com câncer nos últimos 5 anos?</label>
                <div class="flag-radio-group" style="margin-top:6px;">
                  <label class="flag-radio-label"><input type="radio" v-model="proponente.cancer" value="sim" class="radio-input" /><span>Sim</span></label>
                  <label class="flag-radio-label"><input type="radio" v-model="proponente.cancer" value="nao" class="radio-input" /><span>Não</span></label>
                </div>
              </div>
              <div class="form-field">
                <label class="flag-question">Ficou internado por mais de 4 dias nos últimos 6 meses?</label>
                <div class="flag-radio-group" style="margin-top:6px;">
                  <label class="flag-radio-label"><input type="radio" v-model="proponente.internacao" value="sim" class="radio-input" /><span>Sim</span></label>
                  <label class="flag-radio-label"><input type="radio" v-model="proponente.internacao" value="nao" class="radio-input" /><span>Não</span></label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Dados do Plano 1</h3>

          <!-- Toggle Tipo de Produto -->
          <div class="field-label" style="margin-bottom:8px;">TIPO DE PRODUTO</div>
          <div class="product-toggle">
            <button class="product-toggle__btn product-toggle__btn--active">Previdência</button>
            <button class="product-toggle__btn">Seguro de Vida</button>
          </div>

          <!-- Idade de aposentadoria -->
          <div class="plan-info-row" style="margin-top:16px;">
            <span class="field-label">IDADE QUE DESEJA SE APOSENTAR</span>
            <div class="field-value" style="font-size:15px;margin-top:4px;">60 anos</div>
          </div>

          <!-- Caixa interna com Contribuição Mensal, Aporte Inicial e Tipo do Plano -->
          <div class="plano-inner-box" style="margin-top:16px;">
            <div class="plano-inner-row">
              <div class="plano-inner-field">
                <span class="field-label">CONTRIBUIÇÃO MENSAL <span class="required-star">*</span></span>
                <div class="plano-inner-value">R$ 1.650,00</div>
              </div>
              <div class="plano-inner-field">
                <span class="field-label">VALOR DO APORTE INICIAL <span class="required-star">*</span></span>
                <div class="plano-inner-value">R$ 10.000,00</div>
              </div>
            </div>
            <div style="margin-top:12px;">
              <span class="field-label">TIPO DO PLANO <span class="required-star">*</span></span>
              <div style="margin-top:6px;"><span class="badge badge--neutral" style="font-size:13px;padding:4px 12px;">PGBL</span></div>
            </div>
            <div style="margin-top:16px;">
              <span class="field-label" style="margin-bottom:8px;display:block;">SELEÇÃO DE FUNDOS</span>
              <!-- Fund card 1 -->
              <div class="fund-card-ref">
                <div class="fund-card-ref__top">
                  <div class="fund-card-ref__left">
                    <div class="fund-card-ref__name">Icatu Vanguarda Privilege Plus FIC FIRF Previdenciário</div>
                    <div class="fund-card-ref__cnpj">51.620.403/0001-74</div>
                    <div class="fund-card-ref__meta">
                      <span>Grau de Risco: <span class="badge badge--neutral">Muito Baixo</span></span>
                      <span>Taxa Máx. Adm.: <span class="badge badge--neutral">0,70% a.a.</span></span>
                      <span>Estratégia: <span class="badge badge--neutral">Renda Fixa Outros</span></span>
                    </div>
                  </div>
                  <div class="fund-card-ref__right">
                    <div class="fund-card-ref__alloc-row">
                      <span class="fund-card-ref__alloc-label">CONTRIBUIÇÃO MENSAL:</span>
                      <span class="fund-card-ref__alloc-text">Valor Atribuído</span>
                      <span class="fund-card-ref__alloc-val">R$ 825,00</span>
                      <span class="fund-card-ref__alloc-text">Percentual Atribuído</span>
                      <span class="fund-card-ref__alloc-pct">50%</span>
                    </div>
                    <div class="fund-card-ref__alloc-row">
                      <span class="fund-card-ref__alloc-label">APORTE INICIAL:</span>
                      <span class="fund-card-ref__alloc-text">Valor Atribuído</span>
                      <span class="fund-card-ref__alloc-val">R$ 5.000,00</span>
                      <span class="fund-card-ref__alloc-text">Percentual Atribuído</span>
                      <span class="fund-card-ref__alloc-pct">50%</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Fund card 2 -->
              <div class="fund-card-ref" style="margin-top:8px;">
                <div class="fund-card-ref__top">
                  <div class="fund-card-ref__left">
                    <div class="fund-card-ref__name">Icatu Vanguarda Absoluto Plus Qualificado FIRF CP Prev</div>
                    <div class="fund-card-ref__cnpj">45.444.101/0001-90 <span class="badge badge--neutral" style="font-size:10px;padding:1px 6px;margin-left:4px;">QUALIFICADO</span></div>
                    <div class="fund-card-ref__meta">
                      <span>Grau de Risco: <span class="badge badge--neutral">Muito Baixo</span></span>
                      <span>Taxa Máx. Adm.: <span class="badge badge--neutral">0,73% a.a.</span></span>
                      <span>Estratégia: <span class="badge badge--neutral">Renda Fixa Crédito Privado</span></span>
                    </div>
                  </div>
                  <div class="fund-card-ref__right">
                    <div class="fund-card-ref__alloc-row">
                      <span class="fund-card-ref__alloc-label">CONTRIBUIÇÃO MENSAL:</span>
                      <span class="fund-card-ref__alloc-text">Valor Atribuído</span>
                      <span class="fund-card-ref__alloc-val">R$ 825,00</span>
                      <span class="fund-card-ref__alloc-text">Percentual Atribuído</span>
                      <span class="fund-card-ref__alloc-pct">50%</span>
                    </div>
                    <div class="fund-card-ref__alloc-row">
                      <span class="fund-card-ref__alloc-label">APORTE INICIAL:</span>
                      <span class="fund-card-ref__alloc-text">Valor Atribuído</span>
                      <span class="fund-card-ref__alloc-val">R$ 5.000,00</span>
                      <span class="fund-card-ref__alloc-text">Percentual Atribuído</span>
                      <span class="fund-card-ref__alloc-pct">50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Dados do Plano 2</h3>

          <!-- Toggle Tipo de Produto -->
          <div class="field-label" style="margin-bottom:8px;">TIPO DE PRODUTO</div>
          <div class="product-toggle">
            <button class="product-toggle__btn">Previdência</button>
            <button class="product-toggle__btn product-toggle__btn--active">Seguro de Vida</button>
          </div>

          <!-- Produto recomendado -->
          <div style="margin-top:16px;">
            <div class="field-label" style="margin-bottom:8px;">PRODUTO RECOMENDADO</div>
            <div class="product-card-ref">
              <div class="product-card-ref__name">Horizonte</div>
              <p class="product-card-ref__desc">O Horizonte é o seguro de vida que oferece a combinação perfeita entre proteção e a possibilidade de formação de reserva, de forma temporária ou durante toda a vida.</p>
            </div>
          </div>

          <!-- Preferência do Proponente -->
          <div class="coverage-card" style="margin-top:16px;">
            <div class="coverage-card__header">PREFERÊNCIA DO PROPONENTE</div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field">
                  <span class="field-label">VIGÊNCIA *</span>
                  <div class="field-value">Vitalícia</div>
                </div>
                <div class="coverage-card__field">
                  <span class="field-label">TEMPO DE CONTRIBUIÇÃO *</span>
                  <div class="field-value">10 anos</div>
                </div>
                <div class="coverage-card__field">
                  <span class="field-label">PROPONENTE</span>
                  <div class="field-value">41 anos · Feminino</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Coberturas -->
          <!-- Morte Natural ou Acidental -->
          <div class="coverage-card" style="margin-top:12px;">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Morte Natural ou Acidental + Adiantamento por Doença Terminal
              <span class="coverage-card__badge-obrig">(Obrigatório)</span>
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><div class="field-value">Vitalícia</div></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><div class="field-value">10 anos</div></div>
                <div class="coverage-card__field">
                  <span class="field-label">CAPITAL SEGURADO *</span>
                  <div class="field-value field-value--highlight">R$ 1.000.000,00</div>
                  <div class="field-hint">Min: R$ 50.000 | Máx: R$ 20.000.000</div>
                </div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><div class="field-value">R$ 170,00</div></div>
              </div>
            </div>
          </div>

          <!-- Morte Natural ou Acidental (Vigência Temporária) -->
          <div class="coverage-card" style="margin-top:8px;">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Morte Natural ou Acidental (Vigência Temporária)
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><div class="field-value">Temporária 20 anos</div></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><div class="field-value">20 anos</div></div>
                <div class="coverage-card__field">
                  <span class="field-label">CAPITAL SEGURADO *</span>
                  <div class="field-value field-value--highlight">R$ 150.000,00</div>
                  <div class="field-hint">Min: R$ 50.000 | Máx: R$ 20.000.000</div>
                </div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><div class="field-value">R$ 21,67</div></div>
              </div>
            </div>
          </div>

          <!-- IEA -->
          <div class="coverage-card" style="margin-top:8px;">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Indenização Especial de Morte por Acidente (IEA)
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><div class="field-value">Vitalícia</div></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><div class="field-value">30 anos</div></div>
                <div class="coverage-card__field">
                  <span class="field-label">CAPITAL SEGURADO *</span>
                  <div class="field-value field-value--highlight">R$ 500.000,00</div>
                  <div class="field-hint">Min: R$ 50.000 | Máx: R$ 10.000.000</div>
                </div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><div class="field-value">R$ 14,00</div></div>
              </div>
            </div>
          </div>

          <!-- IPA -->
          <div class="coverage-card" style="margin-top:8px;">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Invalidez Permanente Parcial ou Total por Acidente (IPA)
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><div class="field-value">Vitalícia</div></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><div class="field-value">25 anos</div></div>
                <div class="coverage-card__field">
                  <span class="field-label">CAPITAL SEGURADO *</span>
                  <div class="field-value field-value--highlight">R$ 500.000,01</div>
                  <div class="field-hint">Min: R$ 50.000 | Máx: R$ 5.750.000</div>
                </div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><div class="field-value">R$ 19,00</div></div>
              </div>
              <div class="coverage-card__extra">
                <div class="coverage-card__field"><span class="field-label">RETIRAR VÍNCULO DE CAPITAL?</span><div class="field-value">Não</div></div>
                <div class="coverage-card__field"><span class="field-label">IPA MAJORADA?</span><div class="field-value">Não</div></div>
              </div>
            </div>
          </div>

          <!-- IED -->
          <div class="coverage-card" style="margin-top:8px;">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Indenização Especial de Invalidez por Doença (IED)
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><div class="field-value">Vitalícia</div></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><div class="field-value">20 anos</div></div>
                <div class="coverage-card__field">
                  <span class="field-label">CAPITAL SEGURADO *</span>
                  <div class="field-value field-value--highlight">R$ 400.000,00</div>
                  <div class="field-hint">Min: R$ 50.000 | Máx: R$ 1.000.000</div>
                </div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><div class="field-value">R$ 59,20</div></div>
              </div>
            </div>
          </div>

          <!-- DG -->
          <div class="coverage-card" style="margin-top:8px;">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Diagnóstico de Doenças Graves (DG)
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><div class="field-value">5 anos</div></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><div class="field-value">5 anos</div></div>
                <div class="coverage-card__field">
                  <span class="field-label">CAPITAL SEGURADO *</span>
                  <div class="field-value field-value--highlight">R$ 50.000,00</div>
                  <div class="field-hint">Min: R$ 50.000 | Máx: R$ 1.000.000</div>
                </div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><div class="field-value">R$ 10,75</div></div>
              </div>
            </div>
          </div>

          <!-- DIH -->
          <div class="coverage-card" style="margin-top:8px;">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Diária de Internação Hospitalar (DIH)
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><div class="field-value">5 anos</div></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><div class="field-value">5 anos</div></div>
                <div class="coverage-card__field">
                  <span class="field-label">CAPITAL SEGURADO (DIÁRIA) *</span>
                  <div class="field-value field-value--highlight">R$ 300,00</div>
                  <div class="field-hint">Min: R$ 100 | Máx: R$ 1.000</div>
                </div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><div class="field-value">R$ 18,00</div></div>
              </div>
              <div class="coverage-card__extra">
                <div class="coverage-card__field"><span class="field-label">DIH COM ADICIONAL DE UTI?</span><div class="field-value">Sim</div></div>
              </div>
            </div>
          </div>

          <!-- DIT -->
          <div class="coverage-card" style="margin-top:8px;">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Diária de Incapacidade Temporária (DIT)
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><div class="field-value">5 anos</div></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><div class="field-value">5 anos</div></div>
                <div class="coverage-card__field">
                  <span class="field-label">CAPITAL SEGURADO (DIÁRIA) *</span>
                  <div class="field-value field-value--highlight">R$ 12.500,00</div>
                  <div class="field-hint">Min: R$ 1.000 | Máx: R$ 30.000.000</div>
                </div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><div class="field-value">R$ 550,00</div></div>
              </div>
              <div class="coverage-card__extra">
                <div class="coverage-card__field"><span class="field-label">FRANQUIA REDUZIDA?</span><div class="field-value">Não</div></div>
                <div class="coverage-card__field"><span class="field-label">EVENTOS COM LER/DORT/LTC?</span><div class="field-value">Não</div></div>
              </div>
            </div>
          </div>

          <!-- SAF -->
          <div class="coverage-card" style="margin-top:8px;">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Serviço de Assistência Funeral (SAF)
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><div class="field-value">Vitalícia</div></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><div class="field-value">Vitalício</div></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO</span><div class="field-value">R$ 12.000,00</div></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><div class="field-value">R$ 1,38</div></div>
              </div>
              <div class="coverage-card__extra">
                <div class="coverage-card__field"><span class="field-label">TIPO DE SAF</span><div class="field-value">Familiar</div></div>
              </div>
            </div>
          </div>

          <!-- Resumo de Contribuição -->
          <div class="coverage-card" style="margin-top:16px;">
            <div class="coverage-card__header">RESUMO DE CONTRIBUIÇÃO</div>
            <div class="coverage-card__body">
              <div class="resumo-contrib">
                <div class="resumo-contrib__card resumo-contrib__card--active">
                  <div class="resumo-contrib__radio">● Contribuição mensal</div>
                  <div class="resumo-contrib__value">R$ 864,00</div>
                  <div class="resumo-contrib__sub">(12 x = R$ 10.368,00)</div>
                </div>
                <div class="resumo-contrib__card">
                  <div class="resumo-contrib__radio">○ Contribuição anual</div>
                  <div class="resumo-contrib__value">R$ 9.953,37</div>
                  <div class="resumo-contrib__sub">(Desconto aplicado de 4%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="page-footer">
          <button class="btn-primary" @click="onTabChange(1)">Continuar</button>
        </div>
      </div>
    </template>

    <!-- ABA 1 - BENEFICIÁRIOS -->
    <template v-if="activeTab === 1">
      <div class="page-content">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </span>
          <h2 class="page-header__title">Beneficiários</h2>
        </div>
        <div class="inner-tabs">
          <button class="inner-tab" :class="{ 'inner-tab--active': activeSubTab === 0 }" @click="onSubTabChange(0)">Previdência</button>
          <button class="inner-tab" :class="{ 'inner-tab--active': activeSubTab === 1 }" @click="onSubTabChange(1)">Seguro de Vida</button>
        </div>

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
                <div class="form-field"><label class="field-label">Nome Completo</label><input v-model="ben.nome" type="text" class="form-input" /></div>
                <div class="form-field"><label class="field-label">Data de Nascimento</label><input v-model="ben.dataNasc" type="date" class="form-input" /></div>
                <div class="form-field"><label class="field-label">Grau de Parentesco</label><select v-model="ben.parentesco" class="form-select"><option value="">Selecione</option><option>Cônjuge</option><option>Filho(a)</option><option>Pai/Mãe</option><option>Irmão/Irmã</option><option>Outro</option></select></div>
                <div class="form-field"><label class="field-label">Percentual (%)</label><input v-model.number="ben.percentual" type="number" class="form-input" placeholder="0" min="0" max="100" /></div>
              </div>
            </div>
            <div v-if="somaPrevPercentual !== 100 && beneficiariosPrev.some(b => b.nome)" class="alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              A soma dos percentuais deve ser igual a 100%. Atualmente: {{ somaPrevPercentual }}%
            </div>
            <button v-if="beneficiariosPrev.length < 20" class="btn-add-beneficiary" @click="addBenPrev">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
              Adicionar Beneficiário
            </button>
            <p class="disclaimer-note">Na ausência de designação de beneficiários, a indenização será paga de acordo com a legislação aplicável.</p>
          </div>
        </template>

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
                <div class="form-field"><label class="field-label">Nome Completo</label><input v-model="ben.nome" type="text" class="form-input" /></div>
                <div class="form-field"><label class="field-label">Data de Nascimento</label><input v-model="ben.dataNasc" type="date" class="form-input" /></div>
                <div class="form-field"><label class="field-label">Grau de Parentesco</label><select v-model="ben.parentesco" class="form-select"><option value="">Selecione</option><option>Cônjuge</option><option>Filho(a)</option><option>Pai/Mãe</option><option>Irmão/Irmã</option><option>Outro</option></select></div>
                <div class="form-field"><label class="field-label">Percentual (%)</label><input v-model.number="ben.percentual" type="number" class="form-input" placeholder="0" min="0" max="100" /></div>
              </div>
            </div>
            <div v-if="somaSeguroPercentual !== 100 && beneficiariosSeguro.some(b => b.nome)" class="alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              A soma dos percentuais deve ser igual a 100%. Atualmente: {{ somaSeguroPercentual }}%
            </div>
            <button v-if="beneficiariosSeguro.length < 20" class="btn-add-beneficiary" @click="addBenSeguro">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
              Adicionar Beneficiário
            </button>
            <p class="disclaimer-note">Na ausência de designação de beneficiários, a indenização será paga de acordo com a legislação aplicável.</p>
          </div>
        </template>

        <div class="page-footer">
          <button class="btn-primary" @click="onTabChange(2)">Continuar</button>
        </div>
      </div>
    </template>

    <!-- ABA 2 - FORMA DE PAGAMENTO -->
    <template v-if="activeTab === 2">
      <div class="page-content">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
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
            <div class="resp-financeiro-row mb-16">
              <span class="flag-question">Dados do Responsável Financeiro serão os mesmos aos Dados do Proponente?</span>
              <div class="radio-group-inline">
                <label class="radio-item"><input v-model="pagamentoPrev.respFinanceiro" type="radio" value="sim" class="radio-input" /><span class="radio-label">Sim</span></label>
                <label class="radio-item"><input v-model="pagamentoPrev.respFinanceiro" type="radio" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
              </div>
            </div>
            <template v-if="pagamentoPrev.respFinanceiro === 'nao'">
              <div class="section-card mb-16" style="background:#f8fafc;padding:16px;">
                <h4 class="subsection-title" style="margin-top:0">Dados do Responsável Financeiro</h4>
                <div class="field-grid field-grid--3">
                  <div class="form-field"><label class="form-label">CPF</label><input v-model="pagamentoPrev.rfCpf" type="text" class="form-input" placeholder="000.000.000-00" /></div>
                  <div class="form-field"><label class="form-label">Nome Completo</label><input v-model="pagamentoPrev.rfNome" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Data de Nascimento</label><input v-model="pagamentoPrev.rfDataNasc" type="date" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Sexo</label><select v-model="pagamentoPrev.rfGenero" class="form-input"><option value="">Selecione...</option><option>Feminino</option><option>Masculino</option></select></div>
                  <div class="form-field"><label class="form-label">País de Nascimento</label><select v-model="pagamentoPrev.rfPaisNascimento" class="form-input"><option value="">Selecione...</option><option v-for="pais in paises" :key="pais">{{ pais }}</option></select></div>
                  <div class="form-field"><label class="form-label">Nacionalidade</label><input v-model="pagamentoPrev.rfNacionalidade" type="text" class="form-input" placeholder="Ex: Brasileira" /></div>
                  <div class="form-field"><label class="form-label">Telefone</label><input v-model="pagamentoPrev.rfTelefone" type="text" class="form-input" placeholder="(00) 00000-0000" /></div>
                  <div class="form-field"><label class="form-label">E-mail</label><input v-model="pagamentoPrev.rfEmail" type="email" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Renda Mensal</label><input v-model="pagamentoPrev.rfRenda" type="text" class="form-input" placeholder="R$ 0,00" /></div>
                  <div class="form-field"><label class="form-label">Profissão</label><input v-model="pagamentoPrev.rfProfissao" type="text" class="form-input" /></div>
                  <template v-if="pagamentoPrev.rfProfissao === 'Outros (Especificar)'">
                    <div class="form-field"><label class="form-label">Especificação da Profissão</label><input v-model="pagamentoPrev.rfProfissaoEspec" type="text" class="form-input" /></div>
                  </template>
                  <div class="form-field"><label class="form-label">Origem da Renda</label><select v-model="pagamentoPrev.rfOrigemRenda" class="form-input"><option value="">Selecione</option><option>Salário CLT</option><option>Salário Estatutário</option><option>Pró-labore</option><option>Atividade Autônoma</option><option>Atividade Empresarial</option><option>Aposentadoria / Pensão</option><option>Aluguel / Renda Passiva</option><option>Investimentos</option><option>Herança / Doação</option><option>Outros</option></select></div>
                  <template v-if="pagamentoPrev.rfOrigemRenda === 'Outros'">
                    <div class="form-field"><label class="form-label">Especificação da Origem de Renda</label><input v-model="pagamentoPrev.rfOrigemRendaEspec" type="text" class="form-input" /></div>
                  </template>
                  <div class="form-field"><label class="form-label">Patrimônio</label><input v-model="pagamentoPrev.rfPatrimonio" type="text" class="form-input" placeholder="R$ 0,00" /></div>
                  <div class="form-field">
                    <label class="form-label">É US Person?</label>
                    <div class="radio-group-h" style="margin-top:4px;">
                      <label class="radio-label-h"><input type="radio" v-model="pagamentoPrev.rfUsPerson" value="sim" class="radio-input" /><span>Sim</span></label>
                      <label class="radio-label-h"><input type="radio" v-model="pagamentoPrev.rfUsPerson" value="nao" class="radio-input" /><span>Não</span></label>
                    </div>
                  </div>
                  <div class="form-field" v-if="pagamentoPrev.rfUsPerson === 'sim'">
                    <label class="form-label">NIF (Número de Identificação Fiscal)</label>
                    <input v-model="pagamentoPrev.rfNif" type="text" class="form-input" placeholder="Digite o NIF" />
                  </div>
                </div>
              </div>
            </template>

            <div class="resp-financeiro-row mb-16">
              <span class="flag-question">O Endereço de Cobrança será o mesmo informado nos Dados do Proponente?</span>
              <div class="radio-group-inline">
                <label class="radio-item"><input v-model="pagamentoPrev.enderecoCobranca" type="radio" value="sim" class="radio-input" /><span class="radio-label">Sim</span></label>
                <label class="radio-item"><input v-model="pagamentoPrev.enderecoCobranca" type="radio" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
              </div>
            </div>
            <template v-if="pagamentoPrev.enderecoCobranca === 'nao'">
              <div class="section-card mb-16" style="background:#f8fafc;padding:16px;">
                <h4 class="subsection-title" style="margin-top:0">Endereço de Cobrança</h4>
                <div class="field-grid field-grid--3">
                  <div class="form-field"><label class="form-label">CEP</label><input v-model="pagamentoPrev.cobCep" type="text" class="form-input" placeholder="00000-000" maxlength="9" @input="onCepInputPrev" /></div>
                  <div class="form-field" style="grid-column: span 2"><label class="form-label">Rua</label><input v-model="pagamentoPrev.cobRua" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Número</label><input v-model="pagamentoPrev.cobNumero" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Complemento</label><input v-model="pagamentoPrev.cobComplemento" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Bairro</label><input v-model="pagamentoPrev.cobBairro" type="text" class="form-input" /></div>
                  <div class="form-field" style="grid-column: 1"><label class="form-label">Município</label><input v-model="pagamentoPrev.cobMunicipio" type="text" class="form-input" /></div>
                  <div class="form-field" style="grid-column: 2"><label class="form-label">Estado</label><select v-model="pagamentoPrev.cobEstado" class="form-input"><option value="">Selecione</option><option v-for="uf in ufs" :key="uf">{{ uf }}</option></select></div>
                  <div class="form-field" style="grid-column: 3"><label class="form-label">País de Residência</label><select v-model="pagamentoPrev.cobPaisResidencia" class="form-input"><option value="">Selecione...</option><option v-for="pais in paises" :key="pais">{{ pais }}</option></select></div>
                </div>
              </div>
            </template>

            <div class="opcoes-divider"></div>
            <h4 class="opcoes-title">Opções Disponíveis</h4>
            <div class="radio-group mb-16">
              <label class="radio-item"><input v-model="pagamentoPrev.forma" type="radio" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
              <label class="radio-item"><input v-model="pagamentoPrev.forma" type="radio" value="pix" class="radio-input" /><span class="radio-label">PIX</span></label>
              <label class="radio-item"><input v-model="pagamentoPrev.forma" type="radio" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
            </div>

            <template v-if="pagamentoPrev.forma === 'debito'">
              <div class="field-grid field-grid--3 mt-16">
                <div class="form-field">
                  <label class="form-label">Banco</label>
                  <div class="autocomplete-wrapper">
                    <input v-model="prevBancoQuery" type="text" class="form-input autocomplete-input" placeholder="Digite o nome ou código do banco..." @input="onPrevBancoInput" @blur="hidePrevBancoDropdownDelayed" @focus="onPrevBancoInput" />
                    <span class="autocomplete-arrow">▼</span>
                    <div v-if="showPrevBancoDropdown && prevBancoResults.length > 0" class="autocomplete-dropdown">
                      <button v-for="b in prevBancoResults" :key="b.codigo" class="autocomplete-item" @mousedown.prevent="selectPrevBanco(b)">{{ b.codigo }} - {{ b.nome }}</button>
                    </div>
                  </div>
                </div>
                <div class="form-field"><label class="form-label">Agência</label><input v-model="pagamentoPrev.agencia" type="text" class="form-input" placeholder="0000-0" /></div>
                <div class="form-field"><label class="form-label">Conta Corrente</label><input v-model="pagamentoPrev.conta" type="text" class="form-input" placeholder="00000000-0" /></div>
                <div class="form-field"><label class="form-label">Dia de Vencimento</label><select v-model="pagamentoPrev.diaVencimento" class="form-input"><option value="">Selecione o dia</option><option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option></select></div>
              </div>
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>O débito será realizado automaticamente no {{ pagamentoPrev.diaVencimento || 'dia selecionado' }} de cada mês. Certifique-se de que há saldo suficiente na conta para evitar problemas no processamento. Caso tenha selecionado a opção de um aporte único e contribuições mensais, o primeiro débito será a soma destes valores e ocorrerá em 7 dias úteis após a conclusão da contratação da proposta.</span>
              </div>
            </template>

            <template v-if="pagamentoPrev.forma === 'pix'">
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Somente a primeira cobrança será realizada via PIX. As demais cobranças serão realizadas em recorrência via {{ pagamentoPrev.pixRecorrencia === 'debito' ? 'Débito em Conta Corrente' : pagamentoPrev.pixRecorrencia === 'boleto' ? 'Boleto Bancário' : '—' }}.<br/>O código da chave PIX será gerado após a conclusão da contratação da proposta. Caso tenha selecionado a opção de um aporte único e contribuições mensais, a primeira cobrança será a soma destes valores.</span>
              </div>
              <div class="mt-16">
                <p class="opcoes-title">Modalidade das Parcelas Seguintes</p>
                <div class="radio-group mb-16">
                  <label class="radio-item"><input type="radio" v-model="pagamentoPrev.pixRecorrencia" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
                  <label class="radio-item"><input type="radio" v-model="pagamentoPrev.pixRecorrencia" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
                </div>
                <template v-if="pagamentoPrev.pixRecorrencia === 'debito'">
                  <div class="field-grid field-grid--3 mt-16">
                    <div class="form-field">
                      <label class="form-label">Banco</label>
                      <div class="autocomplete-wrapper">
                        <input v-model="prevBancoQuery" type="text" class="form-input autocomplete-input" placeholder="Digite o nome ou código do banco..." @input="onPrevBancoInput" @blur="hidePrevBancoDropdownDelayed" @focus="onPrevBancoInput" />
                        <span class="autocomplete-arrow">▼</span>
                        <div v-if="showPrevBancoDropdown && prevBancoResults.length > 0" class="autocomplete-dropdown">
                          <button v-for="b in prevBancoResults" :key="b.codigo" class="autocomplete-item" @mousedown.prevent="selectPrevBanco(b)">{{ b.codigo }} - {{ b.nome }}</button>
                        </div>
                      </div>
                    </div>
                    <div class="form-field"><label class="form-label">Agência</label><input v-model="pagamentoPrev.agencia" type="text" class="form-input" placeholder="0000-0" /></div>
                    <div class="form-field"><label class="form-label">Conta Corrente</label><input v-model="pagamentoPrev.conta" type="text" class="form-input" placeholder="00000000-0" /></div>
                    <div class="form-field"><label class="form-label">Dia de Vencimento</label><select v-model="pagamentoPrev.diaVencimento" class="form-input"><option value="">Selecione o dia</option><option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option></select></div>
                  </div>
                </template>
                <template v-if="pagamentoPrev.pixRecorrencia === 'boleto'">
                  <div class="field-grid field-grid--3 mt-16">
                    <div class="form-field"><label class="form-label">Dia de Vencimento</label><select v-model="pagamentoPrev.diaVencimento" class="form-input"><option value="">Selecione o dia</option><option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option></select></div>
                  </div>
                </template>
              </div>
            </template>

            <template v-if="pagamentoPrev.forma === 'boleto'">
              <div class="field-grid field-grid--3 mt-16">
                <div class="form-field"><label class="form-label">Dia de Vencimento</label><select v-model="pagamentoPrev.diaVencimento" class="form-input"><option value="">Selecione o dia</option><option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option></select></div>
              </div>
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><strong>Atenção:</strong> Após a emissão do certificado, a seguradora enviará o boleto em até 5 dias úteis para o e-mail cadastrado. Fique atento à caixa de Spam. Caso tenha selecionado a opção de um aporte único e contribuições mensais, o primeiro boleto será a soma destes valores. Este será emitido somente após a conclusão da contratação da proposta.</span>
              </div>
            </template>

            <div class="valor-total-row mt-16">
              <span class="field-label">Valor Total</span>
              <span class="valor-total-value">R$ 10.000,00 de Aporte Inicial + R$ 1.650,00/mês de Contribuição Mensal</span>
            </div>
          </div>
        </template>

        <!-- Pagamento Seguro de Vida -->
        <template v-if="activeSubTab === 1">
          <div class="section-card">
            <h3 class="section-card__title">Forma de Pagamento — Seguro de Vida</h3>
            <div class="resp-financeiro-row mb-16">
              <span class="flag-question">Dados do Responsável Financeiro serão os mesmos aos Dados do Proponente?</span>
              <div class="radio-group-inline">
                <label class="radio-item"><input v-model="pagamentoSeguro.respFinanceiro" type="radio" value="sim" class="radio-input" /><span class="radio-label">Sim</span></label>
                <label class="radio-item"><input v-model="pagamentoSeguro.respFinanceiro" type="radio" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
              </div>
            </div>
            <template v-if="pagamentoSeguro.respFinanceiro === 'nao'">
              <div class="section-card mb-16" style="background:#f8fafc;padding:16px;">
                <h4 class="subsection-title" style="margin-top:0">Dados do Responsável Financeiro</h4>
                <div class="field-grid field-grid--3">
                  <div class="form-field"><label class="form-label">CPF</label><input v-model="pagamentoSeguro.rfCpf" type="text" class="form-input" placeholder="000.000.000-00" /></div>
                  <div class="form-field"><label class="form-label">Nome Completo</label><input v-model="pagamentoSeguro.rfNome" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Data de Nascimento</label><input v-model="pagamentoSeguro.rfDataNasc" type="date" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Sexo</label><select v-model="pagamentoSeguro.rfGenero" class="form-input"><option value="">Selecione...</option><option>Feminino</option><option>Masculino</option></select></div>
                  <div class="form-field"><label class="form-label">País de Nascimento</label><select v-model="pagamentoSeguro.rfPaisNascimento" class="form-input"><option value="">Selecione...</option><option v-for="pais in paises" :key="pais">{{ pais }}</option></select></div>
                  <div class="form-field"><label class="form-label">Nacionalidade</label><input v-model="pagamentoSeguro.rfNacionalidade" type="text" class="form-input" placeholder="Ex: Brasileira" /></div>
                  <div class="form-field"><label class="form-label">Telefone</label><input v-model="pagamentoSeguro.rfTelefone" type="text" class="form-input" placeholder="(00) 00000-0000" /></div>
                  <div class="form-field"><label class="form-label">E-mail</label><input v-model="pagamentoSeguro.rfEmail" type="email" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Renda Mensal</label><input v-model="pagamentoSeguro.rfRenda" type="text" class="form-input" placeholder="R$ 0,00" /></div>
                  <div class="form-field"><label class="form-label">Profissão</label><input v-model="pagamentoSeguro.rfProfissao" type="text" class="form-input" /></div>
                  <template v-if="pagamentoSeguro.rfProfissao === 'Outros (Especificar)'">
                    <div class="form-field"><label class="form-label">Especificação da Profissão</label><input v-model="pagamentoSeguro.rfProfissaoEspec" type="text" class="form-input" /></div>
                  </template>
                  <div class="form-field"><label class="form-label">Origem da Renda</label><select v-model="pagamentoSeguro.rfOrigemRenda" class="form-input"><option value="">Selecione</option><option>Salário CLT</option><option>Salário Estatutário</option><option>Pró-labore</option><option>Atividade Autônoma</option><option>Atividade Empresarial</option><option>Aposentadoria / Pensão</option><option>Aluguel / Renda Passiva</option><option>Investimentos</option><option>Herança / Doação</option><option>Outros</option></select></div>
                  <template v-if="pagamentoSeguro.rfOrigemRenda === 'Outros'">
                    <div class="form-field"><label class="form-label">Especificação da Origem de Renda</label><input v-model="pagamentoSeguro.rfOrigemRendaEspec" type="text" class="form-input" /></div>
                  </template>
                  <div class="form-field"><label class="form-label">Patrimônio</label><input v-model="pagamentoSeguro.rfPatrimonio" type="text" class="form-input" placeholder="R$ 0,00" /></div>
                  <div class="form-field">
                    <label class="form-label">É US Person?</label>
                    <div class="radio-group-h" style="margin-top:4px;">
                      <label class="radio-label-h"><input type="radio" v-model="pagamentoSeguro.rfUsPerson" value="sim" class="radio-input" /><span>Sim</span></label>
                      <label class="radio-label-h"><input type="radio" v-model="pagamentoSeguro.rfUsPerson" value="nao" class="radio-input" /><span>Não</span></label>
                    </div>
                  </div>
                  <div class="form-field" v-if="pagamentoSeguro.rfUsPerson === 'sim'">
                    <label class="form-label">NIF (Número de Identificação Fiscal)</label>
                    <input v-model="pagamentoSeguro.rfNif" type="text" class="form-input" placeholder="Digite o NIF" />
                  </div>
                </div>
              </div>
            </template>

            <div class="resp-financeiro-row mb-16">
              <span class="flag-question">O Endereço de Cobrança será o mesmo informado nos Dados do Proponente?</span>
              <div class="radio-group-inline">
                <label class="radio-item"><input v-model="pagamentoSeguro.enderecoCobranca" type="radio" value="sim" class="radio-input" /><span class="radio-label">Sim</span></label>
                <label class="radio-item"><input v-model="pagamentoSeguro.enderecoCobranca" type="radio" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
              </div>
            </div>
            <template v-if="pagamentoSeguro.enderecoCobranca === 'nao'">
              <div class="section-card mb-16" style="background:#f8fafc;padding:16px;">
                <h4 class="subsection-title" style="margin-top:0">Endereço de Cobrança</h4>
                <div class="field-grid field-grid--3">
                  <div class="form-field"><label class="form-label">CEP</label><input v-model="pagamentoSeguro.cobCep" type="text" class="form-input" placeholder="00000-000" maxlength="9" @input="onCepInputSeguro" /></div>
                  <div class="form-field" style="grid-column: span 2"><label class="form-label">Rua</label><input v-model="pagamentoSeguro.cobRua" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Número</label><input v-model="pagamentoSeguro.cobNumero" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Complemento</label><input v-model="pagamentoSeguro.cobComplemento" type="text" class="form-input" /></div>
                  <div class="form-field"><label class="form-label">Bairro</label><input v-model="pagamentoSeguro.cobBairro" type="text" class="form-input" /></div>
                  <div class="form-field" style="grid-column: 1"><label class="form-label">Município</label><input v-model="pagamentoSeguro.cobMunicipio" type="text" class="form-input" /></div>
                  <div class="form-field" style="grid-column: 2"><label class="form-label">Estado</label><select v-model="pagamentoSeguro.cobEstado" class="form-input"><option value="">Selecione</option><option v-for="uf in ufs" :key="uf">{{ uf }}</option></select></div>
                  <div class="form-field" style="grid-column: 3"><label class="form-label">País de Residência</label><select v-model="pagamentoSeguro.cobPaisResidencia" class="form-input"><option value="">Selecione...</option><option v-for="pais in paises" :key="pais">{{ pais }}</option></select></div>
                </div>
              </div>
            </template>

            <div class="opcoes-divider"></div>
            <h4 class="opcoes-title">Opções Disponíveis</h4>
            <div class="radio-group mb-16">
              <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
              <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="pix" class="radio-input" /><span class="radio-label">PIX</span></label>
              <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
              <label class="radio-item"><input v-model="pagamentoSeguro.forma" type="radio" value="cartao" class="radio-input" /><span class="radio-label">Cartão de Crédito</span></label>
            </div>

            <template v-if="pagamentoSeguro.forma === 'debito'">
              <div class="field-grid field-grid--3 mt-16">
                <div class="form-field">
                  <label class="form-label">Banco</label>
                  <div class="autocomplete-wrapper">
                    <input v-model="seguroBancoQuery" type="text" class="form-input autocomplete-input" placeholder="Digite o nome ou código do banco..." @input="onSeguroBancoInput" @blur="hideSeguroBancoDropdownDelayed" @focus="onSeguroBancoInput" />
                    <span class="autocomplete-arrow">▼</span>
                    <div v-if="showSeguroBancoDropdown && seguroBancoResults.length > 0" class="autocomplete-dropdown">
                      <button v-for="b in seguroBancoResults" :key="b.codigo" class="autocomplete-item" @mousedown.prevent="selectSeguroBanco(b)">{{ b.codigo }} - {{ b.nome }}</button>
                    </div>
                  </div>
                </div>
                <div class="form-field"><label class="form-label">Agência</label><input v-model="pagamentoSeguro.agencia" type="text" class="form-input" placeholder="0000-0" /></div>
                <div class="form-field"><label class="form-label">Conta Corrente</label><input v-model="pagamentoSeguro.conta" type="text" class="form-input" placeholder="00000000-0" /></div>
                <div class="form-field"><label class="form-label">Dia de Vencimento</label><select v-model="pagamentoSeguro.diaVencimento" class="form-input"><option value="">Selecione o dia</option><option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option></select></div>
              </div>
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>O débito será realizado automaticamente no {{ pagamentoSeguro.diaVencimento || 'dia selecionado' }} de cada mês. Certifique-se de que há saldo suficiente na conta para evitar problemas no processamento.</span>
              </div>
            </template>

            <template v-if="pagamentoSeguro.forma === 'pix'">
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Somente a primeira cobrança será realizada via PIX. As demais cobranças serão realizadas em recorrência via {{ pagamentoSeguro.pixRecorrencia === 'debito' ? 'Débito em Conta Corrente' : pagamentoSeguro.pixRecorrencia === 'boleto' ? 'Boleto Bancário' : '—' }}.<br/>O código da chave PIX será gerado após a conclusão da contratação da proposta.</span>
              </div>
              <div class="mt-16">
                <p class="opcoes-title">Modalidade das Parcelas Seguintes</p>
                <div class="radio-group mb-16">
                  <label class="radio-item"><input type="radio" v-model="pagamentoSeguro.pixRecorrencia" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
                  <label class="radio-item"><input type="radio" v-model="pagamentoSeguro.pixRecorrencia" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
                </div>
                <template v-if="pagamentoSeguro.pixRecorrencia === 'debito'">
                  <div class="field-grid field-grid--3 mt-16">
                    <div class="form-field">
                      <label class="form-label">Banco</label>
                      <div class="autocomplete-wrapper">
                        <input v-model="seguroBancoQuery" type="text" class="form-input autocomplete-input" placeholder="Digite o nome ou código do banco..." @input="onSeguroBancoInput" @blur="hideSeguroBancoDropdownDelayed" @focus="onSeguroBancoInput" />
                        <span class="autocomplete-arrow">▼</span>
                        <div v-if="showSeguroBancoDropdown && seguroBancoResults.length > 0" class="autocomplete-dropdown">
                          <button v-for="b in seguroBancoResults" :key="b.codigo" class="autocomplete-item" @mousedown.prevent="selectSeguroBanco(b)">{{ b.codigo }} - {{ b.nome }}</button>
                        </div>
                      </div>
                    </div>
                    <div class="form-field"><label class="form-label">Agência</label><input v-model="pagamentoSeguro.agencia" type="text" class="form-input" placeholder="0000-0" /></div>
                    <div class="form-field"><label class="form-label">Conta Corrente</label><input v-model="pagamentoSeguro.conta" type="text" class="form-input" placeholder="00000000-0" /></div>
                    <div class="form-field"><label class="form-label">Dia de Vencimento</label><select v-model="pagamentoSeguro.diaVencimento" class="form-input"><option value="">Selecione o dia</option><option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option></select></div>
                  </div>
                </template>
                <template v-if="pagamentoSeguro.pixRecorrencia === 'boleto'">
                  <div class="field-grid field-grid--3 mt-16">
                    <div class="form-field"><label class="form-label">Dia de Vencimento</label><select v-model="pagamentoSeguro.diaVencimento" class="form-input"><option value="">Selecione o dia</option><option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option></select></div>
                  </div>
                </template>
              </div>
            </template>

            <template v-if="pagamentoSeguro.forma === 'boleto'">
              <div class="field-grid field-grid--3 mt-16">
                <div class="form-field"><label class="form-label">Dia de Vencimento</label><select v-model="pagamentoSeguro.diaVencimento" class="form-input"><option value="">Selecione o dia</option><option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option></select></div>
              </div>
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><strong>Atenção:</strong> Após a emissão do certificado, a seguradora enviará o boleto em até 5 dias úteis para o e-mail cadastrado. Fique atento à caixa de Spam.</span>
              </div>
            </template>

            <template v-if="pagamentoSeguro.forma === 'cartao'">
              <div class="info-box-blue mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>O pagamento via cartão de crédito será processado em ambiente seguro.<br/>Será realizada apenas uma <strong>reserva do valor</strong> junto à operadora e ao banco do cartão de crédito.<br/>A cobrança só será finalizada após a conclusão do processo de contratação da proposta.</span>
              </div>
              <div class="mt-16">
                <a href="https://pagamento.nura.com.br" target="_blank" class="btn-pagamento-externo">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;flex-shrink:0"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  Inserir dados do Cartão de Crédito
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;flex-shrink:0;margin-left:auto"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </template>

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

    <!-- ABA 3 - REVISÃO DA PROPOSTA -->
    <template v-if="activeTab === 3">
      <div class="page-content">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </span>
          <h2 class="page-header__title">Revisão da Proposta</h2>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Dados do Proponente</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">123.456.789-00</span></div>
            <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">Taís Oliveira Costa</span></div>
            <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">15/05/1984</span></div>
            <div class="field-item"><span class="field-label">Sexo</span><span class="field-value">Feminino</span></div>
            <div class="field-item"><span class="field-label">País de Nascimento</span><span class="field-value">Brasil</span></div>
            <div class="field-item"><span class="field-label">Nacionalidade</span><span class="field-value">Brasileira</span></div>
            <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">(11) 98765-4321</span></div>
            <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">tais.oliveira@email.com</span></div>
            <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">R$ 18.000,00</span></div>
            <div class="field-item"><span class="field-label">Profissão</span><span class="field-value">Gerente de Marketing</span></div>
            <div class="field-item"><span class="field-label">Origem da Renda</span><span class="field-value">Salário CLT</span></div>
            <div class="field-item"><span class="field-label">Patrimônio</span><span class="field-value">R$ 350.000,00</span></div>
          </div>
          <!-- PPE, US Person e NIF -->
          <div class="field-grid field-grid--3" style="margin-top:16px; padding-top:16px; border-top:1px solid var(--border-color);">
            <div class="field-item"><span class="field-label">Pessoa Politicamente Exposta?</span><span class="field-value">{{ proponente.pessoaPolitica === 'sim' ? 'Sim' : 'Não' }}</span></div>
            <div class="field-item"><span class="field-label">É US Person?</span><span class="field-value">{{ proponente.usPerson === 'sim' ? 'Sim' : 'Não' }}</span></div>
            <div class="field-item" v-if="proponente.usPerson === 'sim'"><span class="field-label">NIF</span><span class="field-value">{{ proponente.nif || '—' }}</span></div>
          </div>
          <!-- Informações Complementares -->
          <div class="field-grid field-grid--3" style="margin-top:16px; padding-top:16px; border-top:1px solid var(--border-color);">
            <div class="field-item"><span class="field-label">Câncer nos últimos 5 anos?</span><span class="field-value">{{ proponente.cancer === 'sim' ? 'Sim' : 'Não' }}</span></div>
            <div class="field-item"><span class="field-label">Internação nos últimos 6 meses?</span><span class="field-value">{{ proponente.internacao === 'sim' ? 'Sim' : 'Não' }}</span></div>
          </div>
          <div class="proponente-residencial">
            <h4 class="subsection-divider-title">Dados Residenciais</h4>
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">CEP</span><span class="field-value">01310-100</span></div>
              <div class="field-item" style="grid-column: span 2"><span class="field-label">Rua</span><span class="field-value">Av. Paulista, 1000 — Apto 42</span></div>
              <div class="field-item"><span class="field-label">Bairro</span><span class="field-value">Bela Vista</span></div>
              <div class="field-item" style="grid-column: 1"><span class="field-label">Município / Estado</span><span class="field-value">São Paulo / SP</span></div>
              <div class="field-item" style="grid-column: 2"><span class="field-label">País de Residência</span><span class="field-value">Brasil</span></div>
            </div>
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Resumo do Plano</h3>
          <div class="review-subtab-header">Previdência</div>
          <div class="field-grid field-grid--3 mb-16">
            <div class="field-item"><span class="field-label">Tipo de Investimento</span><span class="field-value">Previdência</span></div>
            <div class="field-item"><span class="field-label">Idade que Deseja se Aposentar</span><span class="field-value">60 anos</span></div>
            <div class="field-item"><span class="field-label">Tipo de Plano</span><span class="field-value"><span class="badge badge--neutral">PGBL</span></span></div>
            <div class="field-item"><span class="field-label">Contribuição Mensal</span><span class="field-value">R$ 1.650,00</span></div>
            <div class="field-item"><span class="field-label">Valor do Aporte Inicial</span><span class="field-value">R$ 10.000,00</span></div>
          </div>
          <!-- Fund card no layout das referências -->
          <div class="fund-card-ref mb-16">
            <div class="fund-card-ref__top">
              <div class="fund-card-ref__left">
                <div class="fund-card-ref__name">Absolute Atenas Icatu Prev FIC FIRF CP</div>
                <div class="fund-card-ref__cnpj">47.612.701/0001-45</div>
                <div class="fund-card-ref__meta">
                  <span>Grau de Risco: <span class="badge badge--neutral">Muito Baixo</span></span>
                  <span>Taxa Máx. Adm.: <span class="badge badge--neutral">0,98% a.a.</span></span>
                  <span>Estratégia: <span class="badge badge--neutral">Renda Fixa</span></span>
                </div>
              </div>
              <div class="fund-card-ref__right">
                <div class="fund-card-ref__alloc-row">
                  <span class="fund-card-ref__alloc-label">CONTRIBUIÇÃO MENSAL:</span>
                  <span class="fund-card-ref__alloc-text">Valor Atribuído</span>
                  <span class="fund-card-ref__alloc-val">R$ 1.650,00</span>
                  <span class="fund-card-ref__alloc-text">Percentual Atribuído</span>
                  <span class="fund-card-ref__alloc-pct">100%</span>
                </div>
                <div class="fund-card-ref__alloc-row">
                  <span class="fund-card-ref__alloc-label">APORTE INICIAL:</span>
                  <span class="fund-card-ref__alloc-text">Valor Atribuído</span>
                  <span class="fund-card-ref__alloc-val">R$ 10.000,00</span>
                  <span class="fund-card-ref__alloc-text">Percentual Atribuído</span>
                  <span class="fund-card-ref__alloc-pct">100%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="review-subtab-divider"></div>
          <div class="review-subtab-header">Seguro de Vida</div>
          <div class="field-grid field-grid--3 mb-16">
            <div class="field-item"><span class="field-label">Tipo de Investimento</span><span class="field-value">Seguro de Vida</span></div>
            <div class="field-item"><span class="field-label">Produto</span><span class="field-value">Horizonte</span></div>
          </div>
          <!-- Produto Recomendado -->
          <div class="product-card-ref mb-16">
            <div class="product-card-ref__name">Horizonte</div>
            <p class="product-card-ref__desc">O Horizonte é o seguro de vida que oferece a combinação perfeita entre proteção e a possibilidade de formação de reserva, de forma temporária ou durante toda a vida.</p>
          </div>

          <!-- Preferência do Proponente -->
          <div class="plano-inner-box mb-16">
            <div class="field-label" style="margin-bottom:12px;">PREFERÊNCIA DO PROPONENTE</div>
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">VIGÊNCIA</span><span class="field-value">Vitalícia</span></div>
              <div class="field-item"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">10 anos</span></div>
              <div class="field-item"><span class="field-label">PROPONENTE</span><span class="field-value">41 anos · Feminino</span></div>
            </div>
          </div>

          <!-- Coberturas individuais -->
          <div class="coverage-card mb-8">
            <div class="coverage-card__header">
              <span class="coverage-card__check">☑</span>
              Morte Natural ou Acidental + Adiantamento por Doença Terminal
              <span class="coverage-card__badge-obrig">(Obrigatório)</span>
            </div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><span class="field-value">Vitalícia</span></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">10 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO *</span><span class="field-value field-value--highlight">R$ 1.000.000,00</span><span class="field-hint">Min: R$ 50.000 | Máx: R$ 20.000.000</span></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><span class="field-value field-value--highlight">R$ 170,00</span></div>
              </div>
            </div>
          </div>

          <div class="coverage-card mb-8">
            <div class="coverage-card__header"><span class="coverage-card__check">☑</span> Morte Natural ou Acidental (Vigência Temporária)</div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><span class="field-value">Temporária 20 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">20 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO *</span><span class="field-value field-value--highlight">R$ 150.000,00</span><span class="field-hint">Min: R$ 50.000 | Máx: R$ 20.000.000</span></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><span class="field-value field-value--highlight">R$ 21,67</span></div>
              </div>
            </div>
          </div>

          <div class="coverage-card mb-8">
            <div class="coverage-card__header"><span class="coverage-card__check">☑</span> Indenização Especial de Morte por Acidente (IEA)</div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><span class="field-value">Vitalícia</span></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">30 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO *</span><span class="field-value field-value--highlight">R$ 500.000,00</span><span class="field-hint">Min: R$ 50.000 | Máx: R$ 10.000.000</span></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><span class="field-value field-value--highlight">R$ 14,00</span></div>
              </div>
            </div>
          </div>

          <div class="coverage-card mb-8">
            <div class="coverage-card__header"><span class="coverage-card__check">☑</span> Invalidez Permanente Parcial ou Total por Acidente (IPA)</div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><span class="field-value">Vitalícia</span></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">25 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO *</span><span class="field-value field-value--highlight">R$ 500.000,01</span><span class="field-hint">Min: R$ 50.000 | Máx: R$ 5.750.000</span></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><span class="field-value field-value--highlight">R$ 19,00</span></div>
              </div>
              <div class="coverage-card__extra">
                <div class="coverage-card__field"><span class="field-label">RETIRAR VÍNCULO DE CAPITAL?</span><span class="field-value">Não</span></div>
                <div class="coverage-card__field"><span class="field-label">IPA MAJORADA?</span><span class="field-value">Não</span></div>
              </div>
            </div>
          </div>

          <div class="coverage-card mb-8">
            <div class="coverage-card__header"><span class="coverage-card__check">☑</span> Indenização Especial de Invalidez por Doença (IED)</div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><span class="field-value">Vitalícia</span></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">20 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO *</span><span class="field-value field-value--highlight">R$ 400.000,00</span><span class="field-hint">Min: R$ 50.000 | Máx: R$ 1.000.000</span></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><span class="field-value field-value--highlight">R$ 59,20</span></div>
              </div>
            </div>
          </div>

          <div class="coverage-card mb-8">
            <div class="coverage-card__header"><span class="coverage-card__check">☑</span> Diagnóstico de Doenças Graves (DG)</div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><span class="field-value">5 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">5 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO *</span><span class="field-value field-value--highlight">R$ 50.000,00</span><span class="field-hint">Min: R$ 50.000 | Máx: R$ 1.000.000</span></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><span class="field-value field-value--highlight">R$ 10,75</span></div>
              </div>
            </div>
          </div>

          <div class="coverage-card mb-8">
            <div class="coverage-card__header"><span class="coverage-card__check">☑</span> Diária de Internação Hospitalar (DIH)</div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><span class="field-value">5 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">5 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO (DIÁRIA) *</span><span class="field-value field-value--highlight">R$ 300,00</span><span class="field-hint">Min: R$ 100 | Máx: R$ 1.000</span></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><span class="field-value field-value--highlight">R$ 18,00</span></div>
              </div>
              <div class="coverage-card__extra">
                <div class="coverage-card__field"><span class="field-label">DIH COM ADICIONAL DE UTI?</span><span class="field-value">Sim</span></div>
              </div>
            </div>
          </div>

          <div class="coverage-card mb-8">
            <div class="coverage-card__header"><span class="coverage-card__check">☑</span> Diária de Incapacidade Temporária (DIT)</div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><span class="field-value">5 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">5 anos</span></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO (DIÁRIA) *</span><span class="field-value field-value--highlight">R$ 12.500,00</span><span class="field-hint">Min: R$ 1.000 | Máx: R$ 30.000.000</span></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><span class="field-value field-value--highlight">R$ 550,00</span></div>
              </div>
              <div class="coverage-card__extra">
                <div class="coverage-card__field"><span class="field-label">FRANQUIA REDUZIDA?</span><span class="field-value">Não</span></div>
                <div class="coverage-card__field"><span class="field-label">EVENTOS COM LER/DORT/LTC?</span><span class="field-value">Não</span></div>
              </div>
            </div>
          </div>

          <div class="coverage-card mb-16">
            <div class="coverage-card__header"><span class="coverage-card__check">☑</span> Serviço de Assistência Funeral (SAF)</div>
            <div class="coverage-card__body">
              <div class="coverage-card__grid">
                <div class="coverage-card__field"><span class="field-label">VIGÊNCIA</span><span class="field-value">Vitalícia</span></div>
                <div class="coverage-card__field"><span class="field-label">TEMPO DE CONTRIBUIÇÃO</span><span class="field-value">Vitalício</span></div>
                <div class="coverage-card__field"><span class="field-label">CAPITAL SEGURADO</span><span class="field-value field-value--highlight">R$ 12.000,00</span></div>
                <div class="coverage-card__field"><span class="field-label">CONTRIBUIÇÃO</span><span class="field-value field-value--highlight">R$ 1,38</span></div>
              </div>
              <div class="coverage-card__extra">
                <div class="coverage-card__field"><span class="field-label">TIPO DE SAF</span><span class="field-value">Familiar</span></div>
              </div>
            </div>
          </div>

          <!-- Resumo de Contribuição -->
          <div class="plano-inner-box">
            <div class="field-label" style="margin-bottom:12px;">RESUMO DE CONTRIBUIÇÃO</div>
            <div class="resumo-contrib">
              <div class="resumo-contrib__card resumo-contrib__card--active">
                <div class="resumo-contrib__radio">● Contribuição mensal</div>
                <div class="resumo-contrib__value">R$ 864,00</div>
                <div class="resumo-contrib__sub">(12 x = R$ 10.368,00)</div>
              </div>
              <div class="resumo-contrib__card">
                <div class="resumo-contrib__radio">○ Contribuição anual</div>
                <div class="resumo-contrib__value">R$ 9.953,37</div>
                <div class="resumo-contrib__sub">(Desconto aplicado de 4%)</div>
              </div>
            </div>
          </div>

          <!-- Soluções Propostas (textos do aliaplan) -->
          <div class="plano-inner-box" style="margin-top:16px;">
            <div class="field-label" style="margin-bottom:14px;">SOLUÇÕES PROPOSTAS</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div>
                <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:8px;">Seguro de Vida</div>
                <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">Este produto garante:</div>
                <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--text-primary);line-height:1.7;">
                  <li>Tranquilidade para o futuro</li>
                  <li>Proteção do patrimônio</li>
                  <li>Segurança para enfrentar imprevistos</li>
                </ul>
              </div>
              <div>
                <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:8px;">Previdência Privada</div>
                <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">Este produto garante:</div>
                <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--text-primary);line-height:1.7;">
                  <li>Aposentadoria com renda previsível</li>
                  <li>Confiança no planejamento sucessório</li>
                </ul>
              </div>
            </div>
            <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border-color);font-size:13px;color:var(--text-primary);line-height:1.6;">
              Com <strong>Benefício Fiscal</strong> relevante <strong>no plano PGBL</strong>. As contribuições podem ser abatidas da base de cálculo do Imposto de Renda, com possibilidade de <strong>dedução de até 12%</strong>.
            </div>
            <div style="margin-top:8px;font-size:13px;color:var(--text-primary);line-height:1.6;">
              E <strong>nos planos PGBL e VGBL</strong> a tributação é realizada apenas no momento do resgate ou da concessão de renda.
            </div>
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Beneficiários</h3>
          <div class="review-subtab-header">Previdência</div>
          <div v-for="(ben, i) in beneficiariosPrev" :key="`prev-${i}`" class="beneficiary-review mb-8">
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">Nome</span><span class="field-value">{{ ben.nome || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ ben.dataNasc || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Grau de Parentesco</span><span class="field-value">{{ ben.parentesco || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Percentual</span><span class="field-value">{{ ben.percentual || 0 }}%</span></div>
            </div>
          </div>
          <div class="review-subtab-divider"></div>
          <div class="review-subtab-header">Seguro de Vida</div>
          <div v-for="(ben, i) in beneficiariosSeguro" :key="`seg-${i}`" class="beneficiary-review mb-8">
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">Nome</span><span class="field-value">{{ ben.nome || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ ben.dataNasc || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Grau de Parentesco</span><span class="field-value">{{ ben.parentesco || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Percentual</span><span class="field-value">{{ ben.percentual || 0 }}%</span></div>
            </div>
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-card__title">Forma de Pagamento</h3>
          <div class="review-subtab-header">Previdência</div>
          <div class="field-grid field-grid--3 mb-16">
            <div class="field-item"><span class="field-label">Forma</span><span class="field-value">{{ formaLabel(pagamentoPrev.forma) }}</span></div>
            <template v-if="pagamentoPrev.forma === 'debito' || pagamentoPrev.forma === 'boleto'">
              <div class="field-item"><span class="field-label">Dia de Vencimento</span><span class="field-value">{{ pagamentoPrev.diaVencimento || '—' }}</span></div>
            </template>
            <template v-if="pagamentoPrev.forma === 'debito'">
              <div class="field-item"><span class="field-label">Banco</span><span class="field-value">{{ pagamentoPrev.banco || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Agência</span><span class="field-value">{{ pagamentoPrev.agencia || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Conta Corrente</span><span class="field-value">{{ pagamentoPrev.conta || '—' }}</span></div>
            </template>
            <template v-if="pagamentoPrev.forma === 'pix'">
              <div class="field-item"><span class="field-label">Parcelas Seguintes</span><span class="field-value">{{ formaLabel(pagamentoPrev.pixRecorrencia) }}</span></div>
            </template>
            <div class="field-item" style="grid-column:1/-1"><span class="field-label">Valor Total</span><span class="valor-total-value">R$ 10.000,00 de Aporte Inicial + R$ 1.650,00/mês de Contribuição Mensal</span></div>
            <div class="field-item"><span class="field-label">Responsável Financeiro</span><span class="field-value">{{ pagamentoPrev.respFinanceiro === 'sim' ? 'Mesmo que o Proponente' : pagamentoPrev.rfNome || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Endereço de Cobrança</span><span class="field-value">{{ pagamentoPrev.enderecoCobranca === 'nao' ? (pagamentoPrev.cobRua + ', ' + pagamentoPrev.cobNumero + ' — ' + pagamentoPrev.cobMunicipio + '/' + pagamentoPrev.cobEstado) : 'Mesmo que o Proponente' }}</span></div>
          </div>
          <div class="review-subtab-divider"></div>
          <div class="review-subtab-header">Seguro de Vida</div>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Forma</span><span class="field-value">{{ formaLabel(pagamentoSeguro.forma) }}</span></div>
            <template v-if="pagamentoSeguro.forma === 'debito' || pagamentoSeguro.forma === 'boleto'">
              <div class="field-item"><span class="field-label">Dia de Vencimento</span><span class="field-value">{{ pagamentoSeguro.diaVencimento || '—' }}</span></div>
            </template>
            <template v-if="pagamentoSeguro.forma === 'debito'">
              <div class="field-item"><span class="field-label">Banco</span><span class="field-value">{{ pagamentoSeguro.banco || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Agência</span><span class="field-value">{{ pagamentoSeguro.agencia || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Conta Corrente</span><span class="field-value">{{ pagamentoSeguro.conta || '—' }}</span></div>
            </template>
            <template v-if="pagamentoSeguro.forma === 'pix'">
              <div class="field-item"><span class="field-label">Parcelas Seguintes</span><span class="field-value">{{ formaLabel(pagamentoSeguro.pixRecorrencia) }}</span></div>
            </template>
            <template v-if="pagamentoSeguro.forma === 'cartao'">
              <div class="field-item"><span class="field-label">Observação</span><span class="field-value">Dados do cartão inseridos em ambiente seguro externo</span></div>
            </template>
            <div class="field-item" style="grid-column:1/-1"><span class="field-label">Valor Total</span><span class="valor-total-value">R$ 2.500,00/mês</span></div>
            <div class="field-item"><span class="field-label">Responsável Financeiro</span><span class="field-value">{{ pagamentoSeguro.respFinanceiro === 'sim' ? 'Mesmo que o Proponente' : pagamentoSeguro.rfNome || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Endereço de Cobrança</span><span class="field-value">{{ pagamentoSeguro.enderecoCobranca === 'nao' ? (pagamentoSeguro.cobRua + ', ' + pagamentoSeguro.cobNumero + ' — ' + pagamentoSeguro.cobMunicipio + '/' + pagamentoSeguro.cobEstado) : 'Mesmo que o Proponente' }}</span></div>
          </div>
        </div>

        <div class="page-footer">
          <button class="btn-primary" @click="navigateTo('/propostas-geradas')">Finalizar Proposta</button>
        </div>
      </div>
    </template>
  </AppShellNested>
</template>

<script setup lang="ts">
interface Beneficiary {
  nome: string; dataNasc: string; parentesco: string; percentual: number
}
interface PagamentoData {
  forma: string; banco: string; agencia: string; conta: string; titular: string; cpfTitular: string; diaVencimento: string
  pixRecorrencia?: string
  respFinanceiro?: string
  rfNome?: string; rfCpf?: string; rfDataNasc?: string; rfTelefone?: string; rfEmail?: string
  rfGenero?: string; rfPaisNascimento?: string; rfNacionalidade?: string; rfRenda?: string; rfProfissao?: string
  rfProfissaoEspec?: string; rfOrigemRenda?: string; rfOrigemRendaEspec?: string
  rfPatrimonio?: string; rfUsPerson?: string; rfNif?: string
  enderecoCobranca?: string
  cobCep?: string; cobRua?: string; cobNumero?: string; cobComplemento?: string
  cobBairro?: string; cobMunicipio?: string; cobEstado?: string; cobPaisResidencia?: string
}

const proponente = reactive({
  pessoaPolitica: 'nao',
  usPerson: 'nao',
  cancer: 'nao',
  internacao: 'nao',
})

const ufs = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']

const paises = [
  'Afeganistão','África do Sul','Albânia','Alemanha','Andorra','Angola','Antígua e Barbuda','Arábia Saudita',
  'Argélia','Argentina','Armênia','Austrália','Áustria','Azerbaijão','Bahamas','Bahrein','Bangladesh',
  'Barbados','Bélgica','Belize','Benin','Bielorrússia','Bolívia','Bósnia e Herzegovina','Botswana',
  'Brasil','Brunei','Bulgária','Burkina Faso','Burundi','Butão','Cabo Verde','Camarões','Camboja',
  'Canadá','Catar','Cazaquistão','Chade','Chile','China','Chipre','Colômbia','Comores','Congo',
  'Coreia do Norte','Coreia do Sul','Costa do Marfim','Costa Rica','Croácia','Cuba','Dinamarca',
  'Djibuti','Dominica','Egito','El Salvador','Emirados Árabes Unidos','Equador','Eritreia','Eslováquia',
  'Eslovênia','Espanha','Estados Unidos','Estônia','Etiópia','Fiji','Filipinas','Finlândia','França',
  'Gabão','Gâmbia','Gana','Geórgia','Granada','Grécia','Guatemala','Guiana','Guiné','Guiné-Bissau',
  'Guiné Equatorial','Haiti','Honduras','Hungria','Iêmen','Ilhas Marshall','Ilhas Salomão','Índia',
  'Indonésia','Irã','Iraque','Irlanda','Islândia','Israel','Itália','Jamaica','Japão','Jordânia',
  'Kiribati','Kosovo','Kuwait','Laos','Lesoto','Letônia','Líbano','Libéria','Líbia','Liechtenstein',
  'Lituânia','Luxemburgo','Macedônia do Norte','Madagascar','Malásia','Malawi','Maldivas','Mali',
  'Malta','Marrocos','Maurício','Mauritânia','México','Micronésia','Moçambique','Moldávia','Mônaco',
  'Mongólia','Montenegro','Myanmar','Namíbia','Nauru','Nepal','Nicarágua','Níger','Nigéria','Noruega',
  'Nova Zelândia','Omã','Países Baixos','Palau','Palestina','Panamá','Papua Nova Guiné','Paquistão',
  'Paraguai','Peru','Polônia','Portugal','Quênia','Quirguistão','Reino Unido','República Centro-Africana',
  'República Checa','República Democrática do Congo','República Dominicana','Romênia','Ruanda','Rússia',
  'Samoa','San Marino','Santa Lúcia','São Cristóvão e Nevis','São Tomé e Príncipe',
  'São Vicente e Granadinas','Senegal','Serra Leoa','Sérvia','Seychelles','Singapura','Síria','Somália',
  'Sri Lanka','Suazilândia','Sudão','Sudão do Sul','Suécia','Suíça','Suriname','Tailândia','Taiwan',
  'Tajiquistão','Tanzânia','Timor-Leste','Togo','Tonga','Trinidad e Tobago','Tunísia','Turcomenistão',
  'Turquia','Tuvalu','Ucrânia','Uganda','Uruguai','Uzbequistão','Vanuatu','Vaticano','Venezuela',
  'Vietnã','Zâmbia','Zimbábue'
]

async function onCepInputPrev() {
  const raw = pagamentoPrev.cobCep?.replace(/\D/g, '') || ''
  if (raw.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
      const data = await res.json()
      if (!data.erro) {
        pagamentoPrev.cobRua = data.logradouro || ''
        pagamentoPrev.cobBairro = data.bairro || ''
        pagamentoPrev.cobMunicipio = data.localidade || ''
        pagamentoPrev.cobEstado = data.uf || ''
      }
    } catch {}
  }
}

async function onCepInputSeguro() {
  const raw = pagamentoSeguro.cobCep?.replace(/\D/g, '') || ''
  if (raw.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
      const data = await res.json()
      if (!data.erro) {
        pagamentoSeguro.cobRua = data.logradouro || ''
        pagamentoSeguro.cobBairro = data.bairro || ''
        pagamentoSeguro.cobMunicipio = data.localidade || ''
        pagamentoSeguro.cobEstado = data.uf || ''
      }
    } catch {}
  }
}

const tabs = [
  { label: 'Detalhamento da Proposta' },
  { label: 'Beneficiários', subTabs: ['Previdência', 'Seguro de Vida'] },
  { label: 'Forma de Pagamento', subTabs: ['Previdência', 'Seguro de Vida'] },
  { label: 'Revisão da Proposta' },
]

const activeTab = ref(0)
const activeSubTab = ref(0)

const newBen = (): Beneficiary => ({ nome: '', dataNasc: '', parentesco: '', percentual: 0 })
const beneficiariosPrev = ref<Beneficiary[]>([newBen()])
const beneficiariosSeguro = ref<Beneficiary[]>([newBen()])

const somaPrevPercentual = computed(() => beneficiariosPrev.value.reduce((s, b) => s + (b.percentual || 0), 0))
const somaSeguroPercentual = computed(() => beneficiariosSeguro.value.reduce((s, b) => s + (b.percentual || 0), 0))

function addBenPrev() { if (beneficiariosPrev.value.length < 20) beneficiariosPrev.value.push(newBen()) }
function removeBenPrev(i: number) { beneficiariosPrev.value.splice(i, 1) }
function addBenSeguro() { if (beneficiariosSeguro.value.length < 20) beneficiariosSeguro.value.push(newBen()) }
function removeBenSeguro(i: number) { beneficiariosSeguro.value.splice(i, 1) }

const newPag = (): PagamentoData => ({
  forma: 'debito', banco: '', agencia: '', conta: '', titular: '', cpfTitular: '', diaVencimento: '',
  pixRecorrencia: '', respFinanceiro: 'sim', enderecoCobranca: 'sim',
  cobCep: '', cobRua: '', cobNumero: '', cobComplemento: '', cobBairro: '', cobMunicipio: '', cobEstado: '', cobPaisResidencia: '',
  rfNome: '', rfCpf: '', rfDataNasc: '', rfTelefone: '', rfEmail: '',
  rfGenero: '', rfPaisNascimento: '', rfNacionalidade: '', rfRenda: '', rfProfissao: '',
  rfProfissaoEspec: '', rfOrigemRenda: '', rfOrigemRendaEspec: '',
  rfPatrimonio: '', rfUsPerson: 'nao', rfNif: '',
})
const pagamentoPrev = reactive(newPag())
const pagamentoSeguro = reactive(newPag())

// Banco autocomplete — Previdência
const bancosList = [
  { codigo: '001', nome: 'Banco do Brasil S.A.' },
  { codigo: '033', nome: 'Banco Santander (Brasil) S.A.' },
  { codigo: '041', nome: 'Banco do Estado do Rio Grande do Sul S.A. (Banrisul)' },
  { codigo: '070', nome: 'BRB - Banco de Brasília S.A.' },
  { codigo: '077', nome: 'Banco Inter S.A.' },
  { codigo: '104', nome: 'Caixa Econômica Federal' },
  { codigo: '121', nome: 'Banco Agibank S.A.' },
  { codigo: '136', nome: 'Unicred do Brasil' },
  { codigo: '197', nome: 'Stone Pagamentos S.A.' },
  { codigo: '208', nome: 'Banco BTG Pactual S.A.' },
  { codigo: '212', nome: 'Banco Original S.A.' },
  { codigo: '237', nome: 'Banco Bradesco S.A.' },
  { codigo: '260', nome: 'Nu Pagamentos S.A. (Nubank)' },
  { codigo: '290', nome: 'PagSeguro Internet S.A.' },
  { codigo: '318', nome: 'Banco BMG S.A.' },
  { codigo: '336', nome: 'Banco C6 S.A.' },
  { codigo: '341', nome: 'Itaú Unibanco S.A.' },
  { codigo: '380', nome: 'PicPay Serviços S.A.' },
  { codigo: '389', nome: 'Banco Mercantil do Brasil S.A.' },
  { codigo: '422', nome: 'Banco Safra S.A.' },
  { codigo: '505', nome: 'Banco Credit Suisse (Brasil) S.A.' },
  { codigo: '600', nome: 'Banco Luso Brasileiro S.A.' },
  { codigo: '623', nome: 'Banco Pan S.A.' },
  { codigo: '633', nome: 'Banco Rendimento S.A.' },
  { codigo: '643', nome: 'Banco Pine S.A.' },
  { codigo: '652', nome: 'Itaú Unibanco Holding S.A.' },
  { codigo: '707', nome: 'Banco Daycoval S.A.' },
  { codigo: '735', nome: 'Banco Neon S.A.' },
  { codigo: '739', nome: 'Banco Cetelem S.A.' },
  { codigo: '741', nome: 'Banco Ribeirão Preto S.A.' },
  { codigo: '745', nome: 'Citibank N.A.' },
  { codigo: '748', nome: 'Sicredi' },
  { codigo: '756', nome: 'Sicoob' },
]

const prevBancoQuery = ref('')
const prevBancoResults = ref<{codigo:string;nome:string}[]>([])
const showPrevBancoDropdown = ref(false)
let prevBancoTimer: ReturnType<typeof setTimeout> | null = null

function onPrevBancoInput() {
  const q = prevBancoQuery.value.toLowerCase()
  if (!q) { prevBancoResults.value = bancosList.slice(0, 10); showPrevBancoDropdown.value = true; return }
  prevBancoResults.value = bancosList.filter(b => b.nome.toLowerCase().includes(q) || b.codigo.includes(q)).slice(0, 10)
  showPrevBancoDropdown.value = true
}
function hidePrevBancoDropdownDelayed() {
  prevBancoTimer = setTimeout(() => { showPrevBancoDropdown.value = false }, 200)
}
function selectPrevBanco(b: {codigo:string;nome:string}) {
  pagamentoPrev.banco = b.codigo + ' - ' + b.nome
  prevBancoQuery.value = b.codigo + ' - ' + b.nome
  showPrevBancoDropdown.value = false
}

// Banco autocomplete — Seguro
const seguroBancoQuery = ref('')
const seguroBancoResults = ref<{codigo:string;nome:string}[]>([])
const showSeguroBancoDropdown = ref(false)
let seguroBancoTimer: ReturnType<typeof setTimeout> | null = null

function onSeguroBancoInput() {
  const q = seguroBancoQuery.value.toLowerCase()
  if (!q) { seguroBancoResults.value = bancosList.slice(0, 10); showSeguroBancoDropdown.value = true; return }
  seguroBancoResults.value = bancosList.filter(b => b.nome.toLowerCase().includes(q) || b.codigo.includes(q)).slice(0, 10)
  showSeguroBancoDropdown.value = true
}
function hideSeguroBancoDropdownDelayed() {
  seguroBancoTimer = setTimeout(() => { showSeguroBancoDropdown.value = false }, 200)
}
function selectSeguroBanco(b: {codigo:string;nome:string}) {
  pagamentoSeguro.banco = b.codigo + ' - ' + b.nome
  seguroBancoQuery.value = b.codigo + ' - ' + b.nome
  showSeguroBancoDropdown.value = false
}

function formaLabel(forma: string) {
  const m: Record<string, string> = { debito: 'Débito em Conta Corrente', pix: 'PIX', boleto: 'Boleto Bancário', cartao: 'Cartão de Crédito' }
  return m[forma] || '—'
}

function onTabChange(index: number) {
  activeTab.value = index; activeSubTab.value = 0
}
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
.section-card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 20px 24px; margin-bottom: 16px; box-shadow: rgba(0,0,0,0.04) 0px 1px 3px 0px, rgba(0,0,0,0.03) 0px 1px 2px 0px; }
.section-card__title { display: flex; align-items: center; gap: 8px; font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color); }
/* Grid de campos - estilo aliaplan */
.field-grid { display: grid; gap: 16px 24px; }
.field-grid--2 { grid-template-columns: 1fr 1fr; }
.field-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
.field-item { display: flex; flex-direction: column; gap: 4px; }
/* Labels de exibição (somente leitura) */
.field-label { font-family: var(--font-sans); font-size: 11px; font-weight: 500; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.6px; }
.field-value { font-family: var(--font-sans); font-size: 13px; font-weight: 400; color: rgb(15, 23, 42); }
/* Campos de formulário - idênticos ao aliaplan/portabilidade */
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field--full { grid-column: 1 / -1; }
.form-label { font-family: var(--font-sans); font-size: 11px; font-weight: 500; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.6px; }
.form-label--required::after { content: ' *'; color: #ef4444; }
.form-input { font-family: var(--font-sans); font-size: 13px; color: rgb(15, 23, 42); padding: 4px 8px; border: 1px solid rgb(226, 232, 240); border-radius: 6px; background-color: rgb(248, 250, 252); outline: none; height: 29.5px; box-sizing: border-box; width: 100%; transition: border-color 0.15s; }
.form-input:focus { border-color: var(--btn-primary-bg); }
.form-input--error { border-color: #ef4444 !important; }
.form-select { font-family: var(--font-sans); font-size: 13px; color: rgb(15, 23, 42); padding: 4px 8px; border: 1px solid rgb(226, 232, 240); border-radius: 6px; background-color: rgb(248, 250, 252); outline: none; height: 29.5px; box-sizing: border-box; width: 100%; }
.beneficiary-card { border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
.beneficiary-card__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.beneficiary-card__title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.btn-remove { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 4px; display: flex; align-items: center; transition: color 0.12s, background-color 0.12s; }
.btn-remove:hover { color: #ef4444; background-color: #fef2f2; }
.btn-add-beneficiary { display: flex; align-items: center; gap: 6px; padding: 9px 16px; background: none; border: 1.5px dashed var(--border-color); border-radius: 6px; cursor: pointer; font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--text-muted); transition: border-color 0.12s, color 0.12s; margin-top: 4px; }
.btn-add-beneficiary:hover { border-color: #94a3b8; color: var(--text-primary); }
.disclaimer-note { font-family: var(--font-sans); font-size: 12px; color: var(--text-muted); margin: 10px 0 0; font-style: italic; line-height: 1.5; }
.alert-warning { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 6px; font-size: 13px; color: #854d0e; margin: 8px 0; }
.radio-group { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
.radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.radio-input { width: 14px; height: 14px; cursor: pointer; accent-color: var(--btn-primary-bg); }
.radio-label { font-family: var(--font-sans); font-size: 13px; color: var(--text-primary); }
.radio-group-h { display: flex; flex-direction: row; gap: 16px; flex-wrap: wrap; margin-top: 4px; }
.radio-label-h { display: flex; align-items: center; gap: 6px; font-family: var(--font-sans); font-size: 13px; color: var(--text-primary); cursor: pointer; }
.info-box-blue { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.5; }
.info-box-blue svg { flex-shrink: 0; width: 18px; height: 18px; margin-top: 1px; color: #1e40af; }
.valor-total-row { display: flex; align-items: baseline; gap: 12px; padding-top: 16px; border-top: 1px solid var(--border-color); margin-top: 8px; }
.valor-total-row .field-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); }
.valor-total-value { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
.subsection-title { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 16px 0 12px; }
.review-subtab-header { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 14px; padding: 8px 12px; background-color: #f8fafc; border-radius: 6px; border-left: 3px solid var(--btn-primary-bg); }
.review-subtab-divider { border: none; border-top: 1px solid var(--border-color); margin: 20px 0; }
.beneficiary-review { padding: 12px; background-color: #fafafa; border-radius: 6px; border: 1px solid var(--border-color); }
.page-footer { display: flex; justify-content: flex-end; padding-top: 24px; }
.btn-primary { font-family: var(--font-sans); font-size: 13px; font-weight: 500; padding: 8px 20px; border-radius: 6px; border: none; cursor: pointer; background-color: var(--btn-primary-bg); color: var(--btn-primary-color); transition: opacity 0.15s; line-height: 1.4; height: 36px; }
.btn-primary:hover { opacity: 0.85; }
.mt-8 { margin-top: 8px; }
.mt-12 { margin-top: 12px; }
.mt-16 { margin-top: 16px; }
.mb-8 { margin-bottom: 8px; }
.mb-16 { margin-bottom: 16px; }
.mt-20 { margin-top: 20px; }
.resp-financeiro-row { display: grid; grid-template-columns: 1fr 160px; align-items: center; gap: 20px; }
.radio-group-inline { display: flex; flex-direction: row; gap: 20px; justify-content: flex-start; }
.opcoes-divider { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0 16px; }
.opcoes-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary); margin: 0 0 12px; }
.btn-pagamento-externo { display: inline-flex; align-items: center; gap: 10px; padding: 12px 20px; background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%); border: 1.5px solid #c7d7fd; border-radius: 10px; color: #1e40af; font-size: 14px; font-weight: 500; text-decoration: none; cursor: pointer; transition: all 0.2s; width: 100%; box-sizing: border-box; }
.btn-pagamento-externo:hover { background: linear-gradient(135deg, #e0eaff 0%, #d4e4fd 100%); border-color: #93b4fb; box-shadow: 0 2px 8px rgba(30,64,175,0.12); }
.proponente-flags { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-color); }
.proponente-flag-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.flag-question { font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--text-primary); min-width: 220px; }
.flag-radio-group { display: flex; flex-direction: row; gap: 16px; }
.flag-radio-label { display: flex; align-items: center; gap: 6px; font-family: var(--font-sans); font-size: 13px; color: var(--text-primary); cursor: pointer; }
.proponente-residencial { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-color); }
.proponente-complementar { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-color); }
.complementar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 12px; }
.subsection-divider-title { font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--text-label); margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.5px; }
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
/* Autocomplete */
.autocomplete-wrapper { position: relative; }
.autocomplete-input { padding-right: 32px !important; }
.autocomplete-arrow { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: var(--text-muted); pointer-events: none; }
.autocomplete-dropdown { position: absolute; top: calc(100% + 2px); left: 0; right: 0; background: white; border: 1px solid var(--border-color); border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 100; max-height: 220px; overflow-y: auto; }
.autocomplete-item { display: block; width: 100%; text-align: left; padding: 9px 12px; background: none; border: none; cursor: pointer; font-family: var(--font-sans); font-size: 13px; color: var(--text-primary); transition: background-color 0.1s; }
.autocomplete-item:hover { background-color: #f8fafc; }

/* ── Product Toggle (Previdência / Seguro de Vida) ────────────────────────── */
.product-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}
.product-toggle__btn {
  padding: 12px 16px;
  background: white;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  transition: background-color 0.15s, color 0.15s;
  text-align: center;
}
.product-toggle__btn + .product-toggle__btn {
  border-left: 1px solid var(--border-color);
}
.product-toggle__btn--active {
  background-color: #0f172a;
  color: #ffffff;
}

/* ── Plano Inner Box ─────────────────────────────────────────────────────── */
.plano-inner-box {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background-color: #fafbfc;
}
.plano-inner-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.plano-inner-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.plano-inner-value {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 2px;
}
.required-star { color: #ef4444; }

/* ── Fund Card Ref (layout das referências) ──────────────────────────────── */
.fund-card-ref {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: visible;
}
.fund-card-ref__top {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 14px 16px;
}
.fund-card-ref__left {
  flex: 1;
  min-width: 0;
}
.fund-card-ref__name {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.fund-card-ref__cnpj {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}
.fund-card-ref__meta {
  display: flex;
  gap: 16px;
  flex-wrap: nowrap;
  align-items: center;
  overflow: visible;
  white-space: nowrap;
}
.fund-card-ref__meta span {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}
.fund-card-ref__right {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 320px;
  flex-shrink: 0;
}
.fund-card-ref__alloc-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}
.fund-card-ref__alloc-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  min-width: 140px;
  flex-shrink: 0;
}
.fund-card-ref__alloc-text {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text-muted);
  flex-shrink: 0;
}
.fund-card-ref__alloc-val {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  min-width: 80px;
  text-align: right;
  flex-shrink: 0;
}
.fund-card-ref__alloc-pct {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  background-color: #f1f5f9;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 2px 8px;
  min-width: 44px;
  text-align: center;
  flex-shrink: 0;
}

/* ── Product Card Ref ────────────────────────────────────────────────────── */
.product-card-ref {
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
}
.product-card-ref__name {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}
.product-card-ref__desc {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

/* ── Coverage Card ───────────────────────────────────────────────────────── */
.coverage-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}
.coverage-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  background-color: #fafbfc;
  border-bottom: 1px solid var(--border-color);
}
.coverage-card__check {
  font-size: 16px;
  color: #1e40af;
  flex-shrink: 0;
}
.coverage-card__badge-obrig {
  font-size: 12px;
  font-weight: 500;
  color: #d97706;
  margin-left: 2px;
}
.coverage-card__body {
  padding: 14px 16px;
}
.coverage-card__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.coverage-card__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.coverage-card__extra {
  display: flex;
  gap: 32px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}
.field-value--highlight {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}
.field-hint {
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

/* ── Resumo de Contribuição ─────────────────────────────────────────────── */
.resumo-contrib {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.resumo-contrib__card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px 20px;
  background: white;
}
.resumo-contrib__card--active {
  background-color: #0f172a;
  border-color: #0f172a;
  color: white;
}
.resumo-contrib__radio {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
}
.resumo-contrib__card--active .resumo-contrib__radio {
  color: #cbd5e1;
}
.resumo-contrib__value {
  font-family: var(--font-sans);
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.resumo-contrib__card--active .resumo-contrib__value {
  color: white;
}
.resumo-contrib__sub {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text-muted);
}
.resumo-contrib__card--active .resumo-contrib__sub {
  color: #94a3b8;
}
</style>
