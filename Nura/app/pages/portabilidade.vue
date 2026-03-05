<template>
  <AppShell :tabs="visibleTabs" :active-tab="activeTab" @tab-change="changeTab">
    <div class="page-content">

      <!-- ══ ABA: DETALHES DA PORTABILIDADE ══ -->
      <template v-if="activeTab === tabIndex('Detalhes da Portabilidade')">
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

        <!-- Dados do Proponente -->
        <div class="section-card">
          <h3 class="section-card__title">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Dados do Proponente
          </h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ proponente.cpf || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">{{ proponente.nome || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nome Social</span><span class="field-value">{{ proponente.nomeSocial || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ proponente.dataNasc ? new Date(proponente.dataNasc + 'T12:00:00').toLocaleDateString('pt-BR') : '—' }}</span></div>
            <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">{{ proponente.telefone || '—' }}</span></div>
            <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">{{ proponente.email || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">{{ proponente.renda || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Ocupação</span><span class="field-value">{{ proponente.ocupacao || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Empresa</span><span class="field-value">{{ proponente.empresa || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Origem da Renda</span><span class="field-value">{{ proponente.origemRenda || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Patrimônio</span><span class="field-value">{{ proponente.patrimonio || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nacionalidade</span><span class="field-value">{{ proponente.nacionalidade || '—' }}</span></div>
          </div>

          <!-- Pessoa Politicamente Exposta e US Person -->
          <div class="proponente-flags">
            <div class="proponente-flag-row">
              <span class="form-label" style="font-size:13px;font-weight:500;text-transform:none;letter-spacing:0;color:var(--text-primary);">Pessoa Politicamente Exposta?</span>
              <div class="flag-radio-group">
                <label class="flag-radio-label"><input type="radio" v-model="proponente.pessoaPolitica" value="sim" class="radio-input" /><span>Sim</span></label>
                <label class="flag-radio-label"><input type="radio" v-model="proponente.pessoaPolitica" value="nao" class="radio-input" /><span>Não</span></label>
              </div>
            </div>
            <div class="proponente-flag-row">
              <span class="form-label" style="font-size:13px;font-weight:500;text-transform:none;letter-spacing:0;color:var(--text-primary);">É US Person?</span>
              <div class="flag-radio-group">
                <label class="flag-radio-label"><input type="radio" v-model="proponente.usPerson" value="sim" class="radio-input" /><span>Sim</span></label>
                <label class="flag-radio-label"><input type="radio" v-model="proponente.usPerson" value="nao" class="radio-input" /><span>Não</span></label>
              </div>
            </div>
          </div>

          <!-- Dados Residenciais -->
          <div class="proponente-residencial">
            <h4 class="subsection-divider-title">Dados Residenciais</h4>
            <div class="field-grid field-grid--3">
              <div class="form-field">
                <label class="form-label">CEP</label>
                <input v-model="proponente.cep" type="text" class="form-input" placeholder="00000-000" maxlength="9" @input="onCepInput" />
              </div>
              <div class="form-field" style="grid-column: span 2">
                <label class="form-label">Rua</label>
                <input v-model="proponente.rua" type="text" class="form-input" placeholder="Nome da rua" />
              </div>
              <div class="form-field">
                <label class="form-label">Número</label>
                <input v-model="proponente.numero" type="text" class="form-input" placeholder="123" />
              </div>
              <div class="form-field">
                <label class="form-label">Complemento</label>
                <input v-model="proponente.complemento" type="text" class="form-input" placeholder="Apto, sala, etc." />
              </div>
              <div class="form-field">
                <label class="form-label">Bairro</label>
                <input v-model="proponente.bairro" type="text" class="form-input" placeholder="Bairro" />
              </div>
              <div class="form-field" style="grid-column: span 2">
                <label class="form-label">Município</label>
                <input v-model="proponente.municipio" type="text" class="form-input" placeholder="Cidade" />
              </div>
              <div class="form-field">
                <label class="form-label">Estado</label>
                <select v-model="proponente.estado" class="form-select">
                  <option value="">Selecione</option>
                  <option v-for="uf in ufs" :key="uf">{{ uf }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Dados da Portabilidade (Origem) -->
        <div class="section-card">
          <h3 class="section-card__title">Dados da Portabilidade</h3>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label">Processo SUSEP</label>
              <input v-model="form.susep" type="text" placeholder="Digite o número SUSEP" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Seguradora de Origem</label>
              <div class="autocomplete-wrapper">
                <input v-model="seguradoraQuery" type="text" placeholder="Digite para buscar..." class="form-input" @input="onSeguradoraInput" @blur="hideDropdownDelayed" @focus="onSeguradoraInput" />
                <div v-if="showSeguradoraDropdown && seguradoraResults.length > 0" class="autocomplete-dropdown">
                  <button v-for="s in seguradoraResults" :key="s" class="autocomplete-item" @mousedown.prevent="selectSeguradora(s)">{{ s }}</button>
                </div>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">Número do Certificado ou da Apólice</label>
              <input v-model="form.certificado" type="text" placeholder="Digite o número" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Nome do Plano</label>
              <input v-model="form.nomePlano" type="text" placeholder="Digite o nome do plano" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label-radio">Tipo do Plano</label>
              <div class="radio-group-h">
                <label v-for="tp in ['PGBL','VGBL']" :key="tp" class="radio-label-h">
                  <input type="radio" v-model="form.tipoPlano" :value="tp" class="radio-input" />
                  <span>{{ tp }}</span>
                </label>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label-radio">Regime Tributário</label>
              <div class="radio-group-h">
                <label v-for="r in ['Progressiva','Regressiva']" :key="r" class="radio-label-h">
                  <input type="radio" v-model="form.regime" :value="r" class="radio-input" />
                  <span>{{ r }}</span>
                </label>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">CNPJ do Fundo</label>
              <input v-model="form.cnpjFundo" type="text" placeholder="00.000.000/0000-00" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label-radio">Situação do Regime</label>
              <div class="radio-group-h">
                <label v-for="s in ['Retratável','Irretratável','De acordo com Origem']" :key="s" class="radio-label-h">
                  <input type="radio" v-model="form.situacaoRegime" :value="s" class="radio-input" />
                  <span>{{ s }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Configurações da Transferência -->
        <div class="section-card">
          <h3 class="section-card__title">Configurações da Transferência</h3>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label-radio">Tipo de Transferência</label>
              <div class="radio-group-h">
                <label v-for="t in ['Total','Parcial']" :key="t" class="radio-label-h">
                  <input type="radio" v-model="form.tipoTransferencia" :value="t" class="radio-input" />
                  <span>{{ t }}</span>
                </label>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">Valor da Portabilidade</label>
              <input v-model="form.valorPortabilidade" type="text" placeholder="R$ 0,00" class="form-input" :disabled="form.tipoTransferencia === 'Total'" :class="{ 'form-input--disabled': form.tipoTransferencia === 'Total' }" />
            </div>
          </div>
        </div>

        <!-- Dados do Destino -->
        <div class="section-card">
          <h3 class="section-card__title">Dados do Destino</h3>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label">Processo SUSEP</label>
              <input v-model="destino.susep" type="text" placeholder="Digite o número SUSEP" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Seguradora de Destino</label>
              <div class="autocomplete-wrapper">
                <input v-model="destinoSeguradoraQuery" type="text" placeholder="Digite para buscar..." class="form-input" @input="onDestinoSeguradoraInput" @blur="hideDestinoDropdownDelayed" @focus="onDestinoSeguradoraInput" />
                <div v-if="showDestinoDropdown && destinoSeguradoraResults.length > 0" class="autocomplete-dropdown">
                  <button v-for="s in destinoSeguradoraResults" :key="s" class="autocomplete-item" @mousedown.prevent="selectDestinoSeguradora(s)">{{ s }}</button>
                </div>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">Número do Certificado ou da Apólice</label>
              <input v-model="destino.certificado" type="text" placeholder="Digite o número" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label">Nome do Plano</label>
              <input v-model="destino.nomePlano" type="text" placeholder="Digite o nome do plano" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label-radio">Tipo do Plano</label>
              <div class="radio-group-h">
                <label v-for="tp in ['PGBL','VGBL']" :key="tp" class="radio-label-h">
                  <input type="radio" v-model="destino.tipoPlano" :value="tp" class="radio-input" />
                  <span>{{ tp }}</span>
                </label>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label-radio">Regime Tributário</label>
              <div class="radio-group-h">
                <label v-for="r in ['Progressiva','Regressiva']" :key="r" class="radio-label-h">
                  <input type="radio" v-model="destino.regime" :value="r" class="radio-input" />
                  <span>{{ r }}</span>
                </label>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">CNPJ do Fundo</label>
              <input v-model="destino.cnpjFundo" type="text" placeholder="00.000.000/0000-00" class="form-input" />
            </div>
            <div class="form-field">
              <label class="form-label-radio">Situação do Regime</label>
              <div class="radio-group-h">
                <label v-for="s in ['Retratável','Irretratável','De acordo com Destino']" :key="s" class="radio-label-h">
                  <input type="radio" v-model="destino.situacaoRegime" :value="s" class="radio-input" />
                  <span>{{ s }}</span>
                </label>
              </div>
            </div>
          </div>

        </div>

        <!-- Deseja realizar contratação adicional? -->
        <div class="section-card">
          <h3 class="section-card__title">Contratação Adicional</h3>
          <div class="form-field">
            <label class="form-label-radio">Deseja realizar contratação adicional?</label>
            <div class="radio-group-h">
              <label v-for="op in ['Sim','Não']" :key="op" class="radio-label-h">
                <input type="radio" v-model="form.contratacaoAdicional" :value="op" class="radio-input" />
                <span>{{ op }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="page-footer">
          <button class="btn-primary" @click="advanceFromDetalhes">Continuar</button>
        </div>
      </template>

      <!-- ══ ABA: CONTRATAÇÃO ADICIONAL (condicional) ══ -->
      <template v-if="showContratacaoTab && activeTab === tabIndex('Contratação Adicional')">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
          <h2 class="page-header__title">Contratação Adicional</h2>
        </div>

        <!-- Aviso de obrigatoriedade por divergência -->
        <div v-if="hasDivergencia" class="info-box-blue mb-16">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <div>Esta aba é <strong>obrigatória</strong> devido a divergências entre Origem e Destino. Os campos <strong>Tipo do Plano</strong>, <strong>Regime Tributário</strong> e <strong>Situação do Regime</strong> foram pré-preenchidos com os valores da Origem e não podem ser alterados neste bloco.</div>
        </div>

        <!-- Bloco de Dados Adicionais do Plano (pode ser duplicado) -->
        <div v-for="(bloco, bi) in blocosDadosAdicionais" :key="bi" class="section-card">
          <div class="section-card__title-row">
            <h3 class="section-card__title" style="margin:0; border:none; padding:0">
              {{ bi === 0 ? 'Dados Adicionais do Plano' : `Dados Adicionais do Plano ${bi + 1}` }}
            </h3>
            <button v-if="bi > 0" class="btn-remove-bloco" @click="removeBlocoAdicional(bi)">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              Remover
            </button>
          </div>
          <div class="form-grid mt-16">
            <!-- Tipo do Plano (bloqueado se divergência e primeiro bloco) -->
            <div class="form-field">
              <label class="form-label-radio">Tipo do Plano</label>
              <div class="radio-group-h">
                <label v-for="tp in ['PGBL','VGBL']" :key="tp" class="radio-label-h" :class="{ 'radio-label-h--disabled': hasDivergencia && bi === 0 }">
                  <input type="radio" v-model="bloco.tipoPlano" :value="tp" class="radio-input" :disabled="hasDivergencia && bi === 0" />
                  <span>{{ tp }}</span>
                </label>
              </div>
            </div>
            <!-- Regime de Tributação (bloqueado se divergência e primeiro bloco) -->
            <div class="form-field">
              <label class="form-label-radio">Regime de Tributação</label>
              <div class="radio-group-h">
                <label v-for="r in ['Progressiva','Regressiva']" :key="r" class="radio-label-h" :class="{ 'radio-label-h--disabled': hasDivergencia && bi === 0 }">
                  <input type="radio" v-model="bloco.regime" :value="r" class="radio-input" :disabled="hasDivergencia && bi === 0" />
                  <span>{{ r }}</span>
                </label>
              </div>
            </div>
            <!-- Situação do Regime (bloqueado se divergência e primeiro bloco) -->
            <div class="form-field form-field--full">
              <label class="form-label-radio">Situação do Regime</label>
              <div class="radio-group-h">
                <label v-for="s in ['Retratável','Irretratável','De acordo com Origem']" :key="s" class="radio-label-h" :class="{ 'radio-label-h--disabled': hasDivergencia && bi === 0 }">
                  <input type="radio" v-model="bloco.situacaoRegime" :value="s" class="radio-input" :disabled="hasDivergencia && bi === 0" />
                  <span>{{ s }}</span>
                </label>
              </div>
            </div>

            <!-- Seleção de Fundos -->
            <div class="form-field form-field--full">
              <div class="selecao-fundos-box">
                <div class="selecao-fundos-box__header">SELEÇÃO DE FUNDOS</div>
                <div class="selecao-fundos-box__body">
                  <!-- Botão que abre o pop-up de busca -->
                  <div class="form-field">
                    <label class="form-label">Buscar Fundos Disponíveis</label>
                    <button class="btn-buscar-fundos" @click="abrirPopupFundos(bloco)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      Nome ou CNPJ do Fundo
                    </button>
                    <span class="form-hint">{{ fundosDisponiveis.length }} fundos disponíveis</span>
                  </div>

                  <!-- Fundos Selecionados -->
                  <div v-if="bloco.fundosSelecionados.length > 0" class="fundos-selecionados-list">
                    <label class="form-label" style="margin-bottom: 8px; display: block;">Fundos Selecionados</label>
                    <div v-for="(fs, fi) in bloco.fundosSelecionados" :key="fi" class="fund-card">
                      <div class="fund-card__header">
                        <div>
                          <div class="fund-card__name">{{ fs.nome }}</div>
                          <div class="fund-card__cnpj">{{ fs.cnpj }}</div>
                        </div>
                        <button class="btn-remove-fund" @click="removerFundo(bloco, fi)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <div class="fund-card__body">
                        <div class="fund-card__row">
                          <span class="fund-card__label">CONTRIBUIÇÃO MENSAL:</span>
                          <span class="fund-card__text">Valor Atribuído</span>
                          <input v-model="fs.valorContrib" type="text" class="fund-input" placeholder="R$ 0,00" />
                          <span class="fund-card__text">Percentual Atribuído</span>
                          <input v-model="fs.percContrib" type="text" class="fund-input fund-input--sm" placeholder="0" />
                          <span class="fund-card__text">%</span>
                        </div>
                        <div class="fund-card__row">
                          <span class="fund-card__label">APORTE INICIAL:</span>
                          <span class="fund-card__text">Valor Atribuído</span>
                          <input v-model="fs.valorAporte" type="text" class="fund-input" placeholder="R$ 0,00" />
                          <span class="fund-card__text">Percentual Atribuído</span>
                          <input v-model="fs.percAporte" type="text" class="fund-input fund-input--sm" placeholder="0" />
                          <span class="fund-card__text">%</span>
                        </div>
                        <div class="fund-card__meta">
                          <span>Taxa Máx. Adm.: <strong>{{ fs.taxaAdm }}</strong></span>
                          <span>Rentabilidade: <strong>{{ fs.rentabilidade }}</strong></span>
                          <span>Classificação: <strong>{{ fs.classificacao }}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botão Adicionar Novo Produto -->
        <button class="btn-add-produto" @click="addBlocoAdicional">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
          Adicionar Novo Produto
        </button>

        <!-- Beneficiários -->
        <div class="section-card">
          <h3 class="section-card__title">Beneficiários</h3>
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

        <!-- Forma de Pagamento -->
        <div class="section-card">
          <h3 class="section-card__title">Forma de Pagamento</h3>

          <!-- Responsável Financeiro -->
          <div class="resp-financeiro-row mb-16">
            <span class="field-label" style="flex-shrink:0;">Dados do Responsável Financeiro serão os mesmos aos Dados do Proponente?</span>
            <div class="radio-group-inline">
              <label class="radio-item"><input type="radio" v-model="pagamentoAdicional.respFinanceiro" value="sim" class="radio-input" @change="preencherRespFinanceiro" /><span class="radio-label">Sim</span></label>
              <label class="radio-item"><input type="radio" v-model="pagamentoAdicional.respFinanceiro" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
            </div>
          </div>

          <!-- Campos do Responsável Financeiro (se Não) -->
          <template v-if="pagamentoAdicional.respFinanceiro === 'nao'">
            <div class="form-grid mb-16">
              <div class="form-field"><label class="form-label">Nome Completo</label><input v-model="pagamentoAdicional.rfNome" type="text" class="form-input" /></div>
              <div class="form-field"><label class="form-label">CPF</label><input v-model="pagamentoAdicional.rfCpf" type="text" class="form-input" placeholder="000.000.000-00" /></div>
              <div class="form-field"><label class="form-label">Data de Nascimento</label><input v-model="pagamentoAdicional.rfDataNasc" type="date" class="form-input" /></div>
              <div class="form-field"><label class="form-label">Telefone</label><input v-model="pagamentoAdicional.rfTelefone" type="text" class="form-input" placeholder="(00) 00000-0000" /></div>
              <div class="form-field form-field--full"><label class="form-label">E-mail</label><input v-model="pagamentoAdicional.rfEmail" type="email" class="form-input" /></div>
            </div>
          </template>

          <!-- Endereço de Cobrança — Contratação Adicional (logo após Responsável Financeiro) -->
          <div class="resp-financeiro-row mb-16">
            <span class="field-label" style="flex-shrink:0;">O Endereço de Cobrança será o mesmo informado nos Dados do Proponente?</span>
            <div class="radio-group-inline">
              <label class="radio-item"><input v-model="pagamentoAdicional.enderecoCobranca" type="radio" value="sim" class="radio-input" /><span class="radio-label">Sim</span></label>
              <label class="radio-item"><input v-model="pagamentoAdicional.enderecoCobranca" type="radio" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
            </div>
          </div>
          <template v-if="pagamentoAdicional.enderecoCobranca === 'nao'">
            <div class="section-card mb-16" style="background:#f8fafc;padding:16px;">
              <h4 class="subsection-title" style="margin-top:0">Endereço de Cobrança</h4>
              <div class="field-grid field-grid--3">
                <div class="form-field">
                  <label class="form-label">CEP</label>
                  <input v-model="pagamentoAdicional.cobCep" type="text" class="form-input" placeholder="00000-000" maxlength="9" @input="onCepInputAdicional" />
                </div>
                <div class="form-field" style="grid-column: span 2">
                  <label class="form-label">Rua</label>
                  <input v-model="pagamentoAdicional.cobRua" type="text" class="form-input" placeholder="Nome da rua" />
                </div>
                <div class="form-field">
                  <label class="form-label">Número</label>
                  <input v-model="pagamentoAdicional.cobNumero" type="text" class="form-input" placeholder="123" />
                </div>
                <div class="form-field">
                  <label class="form-label">Complemento</label>
                  <input v-model="pagamentoAdicional.cobComplemento" type="text" class="form-input" placeholder="Apto, sala, etc." />
                </div>
                <div class="form-field">
                  <label class="form-label">Bairro</label>
                  <input v-model="pagamentoAdicional.cobBairro" type="text" class="form-input" placeholder="Bairro" />
                </div>
                <div class="form-field" style="grid-column: span 2">
                  <label class="form-label">Município</label>
                  <input v-model="pagamentoAdicional.cobMunicipio" type="text" class="form-input" placeholder="Cidade" />
                </div>
                <div class="form-field">
                  <label class="form-label">Estado</label>
                  <select v-model="pagamentoAdicional.cobEstado" class="form-select">
                    <option value="">Selecione</option>
                    <option v-for="uf in ufs" :key="uf">{{ uf }}</option>
                  </select>
                </div>
              </div>
            </div>
          </template>

          <hr class="opcoes-divider" />
          <p class="opcoes-title">Opções Disponíveis</p>

          <div class="radio-group">
            <label class="radio-item">
              <input type="radio" v-model="pagamentoAdicional.forma" value="debito" class="radio-input" />
              <span class="radio-label">Débito em Conta Corrente</span>
            </label>
            <label class="radio-item">
              <input type="radio" v-model="pagamentoAdicional.forma" value="pix" class="radio-input" />
              <span class="radio-label">PIX</span>
            </label>
            <label class="radio-item">
              <input type="radio" v-model="pagamentoAdicional.forma" value="boleto" class="radio-input" />
              <span class="radio-label">Boleto Bancário</span>
            </label>
          </div>

          <!-- Débito em Conta Corrente -->
          <template v-if="pagamentoAdicional.forma === 'debito'">
            <div class="form-grid mt-16">
              <div class="form-field">
                <label class="form-label">Dia de Vencimento</label>
                <select v-model="pagamentoAdicional.diaVencimento" class="form-select">
                  <option value="">Selecione o dia</option>
                  <option>Dia 5</option><option>Dia 10</option><option>Dia 15</option><option>Dia 20</option>
                </select>
              </div>
              <div class="form-field"></div>
            </div>
            <div class="info-box-blue mt-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>O débito será realizado automaticamente no dia selecionado de cada mês.<br />Certifique-se de que há saldo suficiente na conta para evitar problemas no processamento.<br />Caso tenha selecionado a opção de um aporte único e contribuições mensais, o primeiro débito será a soma destes valores e ocorrerá em 7 dias úteis após a conclusão da contratação da proposta.</div>
            </div>
          </template>

          <!-- PIX -->
          <template v-if="pagamentoAdicional.forma === 'pix'">
            <div class="info-box-blue mt-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>O código da chave PIX será gerado após a conclusão da contratação da proposta.<br />Caso tenha selecionado a opção de um aporte único e contribuições mensais, a primeira cobrança será a soma destes valores.</div>
            </div>
          </template>

          <!-- Boleto Bancário -->
          <template v-if="pagamentoAdicional.forma === 'boleto'">
            <div class="form-grid mt-16">
              <div class="form-field">
                <label class="form-label">Dia de Vencimento</label>
                <select v-model="pagamentoAdicional.diaVencimento" class="form-select">
                  <option value="">Selecione o dia</option>
                  <option>Dia 5</option><option>Dia 10</option><option>Dia 15</option><option>Dia 20</option>
                </select>
              </div>
              <div class="form-field"></div>
            </div>
            <div class="info-box-blue mt-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>Atenção: Após a emissão do certificado, a seguradora enviará o boleto em até 5 dias úteis para o e-mail cadastrado. Fique atento à caixa de Spam.<br />Caso tenha selecionado a opção de um aporte único e contribuições mensais, o primeiro boleto será a soma destes valores. Este será emitido somente após a conclusão da contratação da proposta.</div>
            </div>
          </template>

        </div>

        <div class="page-footer">
          <button class="btn-primary" @click="changeTab(tabIndex('Confirmação dos Dados'))">Continuar</button>
        </div>
      </template>

      <!-- ══ ABA: CONFIRMAÇÃO DOS DADOS ══ -->
      <template v-if="activeTab === tabIndex('Confirmação dos Dados')">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <h2 class="page-header__title">Confirmação dos Dados</h2>
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
            <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ proponente.cpf || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">{{ proponente.nome || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nome Social</span><span class="field-value">{{ proponente.nomeSocial || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ proponente.dataNasc ? new Date(proponente.dataNasc + 'T12:00:00').toLocaleDateString('pt-BR') : '—' }}</span></div>
            <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">{{ proponente.telefone || '—' }}</span></div>
            <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">{{ proponente.email || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">{{ proponente.renda || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Ocupação</span><span class="field-value">{{ proponente.ocupacao || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Empresa</span><span class="field-value">{{ proponente.empresa || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Origem da Renda</span><span class="field-value">{{ proponente.origemRenda || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Patrimônio</span><span class="field-value">{{ proponente.patrimonio || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nacionalidade</span><span class="field-value">{{ proponente.nacionalidade || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Pessoa Politicamente Exposta?</span><span class="field-value">{{ proponente.pessoaPolitica === 'sim' ? 'Sim' : proponente.pessoaPolitica === 'nao' ? 'Não' : '—' }}</span></div>
            <div class="field-item"><span class="field-label">É US Person?</span><span class="field-value">{{ proponente.usPerson === 'sim' ? 'Sim' : proponente.usPerson === 'nao' ? 'Não' : '—' }}</span></div>
          </div>
          <!-- Dados Residenciais -->
          <div class="conf-subsection">
            <div class="conf-subsection__title">Dados Residenciais</div>
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">CEP</span><span class="field-value">{{ proponente.cep || '—' }}</span></div>
              <div class="field-item" style="grid-column:span 2"><span class="field-label">Rua</span><span class="field-value">{{ proponente.rua || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Número</span><span class="field-value">{{ proponente.numero || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Complemento</span><span class="field-value">{{ proponente.complemento || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Bairro</span><span class="field-value">{{ proponente.bairro || '—' }}</span></div>
              <div class="field-item" style="grid-column:span 2"><span class="field-label">Município</span><span class="field-value">{{ proponente.municipio || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Estado</span><span class="field-value">{{ proponente.estado || '—' }}</span></div>
            </div>
          </div>
        </div>

        <!-- Dados da Portabilidade (Origem) -->
        <div class="section-card">
          <h3 class="section-card__title">Dados da Portabilidade — Origem</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Tipo de Portabilidade</span><span class="field-value">{{ tipoPortabilidade === 'externa' ? 'De outra instituição para a Nura' : 'Entre planos da Nura' }}</span></div>
            <div class="field-item"><span class="field-label">Processo SUSEP</span><span class="field-value">{{ form.susep || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Seguradora de Origem</span><span class="field-value">{{ form.seguradora || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Número do Certificado / Apólice</span><span class="field-value">{{ form.certificado || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nome do Plano</span><span class="field-value">{{ form.nomePlano || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Tipo do Plano</span><span class="field-value">{{ form.tipoPlano || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Regime Tributário</span><span class="field-value">{{ form.regime || '—' }}</span></div>
            <div class="field-item"><span class="field-label">CNPJ do Fundo</span><span class="field-value">{{ form.cnpjFundo || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Situação do Regime</span><span class="field-value">{{ form.situacaoRegime || '—' }}</span></div>
          </div>
          <!-- Configurações da Transferência -->
          <div class="conf-subsection">
            <div class="conf-subsection__title">Configurações da Transferência</div>
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">Tipo de Transferência</span><span class="field-value">{{ form.tipoTransferencia || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Valor da Portabilidade</span><span class="field-value">{{ form.tipoTransferencia === 'Total' ? 'Transferência Total' : (form.valorPortabilidade || '—') }}</span></div>
            </div>
          </div>
        </div>

        <!-- Dados do Destino -->
        <div class="section-card">
          <h3 class="section-card__title">Dados da Portabilidade — Destino</h3>
          <div v-if="hasDivergencia" class="conf-divergencia-aviso">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Campos em vermelho indicam divergência em relação à Origem — uma Contratação Adicional foi gerada automaticamente.
          </div>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Processo SUSEP</span><span class="field-value">{{ destino.susep || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Seguradora de Destino</span><span class="field-value">{{ destino.seguradora || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Número do Certificado / Apólice</span><span class="field-value">{{ destino.certificado || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nome do Plano</span><span class="field-value">{{ destino.nomePlano || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Tipo do Plano</span><span class="field-value" :class="{ 'field-value--divergente': hasDivergencia && destino.tipoPlano !== form.tipoPlano }">{{ destino.tipoPlano || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Regime Tributário</span><span class="field-value" :class="{ 'field-value--divergente': hasDivergencia && destino.regime !== form.regime }">{{ destino.regime || '—' }}</span></div>
            <div class="field-item"><span class="field-label">CNPJ do Fundo</span><span class="field-value">{{ destino.cnpjFundo || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Situação do Regime</span><span class="field-value" :class="{ 'field-value--divergente': hasDivergencia && destino.situacaoRegime !== form.situacaoRegime }">{{ destino.situacaoRegime || '—' }}</span></div>
          </div>
        </div>

        <!-- Dados Adicionais do Plano (se Contratação Adicional) -->
        <template v-if="showContratacaoTab">
          <!-- Subtítulo separador -->
          <div class="conf-section-separator">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Contratação Adicional
          </div>

          <div v-for="(bloco, bi) in blocosDadosAdicionais" :key="bi" class="section-card">
            <h3 class="section-card__title">{{ bi === 0 ? 'Dados Adicionais do Plano' : `Dados Adicionais do Plano ${bi + 1}` }}</h3>
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">Tipo do Plano</span><span class="field-value">{{ bloco.tipoPlano || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Regime de Tributação</span><span class="field-value">{{ bloco.regime || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Situação do Regime</span><span class="field-value">{{ bloco.situacaoRegime || '—' }}</span></div>
            </div>
            <div v-if="bloco.fundosSelecionados.length > 0" class="mt-16">
              <div class="review-subtab-header">Fundos Selecionados</div>
              <div v-for="(fs, fi) in bloco.fundosSelecionados" :key="fi" class="fund-card mb-8">
                <div class="fund-card__header">
                  <div class="fund-card__name">{{ fs.nome }}</div>
                  <div class="fund-card__cnpj">{{ fs.cnpj }}</div>
                </div>
                <div class="fund-card__body">
                  <div class="fund-card__row"><span class="fund-card__label">CONTRIBUIÇÃO MENSAL:</span><span class="fund-card__text">Valor Atribuído <strong>{{ fs.valorContrib || '—' }}</strong></span><span class="fund-card__text">Percentual Atribuído <strong>{{ fs.percContrib || '0' }}%</strong></span></div>
                  <div class="fund-card__row"><span class="fund-card__label">APORTE INICIAL:</span><span class="fund-card__text">Valor Atribuído <strong>{{ fs.valorAporte || '—' }}</strong></span><span class="fund-card__text">Percentual Atribuído <strong>{{ fs.percAporte || '0' }}%</strong></span></div>
                  <div class="fund-card__meta"><span>Taxa Máx. Adm.: <strong>{{ fs.taxaAdm }}</strong></span><span>Rentabilidade: <strong>{{ fs.rentabilidade }}</strong></span><span>Classificação: <strong>{{ fs.classificacao }}</strong></span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Beneficiários -->
          <div v-if="beneficiarios.length > 0" class="section-card">
            <h3 class="section-card__title">Beneficiários</h3>
            <div v-for="(ben, i) in beneficiarios" :key="i" class="conf-beneficiario-bloco">
              <div class="conf-beneficiario-titulo">Beneficiário {{ i + 1 }}</div>
              <div class="field-grid field-grid--3">
                <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ ben.cpf || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">{{ ben.nome || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ ben.dataNasc || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Grau de Parentesco</span><span class="field-value">{{ ben.parentesco || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Percentual</span><span class="field-value">{{ ben.percentual || 0 }}%</span></div>
                <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">{{ ben.telefone || '—' }}</span></div>
                <div class="field-item field-item--full"><span class="field-label">E-mail</span><span class="field-value">{{ ben.email || '—' }}</span></div>
              </div>
            </div>
          </div>

          <!-- Forma de Pagamento -->
          <div class="section-card">
            <h3 class="section-card__title">Forma de Pagamento — Contratação Adicional</h3>

            <!-- Responsável Financeiro -->
            <div class="conf-subsection">
              <div class="conf-subsection__title">Responsável Financeiro</div>
              <div class="field-grid field-grid--3">
                <div class="field-item field-item--full">
                  <span class="field-label">Dados do Responsável Financeiro serão os mesmos aos Dados do Proponente?</span>
                  <span class="field-value">{{ pagamentoAdicional.respFinanceiro === 'sim' ? 'Sim' : 'Não' }}</span>
                </div>
                <template v-if="pagamentoAdicional.respFinanceiro === 'nao'">
                  <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">{{ pagamentoAdicional.rfNome || '—' }}</span></div>
                  <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ pagamentoAdicional.rfCpf || '—' }}</span></div>
                  <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ pagamentoAdicional.rfDataNasc || '—' }}</span></div>
                  <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">{{ pagamentoAdicional.rfTelefone || '—' }}</span></div>
                  <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">{{ pagamentoAdicional.rfEmail || '—' }}</span></div>
                </template>
              </div>
            </div>

            <!-- Endereço de Cobrança -->
            <div class="conf-subsection">
              <div class="conf-subsection__title">Endereço de Cobrança</div>
              <div class="field-grid field-grid--3">
                <div class="field-item field-item--full">
                  <span class="field-label">O Endereço de Cobrança será o mesmo informado nos Dados do Proponente?</span>
                  <span class="field-value">{{ pagamentoAdicional.enderecoCobranca === 'sim' ? 'Sim' : 'Não' }}</span>
                </div>
                <template v-if="pagamentoAdicional.enderecoCobranca === 'nao'">
                  <div class="field-item"><span class="field-label">CEP</span><span class="field-value">{{ pagamentoAdicional.cobCep || '—' }}</span></div>
                  <div class="field-item" style="grid-column:span 2"><span class="field-label">Rua</span><span class="field-value">{{ pagamentoAdicional.cobRua || '—' }}</span></div>
                  <div class="field-item"><span class="field-label">Número</span><span class="field-value">{{ pagamentoAdicional.cobNumero || '—' }}</span></div>
                  <div class="field-item"><span class="field-label">Complemento</span><span class="field-value">{{ pagamentoAdicional.cobComplemento || '—' }}</span></div>
                  <div class="field-item"><span class="field-label">Bairro</span><span class="field-value">{{ pagamentoAdicional.cobBairro || '—' }}</span></div>
                  <div class="field-item" style="grid-column:span 2"><span class="field-label">Município</span><span class="field-value">{{ pagamentoAdicional.cobMunicipio || '—' }}</span></div>
                  <div class="field-item"><span class="field-label">Estado</span><span class="field-value">{{ pagamentoAdicional.cobEstado || '—' }}</span></div>
                </template>
              </div>
            </div>

            <!-- Forma selecionada -->
            <div class="conf-subsection">
              <div class="conf-subsection__title">Opção de Pagamento</div>
              <div class="field-grid field-grid--3">
                <div class="field-item"><span class="field-label">Forma de Pagamento</span><span class="field-value">{{ formaLabelAdicional(pagamentoAdicional.forma) }}</span></div>
                <template v-if="pagamentoAdicional.forma === 'debito' || pagamentoAdicional.forma === 'boleto'">
                  <div class="field-item"><span class="field-label">Dia de Vencimento</span><span class="field-value">{{ pagamentoAdicional.diaVencimento || '—' }}</span></div>
                </template>
                <template v-if="pagamentoAdicional.forma === 'pix'">
                  <div class="field-item"><span class="field-label">Observação</span><span class="field-value">Código PIX gerado após a conclusão da contratação</span></div>
                </template>
              </div>
            </div>
          </div>
        </template>

        <div class="page-footer">
          <button class="btn-primary">Confirmar Portabilidade</button>
        </div>
      </template>

    </div>

    <!-- ══ MODAL: BUSCA DE FUNDOS ══ -->
    <teleport to="body">
      <div v-if="popupFundos.aberto" class="modal-overlay" @click.self="fecharPopupFundos">
        <div class="modal-fundos">
          <!-- Header -->
          <div class="modal-fundos__header">
            <div>
              <h3 class="modal-fundos__title">Buscar Fundos Disponíveis</h3>
              <span class="modal-fundos__count">{{ fundosPopupFiltrados.length }} de {{ fundosDisponiveis.length }} fundos encontrados</span>
            </div>
            <div class="modal-fundos__header-right">
              <!-- Termômetro de Risco -->
              <div class="termometro-risco">
                <span class="termometro-label">Muito baixo</span>
                <div class="termometro-barra">
                  <div class="termometro-fill"></div>
                </div>
                <span class="termometro-label">Média</span>
                <div class="termometro-barra termometro-barra--mid">
                  <div class="termometro-fill termometro-fill--mid"></div>
                </div>
                <span class="termometro-label">Muito alto</span>
              </div>
              <button class="modal-fundos__close" @click="fecharPopupFundos">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          <!-- Campo de busca -->
          <div class="modal-fundos__search">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              v-model="popupFundos.busca"
              type="text"
              placeholder="Pesquisar por nome ou CNPJ do fundo..."
              class="modal-fundos__input"
              autofocus
            />
          </div>

          <!-- Tabela de fundos -->
          <div class="modal-fundos__table-wrapper">
            <table class="modal-fundos__table">
              <thead>
                <tr>
                  <th class="col-check"></th>
                  <th class="col-nome">Nome</th>
                  <th class="col-taxa">Taxa Máx. Adm. ▴▾</th>
                  <th class="col-rent">Rentabilidade ▴▾</th>
                  <th class="col-class">Classificação</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="f in fundosPopupFiltrados"
                  :key="f.cnpj"
                  class="modal-fundos__row"
                  :class="{ 'modal-fundos__row--selected': popupFundos.selecionados.includes(f.cnpj) }"
                  @click="toggleFundoPopup(f)"
                >
                  <td class="col-check">
                    <div class="modal-checkbox" :class="{ 'modal-checkbox--checked': popupFundos.selecionados.includes(f.cnpj) }">
                      <svg v-if="popupFundos.selecionados.includes(f.cnpj)" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </td>
                  <td class="col-nome">
                    <div class="modal-fundo-nome">{{ f.nome }}</div>
                    <div class="modal-fundo-cnpj">{{ f.cnpj }}</div>
                  </td>
                  <td class="col-taxa">{{ f.taxaAdm }}</td>
                  <td class="col-rent">{{ f.rentabilidade }}</td>
                  <td class="col-class">{{ f.classificacao }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div class="modal-fundos__footer">
            <span class="modal-fundos__footer-info">{{ popupFundos.selecionados.length }} fundo(s) selecionado(s)</span>
            <button class="btn-confirmar-fundos" @click="confirmarFundosPopup">Confirmar</button>
          </div>
        </div>
      </div>
    </teleport>
  </AppShell>
</template>

<script setup lang="ts">
interface Beneficiary {
  cpf: string; nome: string; dataNasc: string; parentesco: string; percentual: number; telefone: string; email: string
}

interface FundoSelecionado {
  nome: string; cnpj: string; taxaAdm: string; rentabilidade: string; classificacao: string
  valorContrib: string; percContrib: string; valorAporte: string; percAporte: string
}

interface BlocoAdicional {
  tipoPlano: string; regime: string; situacaoRegime: string
  fundoBusca: string; showFundoDropdown: boolean; fundosSelecionados: FundoSelecionado[]
}

interface PagamentoAdicional {
  forma: string; banco: string; agencia: string; conta: string; titular: string; cpfTitular: string; diaVencimento: string
  respFinanceiro: string; rfNome: string; rfCpf: string; rfDataNasc: string; rfTelefone: string; rfEmail: string
}

const seguradoras = [
  'Bradesco Vida e Previdência', 'Itaú Vida e Previdência', 'Santander Previdência',
  'Zurich Santander Brasil Seguros', 'Porto Seguro Vida e Previdência', 'Caixa Vida e Previdência',
  'Icatu Seguros', 'XP Vida e Previdência', 'Mapfre Vida', 'Mongeral Aegon Seguros',
  'Tokio Marine Seguradora', 'Allianz Seguros', 'SulAmérica Seguros', 'Prudential do Brasil',
  'MetLife Seguros', 'Generali Brasil Seguros', 'Sompo Seguros', 'HDI Seguros',
]

const fundosDisponiveis = [
  { nome: 'Absolute Atenas Icatu Prev FIC FIRF CP', cnpj: '47.612.701/0001-45', taxaAdm: '0,98% a.a.', rentabilidade: '—', classificacao: 'Renda Fixa' },
  { nome: 'Nura Prev Ciclo de Vida 2045 FIC FIM', cnpj: '12.345.678/0001-90', taxaAdm: '0,90% a.a.', rentabilidade: '+8,4%', classificacao: 'Multimercado' },
  { nome: 'Bradesco FIC FI Prev RF Crédito Privado', cnpj: '11.111.111/0001-11', taxaAdm: '1,20% a.a.', rentabilidade: '+7,2%', classificacao: 'Renda Fixa' },
  { nome: 'Itaú Flexprev FIC FI Prev RF', cnpj: '22.222.222/0001-22', taxaAdm: '1,00% a.a.', rentabilidade: '+7,8%', classificacao: 'Renda Fixa' },
  { nome: 'XP Prev Renda Fixa FIC FI', cnpj: '33.333.333/0001-33', taxaAdm: '0,75% a.a.', rentabilidade: '+8,1%', classificacao: 'Renda Fixa' },
  { nome: 'Icatu Vanguarda Inflação FIC FI Prev RF', cnpj: '44.444.444/0001-44', taxaAdm: '0,85% a.a.', rentabilidade: '+9,0%', classificacao: 'Renda Fixa' },
  { nome: 'SulAmérica Prev Renda Fixa FIC FI', cnpj: '55.555.555/0001-55', taxaAdm: '1,10% a.a.', rentabilidade: '+7,5%', classificacao: 'Renda Fixa' },
  { nome: 'Porto Seguro Prev Multimercado FIC FI', cnpj: '66.666.666/0001-66', taxaAdm: '1,30% a.a.', rentabilidade: '+10,2%', classificacao: 'Multimercado' },
]

// Proponente
const proponente = reactive({
  cpf: '123.456.789-00', nome: 'Taís Oliveira Costa', nomeSocial: '', dataNasc: '1984-05-15', telefone: '(11) 98765-4321', email: 'tais.oliveira@email.com',
  renda: 'R$ 18.000,00', ocupacao: 'Gerente de Marketing', empresa: 'Tech Solutions Brasil', origemRenda: 'Salário CLT', patrimonio: 'R$ 350.000,00', nacionalidade: 'Brasileira',
  pessoaPolitica: 'nao', usPerson: 'nao',
  cep: '01310-100', rua: 'Avenida Paulista', numero: '1000', complemento: 'Apto 42', bairro: 'Bela Vista', municipio: 'São Paulo', estado: 'SP',
})

const ufs = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']

async function onCepInputAdicional() {
  const raw = pagamentoAdicional.cobCep.replace(/\D/g, '')
  if (raw.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
      const data = await res.json()
      if (!data.erro) {
        pagamentoAdicional.cobRua = data.logradouro || ''
        pagamentoAdicional.cobBairro = data.bairro || ''
        pagamentoAdicional.cobMunicipio = data.localidade || ''
        pagamentoAdicional.cobEstado = data.uf || ''
      }
    } catch {}
  }
}

async function onCepInput() {
  const raw = proponente.cep.replace(/\D/g, '')
  if (raw.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
      const data = await res.json()
      if (!data.erro) {
        proponente.rua = data.logradouro || ''
        proponente.bairro = data.bairro || ''
        proponente.municipio = data.localidade || ''
        proponente.estado = data.uf || ''
      }
    } catch {}
  }
}

// Tipo de portabilidade
const tipoPortabilidade = ref('externa')

// Formulário — Origem
const form = reactive({
  susep: '', seguradora: '', certificado: '', nomePlano: '',
  tipoPlano: 'PGBL', regime: 'Progressiva', cnpjFundo: '', situacaoRegime: 'Retratável',
  tipoTransferencia: 'Total', valorPortabilidade: '',
  contratacaoAdicional: 'Não',
})

// Formulário — Destino
const destino = reactive({
  susep: '', seguradora: '', certificado: '', nomePlano: '',
  tipoPlano: 'PGBL', regime: 'Progressiva', cnpjFundo: '', situacaoRegime: 'Retratável',
})

// Divergência: aparece quando qualquer um dos três campos difere entre Origem e Destino
const hasDivergencia = computed(() =>
  form.tipoPlano !== destino.tipoPlano ||
  form.regime !== destino.regime ||
  form.situacaoRegime !== destino.situacaoRegime
)

// Blocos de Dados Adicionais do Plano (array para suportar múltiplos produtos)
function newBlocoAdicional(): BlocoAdicional {
  return {
    tipoPlano: form.tipoPlano,
    regime: form.regime,
    situacaoRegime: form.situacaoRegime,
    fundoBusca: '',
    showFundoDropdown: false,
    fundosSelecionados: [],
  }
}

const blocosDadosAdicionais = ref<BlocoAdicional[]>([newBlocoAdicional()])

function addBlocoAdicional() {
  blocosDadosAdicionais.value.push({
    tipoPlano: 'PGBL', regime: 'Progressiva', situacaoRegime: 'Retratável',
    fundoBusca: '', showFundoDropdown: false, fundosSelecionados: [],
  })
}
function removeBlocoAdicional(i: number) { blocosDadosAdicionais.value.splice(i, 1) }

// Quando divergência muda, atualizar o primeiro bloco com os valores da Origem
watch(hasDivergencia, (val) => {
  if (val) {
    blocosDadosAdicionais.value[0].tipoPlano = form.tipoPlano
    blocosDadosAdicionais.value[0].regime = form.regime
    blocosDadosAdicionais.value[0].situacaoRegime = form.situacaoRegime
  }
})
watch(() => [form.tipoPlano, form.regime, form.situacaoRegime], () => {
  if (hasDivergencia.value) {
    blocosDadosAdicionais.value[0].tipoPlano = form.tipoPlano
    blocosDadosAdicionais.value[0].regime = form.regime
    blocosDadosAdicionais.value[0].situacaoRegime = form.situacaoRegime
  }
})

// Fundos
function adicionarFundo(bloco: BlocoAdicional, f: typeof fundosDisponiveis[0]) {
  if (!bloco.fundosSelecionados.find(fs => fs.cnpj === f.cnpj)) {
    bloco.fundosSelecionados.push({ ...f, valorContrib: '', percContrib: '', valorAporte: '', percAporte: '' })
  }
  bloco.fundoBusca = ''
  bloco.showFundoDropdown = false
}
function removerFundo(bloco: BlocoAdicional, i: number) { bloco.fundosSelecionados.splice(i, 1) }

// Pop-up de busca de fundos
const popupFundos = reactive({
  aberto: false,
  busca: '',
  selecionados: [] as string[], // CNPJs dos fundos selecionados no popup
  blocoAtual: null as BlocoAdicional | null,
})

const fundosPopupFiltrados = computed(() => {
  if (!popupFundos.busca) return fundosDisponiveis
  const q = popupFundos.busca.toLowerCase()
  return fundosDisponiveis.filter(f =>
    f.nome.toLowerCase().includes(q) || f.cnpj.includes(q)
  )
})

function abrirPopupFundos(bloco: BlocoAdicional) {
  popupFundos.blocoAtual = bloco
  popupFundos.busca = ''
  // Pré-marcar os fundos já selecionados no bloco
  popupFundos.selecionados = bloco.fundosSelecionados.map(f => f.cnpj)
  popupFundos.aberto = true
}

function fecharPopupFundos() {
  popupFundos.aberto = false
  popupFundos.blocoAtual = null
  popupFundos.busca = ''
}

function toggleFundoPopup(f: typeof fundosDisponiveis[0]) {
  const idx = popupFundos.selecionados.indexOf(f.cnpj)
  if (idx === -1) {
    popupFundos.selecionados.push(f.cnpj)
  } else {
    popupFundos.selecionados.splice(idx, 1)
  }
}

function confirmarFundosPopup() {
  if (!popupFundos.blocoAtual) return
  const bloco = popupFundos.blocoAtual
  // Manter fundos já existentes que ainda estão selecionados
  bloco.fundosSelecionados = bloco.fundosSelecionados.filter(fs =>
    popupFundos.selecionados.includes(fs.cnpj)
  )
  // Adicionar novos fundos selecionados que ainda não existem no bloco
  for (const cnpj of popupFundos.selecionados) {
    if (!bloco.fundosSelecionados.find(fs => fs.cnpj === cnpj)) {
      const f = fundosDisponiveis.find(fd => fd.cnpj === cnpj)
      if (f) bloco.fundosSelecionados.push({ ...f, valorContrib: '', percContrib: '', valorAporte: '', percAporte: '' })
    }
  }
  fecharPopupFundos()
}

// Pagamento Adicional
const pagamentoAdicional = reactive<PagamentoAdicional>({
  forma: 'debito', banco: '', agencia: '', conta: '', titular: '', cpfTitular: '', diaVencimento: '',
  respFinanceiro: 'sim', rfNome: '', rfCpf: '', rfDataNasc: '', rfTelefone: '', rfEmail: '',
  enderecoCobranca: 'sim', cobCep: '', cobRua: '', cobNumero: '', cobComplemento: '', cobBairro: '', cobMunicipio: '', cobEstado: '',
})

function preencherRespFinanceiro() {
  if (pagamentoAdicional.respFinanceiro === 'sim') {
    pagamentoAdicional.rfNome = 'Taís Oliveira Costa'
    pagamentoAdicional.rfCpf = '123.456.789-00'
  }
}

function formaLabelAdicional(forma: string) {
  const m: Record<string, string> = { debito: 'Débito em Conta Corrente', pix: 'PIX', boleto: 'Boleto Bancário' }
  return m[forma] || '—'
}

// Beneficiários
function newBen(): Beneficiary { return { cpf: '', nome: '', dataNasc: '', parentesco: '', percentual: 0, telefone: '', email: '' } }
const beneficiarios = ref<Beneficiary[]>([newBen()])
const somaPercentual = computed(() => beneficiarios.value.reduce((s, b) => s + (b.percentual || 0), 0))
function addBen() { beneficiarios.value.push(newBen()) }
function removeBen(i: number) { beneficiarios.value.splice(i, 1) }

// Autocomplete — Origem
const seguradoraQuery = ref('')
const showSeguradoraDropdown = ref(false)
const seguradoraResults = computed(() => {
  if (!seguradoraQuery.value) return seguradoras.slice(0, 8)
  return seguradoras.filter(s => s.toLowerCase().includes(seguradoraQuery.value.toLowerCase())).slice(0, 8)
})
function onSeguradoraInput() { showSeguradoraDropdown.value = true }
function hideDropdownDelayed() { setTimeout(() => { showSeguradoraDropdown.value = false }, 200) }
function selectSeguradora(s: string) { form.seguradora = s; seguradoraQuery.value = s; showSeguradoraDropdown.value = false }

// Autocomplete — Destino
const destinoSeguradoraQuery = ref('')
const showDestinoDropdown = ref(false)
const destinoSeguradoraResults = computed(() => {
  if (!destinoSeguradoraQuery.value) return seguradoras.slice(0, 8)
  return seguradoras.filter(s => s.toLowerCase().includes(destinoSeguradoraQuery.value.toLowerCase())).slice(0, 8)
})
function onDestinoSeguradoraInput() { showDestinoDropdown.value = true }
function hideDestinoDropdownDelayed() { setTimeout(() => { showDestinoDropdown.value = false }, 200) }
function selectDestinoSeguradora(s: string) { destino.seguradora = s; destinoSeguradoraQuery.value = s; showDestinoDropdown.value = false }

// Lógica de abas dinâmicas
// Aba "Contratação Adicional" aparece quando:
// 1. form.contratacaoAdicional === 'Sim' (voluntário), OU
// 2. hasDivergencia (obrigatório por divergência)
const showContratacaoTab = computed(() =>
  form.contratacaoAdicional === 'Sim' || hasDivergencia.value
)

const allTabs = ['Detalhes da Portabilidade', 'Contratação Adicional', 'Confirmação dos Dados']
const visibleTabs = computed(() => {
  return allTabs.filter(t => {
    if (t === 'Contratação Adicional') return showContratacaoTab.value
    return true
  })
})

function tabIndex(name: string): number {
  return visibleTabs.value.indexOf(name)
}

const activeTab = ref(0)
function changeTab(i: number) {
  if (i >= 0 && i < visibleTabs.value.length) activeTab.value = i
}

function advanceFromDetalhes() {
  const next = showContratacaoTab.value
    ? tabIndex('Contratação Adicional')
    : tabIndex('Confirmação dos Dados')
  changeTab(next)
}

watch(showContratacaoTab, (val) => {
  if (!val && activeTab.value === tabIndex('Contratação Adicional')) {
    activeTab.value = tabIndex('Detalhes da Portabilidade')
  }
})
</script>

<style scoped>
.page-content { padding: 28px 40px 80px; }

.page-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
.page-header__icon { color: var(--text-muted); display: flex; align-items: center; }
.page-header__title { font-family: var(--font-sans); font-size: 20px; font-weight: 600; color: var(--text-primary); margin: 0; }

.section-card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 24px; margin-bottom: 16px; }
.section-card__title { display: flex; align-items: center; gap: 8px; font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color); }
.section-card__title-row { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--border-color); margin-bottom: 0; }

.tipo-port-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.tipo-port-card { position: relative; display: flex; align-items: center; gap: 12px; padding: 16px; border: 1.5px solid var(--border-color); border-radius: 8px; background: white; cursor: pointer; text-align: left; transition: border-color 0.15s, background-color 0.15s; font-family: var(--font-sans); }
.tipo-port-card--active { border-color: var(--btn-primary-bg); background-color: #f0f4ff; }
.tipo-port-card--disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
.tipo-port-card__radio { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--border-color); flex-shrink: 0; transition: border-color 0.15s, background-color 0.15s; }
.tipo-port-card__radio--active { border-color: var(--btn-primary-bg); background-color: var(--btn-primary-bg); box-shadow: inset 0 0 0 3px white; }
.tipo-port-card__label { font-size: 14px; font-weight: 500; color: var(--text-primary); }
.tipo-port-card__badge { position: absolute; top: 8px; right: 8px; background-color: var(--btn-primary-bg); color: white; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.3px; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field--full { grid-column: 1 / -1; }

.form-label { font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.6px; }
.form-label-radio { font-family: var(--font-sans); font-size: 11px; font-weight: 700; color: #1e3a5f; text-transform: uppercase; letter-spacing: 0.6px; display: flex; align-items: center; gap: 6px; }
.form-hint { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

.radio-group-h { display: flex; flex-direction: row; gap: 20px; align-items: center; margin-top: 4px; flex-wrap: wrap; }
.radio-label-h { display: flex; align-items: center; gap: 7px; font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); cursor: pointer; }
.radio-label-h--disabled { opacity: 0.5; cursor: not-allowed; }
.radio-input { width: 16px; height: 16px; accent-color: var(--btn-primary-bg); cursor: pointer; }

.radio-group { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
.radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.radio-label { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); }

.form-input { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); padding: 9px 12px; border: 1px solid var(--border-color); border-radius: 6px; background-color: white; outline: none; transition: border-color 0.15s; width: 100%; box-sizing: border-box; }
.form-input:focus { border-color: #94a3b8; }
.form-input::placeholder { color: #94a3b8; }
.form-input--disabled { background-color: #f1f5f9; color: var(--text-muted); cursor: not-allowed; }
.form-select { font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); padding: 9px 12px; border: 1px solid var(--border-color); border-radius: 6px; background-color: white; outline: none; cursor: pointer; width: 100%; box-sizing: border-box; }

.autocomplete-wrapper { position: relative; }
.autocomplete-dropdown { position: absolute; top: calc(100% + 2px); left: 0; right: 0; background: white; border: 1px solid var(--border-color); border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); z-index: 100; max-height: 220px; overflow-y: auto; }
.autocomplete-item { display: flex; flex-direction: column; width: 100%; padding: 9px 12px; text-align: left; background: none; border: none; cursor: pointer; font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); transition: background-color 0.1s; }
.autocomplete-item:hover { background-color: #f8fafc; }
.fundo-item-nome { font-size: 13px; font-weight: 500; color: var(--text-primary); }
.fundo-item-cnpj { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

/* Seleção de Fundos */
.selecao-fundos-box { border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; }
.selecao-fundos-box__header { padding: 10px 16px; background-color: #f8fafc; border-bottom: 1px solid var(--border-color); font-family: var(--font-sans); font-size: 11px; font-weight: 700; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.6px; }
.selecao-fundos-box__body { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
.fundos-selecionados-list { display: flex; flex-direction: column; gap: 12px; }

/* Fund card */
.fund-card { border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; }
.fund-card__header { padding: 12px 16px; background-color: #f8fafc; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.fund-card__name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.fund-card__cnpj { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.fund-card__body { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
.fund-card__row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.fund-card__label { font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.5px; min-width: 140px; }
.fund-card__text { font-size: 12px; color: var(--text-primary); }
.fund-card__meta { display: flex; gap: 20px; margin-top: 4px; flex-wrap: wrap; }
.fund-card__meta span { font-size: 12px; color: var(--text-muted); }
.fund-input { font-family: var(--font-sans); font-size: 13px; color: var(--text-primary); padding: 6px 10px; border: 1px solid var(--border-color); border-radius: 5px; background-color: white; outline: none; width: 110px; box-sizing: border-box; }
.fund-input--sm { width: 60px; }
.btn-remove-fund { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 4px; display: flex; align-items: center; transition: color 0.12s; }
.btn-remove-fund:hover { color: #ef4444; }

/* Botão Adicionar Novo Produto */
.btn-add-produto { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: none; border: 1.5px dashed var(--btn-primary-bg); border-radius: 8px; cursor: pointer; font-family: var(--font-sans); font-size: 14px; font-weight: 500; color: var(--btn-primary-bg); transition: background-color 0.12s; margin-bottom: 16px; width: 100%; justify-content: center; }
.btn-add-produto:hover { background-color: #f0f4ff; }

/* Botão remover bloco */
.btn-remove-bloco { display: flex; align-items: center; gap: 4px; font-family: var(--font-sans); font-size: 12px; font-weight: 500; color: #ef4444; background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background-color 0.15s; }
.btn-remove-bloco:hover { background-color: #fef2f2; }

/* Alerta de divergência */
.alert-divergencia { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; background-color: #fffbeb; border: 1px solid #fbbf24; border-radius: 6px; font-size: 13px; color: #92400e; line-height: 1.5; margin-bottom: 0; }
.alert-divergencia svg { flex-shrink: 0; color: #f59e0b; margin-top: 1px; }

/* Forma de Pagamento */
.resp-financeiro-row { display: grid; grid-template-columns: 1fr 160px; align-items: center; gap: 20px; }
.resp-financeiro-row .field-label { font-size: 13px; font-weight: 500; text-transform: none; letter-spacing: 0; color: var(--text-primary); }
.radio-group-inline { display: flex; flex-direction: row; gap: 20px; justify-content: flex-start; }
.opcoes-divider { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0 16px; }
.opcoes-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary); margin: 0 0 12px; }
.subsection-title { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 16px 0 12px; }
.info-box-blue { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.5; }
.info-box-blue svg { flex-shrink: 0; width: 18px; height: 18px; margin-top: 1px; color: #1e40af; }

/* Beneficiários */
.beneficiary-card { border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
.beneficiary-card__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.beneficiary-card__title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.btn-remove { display: flex; align-items: center; gap: 4px; font-family: var(--font-sans); font-size: 12px; font-weight: 500; color: #ef4444; background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background-color 0.15s; }
.btn-remove:hover { background-color: #fef2f2; }
.btn-add { display: flex; align-items: center; gap: 6px; font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--text-muted); background: none; border: 1px dashed var(--border-color); border-radius: 6px; padding: 10px 16px; cursor: pointer; width: 100%; justify-content: center; transition: border-color 0.15s, color 0.15s, background-color 0.15s; }
.btn-add:hover { border-color: #94a3b8; color: var(--text-primary); background-color: #f8fafc; }
.alert-warning { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 6px; font-size: 13px; color: #854d0e; margin: 8px 0; }

/* Campos de revisão */
.field-grid { display: grid; gap: 16px 24px; }
.field-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
.field-item { display: flex; flex-direction: column; gap: 4px; }
.field-label { font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.6px; }
.field-value { font-family: var(--font-sans); font-size: 15px; font-weight: 400; color: var(--text-primary); }
.field-value--divergente { color: #dc2626; font-weight: 600; }
.review-subtab-header { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 14px; padding: 8px 12px; background-color: #f8fafc; border-radius: 6px; border-left: 3px solid var(--btn-primary-bg); }

.field-item--full { grid-column: 1 / -1; }
.proponente-flags { display: flex; flex-direction: row; gap: 32px; flex-wrap: wrap; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-color); }
.proponente-flag-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.flag-radio-group { display: flex; flex-direction: row; gap: 20px; }
.flag-radio-label { display: flex; align-items: center; gap: 7px; font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); cursor: pointer; }
.proponente-residencial { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-color); }
.subsection-divider-title { font-family: var(--font-sans); font-size: 12px; font-weight: 700; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 14px; }
.mb-8 { margin-bottom: 8px; }
.mb-16 { margin-bottom: 16px; }
.mt-16 { margin-top: 16px; }

/* Botão de abrir busca de fundos */
.btn-buscar-fundos { display: flex; align-items: center; gap: 8px; width: 100%; padding: 9px 12px; background: white; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-family: var(--font-sans); font-size: 14px; color: #94a3b8; text-align: left; transition: border-color 0.15s; }
.btn-buscar-fundos:hover { border-color: #94a3b8; }

/* Modal overlay */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 1000; display: flex; align-items: center; justify-content: center; }

/* Modal de fundos */
.modal-fundos { background: white; border-radius: 12px; width: 680px; max-width: 95vw; max-height: 85vh; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden; }

.modal-fundos__header { display: flex; align-items: flex-start; justify-content: space-between; padding: 20px 24px 12px; border-bottom: 1px solid var(--border-color); gap: 16px; }
.modal-fundos__title { font-family: var(--font-sans); font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px; }
.modal-fundos__count { font-size: 12px; color: var(--text-muted); }
.modal-fundos__header-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
.modal-fundos__close { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 4px; display: flex; align-items: center; transition: color 0.12s; }
.modal-fundos__close:hover { color: var(--text-primary); }

/* Termômetro de Risco */
.termometro-risco { display: flex; align-items: center; gap: 6px; }
.termometro-label { font-size: 10px; color: var(--text-muted); white-space: nowrap; }
.termometro-barra { width: 48px; height: 8px; border-radius: 4px; background: linear-gradient(to right, #22c55e, #86efac); overflow: hidden; }
.termometro-barra--mid { background: linear-gradient(to right, #fbbf24, #ef4444); }
.termometro-fill { width: 100%; height: 100%; }

/* Campo de busca do modal */
.modal-fundos__search { display: flex; align-items: center; gap: 10px; padding: 12px 24px; border-bottom: 1px solid var(--border-color); }
.modal-fundos__search svg { flex-shrink: 0; color: var(--text-muted); }
.modal-fundos__input { flex: 1; border: none; outline: none; font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); }
.modal-fundos__input::placeholder { color: #94a3b8; }

/* Tabela de fundos */
.modal-fundos__table-wrapper { flex: 1; overflow-y: auto; }
.modal-fundos__table { width: 100%; border-collapse: collapse; }
.modal-fundos__table thead tr { border-bottom: 1px solid var(--border-color); background: #f8fafc; }
.modal-fundos__table th { padding: 10px 12px; font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.5px; text-align: left; white-space: nowrap; }
.modal-fundos__row { border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: background-color 0.1s; }
.modal-fundos__row:hover { background-color: #f8fafc; }
.modal-fundos__row--selected { background-color: #eff6ff; }
.modal-fundos__row--selected:hover { background-color: #dbeafe; }
.modal-fundos__table td { padding: 10px 12px; font-family: var(--font-sans); font-size: 13px; color: var(--text-primary); vertical-align: middle; }
.col-check { width: 40px; text-align: center; }
.col-nome { min-width: 200px; }
.col-taxa { width: 130px; }
.col-rent { width: 120px; }
.col-class { width: 110px; }
.modal-fundo-nome { font-size: 13px; font-weight: 500; color: var(--text-primary); }
.modal-fundo-cnpj { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

/* Checkbox do modal */
.modal-checkbox { width: 16px; height: 16px; border: 1.5px solid var(--border-color); border-radius: 3px; display: flex; align-items: center; justify-content: center; margin: 0 auto; transition: background-color 0.12s, border-color 0.12s; }
.modal-checkbox--checked { background-color: var(--btn-primary-bg); border-color: var(--btn-primary-bg); }

/* Footer do modal */
.modal-fundos__footer { display: flex; align-items: center; justify-content: space-between; padding: 14px 24px; border-top: 1px solid var(--border-color); background: #f8fafc; }
.modal-fundos__footer-info { font-size: 13px; color: var(--text-muted); }
.btn-confirmar-fundos { font-family: var(--font-sans); font-size: 14px; font-weight: 500; padding: 9px 24px; border-radius: 8px; border: none; cursor: pointer; background-color: var(--btn-primary-bg); color: var(--btn-primary-color); transition: opacity 0.15s; }
.btn-confirmar-fundos:hover { opacity: 0.85; }

.page-footer { display: flex; justify-content: flex-end; padding-top: 24px; }
.btn-primary { font-family: var(--font-sans); font-size: 14px; font-weight: 500; padding: 10px 24px; border-radius: 8px; border: none; cursor: pointer; background-color: var(--btn-primary-bg); color: var(--btn-primary-color); transition: opacity 0.15s; line-height: 1; }
.btn-primary:hover { opacity: 0.85; }

/* Confirmação dos Dados — elementos de layout */
.conf-subsection { margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9; }
.conf-subsection__title { font-family: var(--font-sans); font-size: 11px; font-weight: 700; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 14px; }
.conf-section-separator { display: flex; align-items: center; gap: 8px; font-family: var(--font-sans); font-size: 13px; font-weight: 700; color: var(--btn-primary-bg); text-transform: uppercase; letter-spacing: 0.06em; padding: 12px 16px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; margin: 8px 0 4px; }
.conf-section-separator svg { flex-shrink: 0; }
.conf-divergencia-aviso { display: flex; align-items: flex-start; gap: 8px; padding: 10px 14px; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; font-size: 13px; color: #991b1b; margin-bottom: 14px; line-height: 1.5; }
.conf-divergencia-aviso svg { flex-shrink: 0; color: #dc2626; margin-top: 1px; }
.conf-beneficiario-bloco { border: 1px solid var(--border-color); border-radius: 8px; padding: 14px 16px; margin-bottom: 12px; }
.conf-beneficiario-titulo { font-family: var(--font-sans); font-size: 12px; font-weight: 700; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 12px; }
</style>
