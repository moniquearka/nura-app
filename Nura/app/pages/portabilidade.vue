<template>
  <AppShell :tabs="visibleTabs" :active-tab="activeTab" @tab-change="changeTab">
    <div class="page-content">

      <!-- ══ ABA: DETALHES DA SOLICITAÇÃO ══ -->
      <template v-if="activeTab === tabIndex('Detalhes da Solicitação')">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </span>
          <h2 class="page-header__title">Detalhes da Solicitação</h2>
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
            <!-- CPF -->
            <div class="form-field">
              <label class="form-label form-label--required">CPF</label>
              <input v-model="proponente.cpf" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.cpf }" placeholder="000.000.000-00" maxlength="14" @input="formatCpf" />
              <span v-if="showErrors && !proponente.cpf" class="form-error">Campo obrigatório</span>
            </div>
            <!-- Nome Completo -->
            <div class="form-field">
              <label class="form-label form-label--required">Nome Completo</label>
              <input v-model="proponente.nome" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.nome }" placeholder="Nome completo" />
              <span v-if="showErrors && !proponente.nome" class="form-error">Campo obrigatório</span>
            </div>
            <!-- Data de Nascimento -->
            <div class="form-field">
              <label class="form-label form-label--required">Data de Nascimento</label>
              <input v-model="proponente.dataNasc" type="date" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.dataNasc }" />
              <span v-if="showErrors && !proponente.dataNasc" class="form-error">Campo obrigatório</span>
            </div>
            <!-- Sexo -->
            <div class="form-field">
              <label class="form-label form-label--required">Sexo</label>
              <select v-model="proponente.genero" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.genero }">
                <option value="">Selecione...</option>
                <option>Feminino</option>
                <option>Masculino</option>
              </select>
              <span v-if="showErrors && !proponente.genero" class="form-error">Campo obrigatório</span>
            </div>
            <!-- País de Nascimento -->
            <div class="form-field">
              <label class="form-label form-label--required">País de Nascimento</label>
              <select v-model="proponente.paisNascimento" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.paisNascimento }">
                <option value="">Selecione...</option>
                <option v-for="pais in paises" :key="pais">{{ pais }}</option>
              </select>
              <span v-if="showErrors && !proponente.paisNascimento" class="form-error">Campo obrigatório</span>
            </div>
            <!-- Nacionalidade -->
            <div class="form-field">
              <label class="form-label form-label--required">Nacionalidade</label>
              <input v-model="proponente.nacionalidade" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.nacionalidade }" placeholder="Ex: Brasileira" />
              <span v-if="showErrors && !proponente.nacionalidade" class="form-error">Campo obrigatório</span>
            </div>
            <!-- Telefone -->
            <div class="form-field">
              <label class="form-label form-label--required">Telefone</label>
              <input v-model="proponente.telefone" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.telefone }" placeholder="(00) 00000-0000" maxlength="15" @input="formatTelefone" />
              <span v-if="showErrors && !proponente.telefone" class="form-error">Campo obrigatório</span>
            </div>
            <!-- E-mail -->
            <div class="form-field">
              <label class="form-label form-label--required">E-mail</label>
              <input v-model="proponente.email" type="email" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.email }" placeholder="email@exemplo.com" />
              <span v-if="showErrors && !proponente.email" class="form-error">Campo obrigatório</span>
            </div>
            <!-- Renda Mensal -->
            <div class="form-field">
              <label class="form-label form-label--required">Renda Mensal</label>
              <input v-model="proponente.renda" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.renda }" placeholder="R$ 0,00" @input="formatMoeda($event, 'renda')" />
              <span v-if="showErrors && !proponente.renda" class="form-error">Campo obrigatório</span>
            </div>
            <!-- Profissão (busca com autocomplete) -->
            <div class="form-field">
              <label class="form-label form-label--required">Profissão</label>
              <div class="autocomplete-wrapper">
                <input v-model="profissaoQuery" type="text" class="form-input autocomplete-input" :class="{ 'form-input--error': showErrors && !proponente.profissao }" placeholder="Digite para buscar..." @input="onProfissaoInput" @blur="hideProfissaoDropdownDelayed" @focus="onProfissaoInput" />
                <span class="autocomplete-arrow">▼</span>
                <div v-if="showProfissaoDropdown && profissaoResults.length > 0" class="autocomplete-dropdown">
                  <button v-for="p in profissaoResults" :key="p" class="autocomplete-item" @mousedown.prevent="selectProfissao(p)">{{ p }}</button>
                </div>
              </div>
              <span v-if="showErrors && !proponente.profissao" class="form-error">Campo obrigatório</span>
            </div>
            <!-- Especificação da Profissão (quando "Outros (Especificar)" selecionado) -->
            <template v-if="proponente.profissao === 'Outros (Especificar)'">
              <div class="form-field">
                <label class="form-label form-label--required">Especificação da Profissão</label>
                <input v-model="proponente.profissaoEspecificacao" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.profissaoEspecificacao }" placeholder="Descreva a profissão" />
                <span v-if="showErrors && !proponente.profissaoEspecificacao" class="form-error">Campo obrigatório</span>
              </div>
            </template>
            <!-- Origem da Renda -->
            <div class="form-field">
              <label class="form-label form-label--required">Origem da Renda</label>
              <select v-model="proponente.origemRenda" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.origemRenda }">
                <option value="">Selecione</option>
                <option>Salário CLT</option>
                <option>Salário Estatutário</option>
                <option>Pró-labore</option>
                <option>Atividade Autônoma</option>
                <option>Atividade Empresarial</option>
                <option>Aposentadoria / Pensão</option>
                <option>Aluguel / Renda Passiva</option>
                <option>Investimentos</option>
                <option>Herança / Doação</option>
                <option>Outros</option>
              </select>
              <span v-if="showErrors && !proponente.origemRenda" class="form-error">Campo obrigatório</span>
            </div>
            <!-- Especificação da Origem de Renda (quando "Outros" selecionado) -->
            <template v-if="proponente.origemRenda === 'Outros'">
              <div class="form-field">
                <label class="form-label form-label--required">Especificação da Origem de Renda</label>
                <input v-model="proponente.origemRendaEspecificacao" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.origemRendaEspecificacao }" placeholder="Descreva a origem da renda" />
                <span v-if="showErrors && !proponente.origemRendaEspecificacao" class="form-error">Campo obrigatório</span>
              </div>
            </template>
            <!-- Patrimônio -->
            <div class="form-field">
              <label class="form-label form-label--required">Patrimônio</label>
              <input v-model="proponente.patrimonio" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.patrimonio }" placeholder="R$ 0,00" @input="formatMoeda($event, 'patrimonio')" />
              <span v-if="showErrors && !proponente.patrimonio" class="form-error">Campo obrigatório</span>
            </div>
          </div>

          <!-- É US Person? (col 1 = alinhado com CPF/Gênero/E-mail) + NIF (col 2 = alinhado com Nome/Nacionalidade/Renda) -->
          <div class="proponente-flags">
            <div class="field-grid field-grid--3" style="margin-top:0;">
              <div class="form-field" style="grid-column:1">
                <label class="form-label form-label--required">É US Person?</label>
                <div class="radio-group-h" style="margin-top:4px;">
                  <label class="radio-label-h"><input type="radio" v-model="proponente.usPerson" value="sim" class="radio-input" /><span>Sim</span></label>
                  <label class="radio-label-h"><input type="radio" v-model="proponente.usPerson" value="nao" class="radio-input" /><span>Não</span></label>
                </div>
                <span v-if="showErrors && !proponente.usPerson" class="form-error">Campo obrigatório</span>
              </div>
              <div class="form-field" style="grid-column:2" v-if="proponente.usPerson === 'sim'">
                <label class="form-label form-label--required">NIF (Número de Identificação Fiscal)</label>
                <input v-model="proponente.nif" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.nif }" placeholder="Digite o NIF" />
                <span v-if="showErrors && !proponente.nif" class="form-error">Campo obrigatório</span>
              </div>
            </div>
          </div>

          <!-- Dados Residenciais -->
          <div class="proponente-residencial">
            <h4 class="subsection-divider-title">Dados Residenciais</h4>
            <div class="field-grid field-grid--3">
              <div class="form-field">
                <label class="form-label form-label--required">CEP</label>
                <input v-model="proponente.cep" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.cep }" placeholder="00000-000" maxlength="9" @input="onCepInput" />
                <span v-if="showErrors && !proponente.cep" class="form-error">Campo obrigatório</span>
              </div>
              <div class="form-field" style="grid-column: span 2">
                <label class="form-label">Rua</label>
                <input v-model="proponente.rua" type="text" class="form-input" placeholder="Nome da rua" />
              </div>
              <div class="form-field">
                <label class="form-label form-label--required">Número</label>
                <input v-model="proponente.numero" type="text" class="form-input" :class="{ 'form-input--error': showErrors && !proponente.numero }" placeholder="123" />
                <span v-if="showErrors && !proponente.numero" class="form-error">Campo obrigatório</span>
              </div>
              <div class="form-field">
                <label class="form-label">Complemento</label>
                <input v-model="proponente.complemento" type="text" class="form-input" placeholder="Apto, sala, etc." />
              </div>
              <div class="form-field">
                <label class="form-label">Bairro</label>
                <input v-model="proponente.bairro" type="text" class="form-input" placeholder="Bairro" />
              </div>
              <div class="form-field">
                <label class="form-label">Município</label>
                <input v-model="proponente.municipio" type="text" class="form-input" placeholder="Cidade" />
              </div>
              <div class="form-field">
                <label class="form-label">Estado</label>
                <select v-model="proponente.estado" class="form-input">
                  <option value="">Selecione</option>
                  <option v-for="uf in ufs" :key="uf">{{ uf }}</option>
                </select>
              </div>
              <!-- País de Residência -->
              <div class="form-field">
                <label class="form-label">País de Residência</label>
                <select v-model="proponente.paisResidencia" class="form-input">
                  <option value="">Selecione...</option>
                  <option v-for="pais in paises" :key="pais">{{ pais }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Defina o Tipo de Solicitação -->
        <div class="section-card">
          <h3 class="section-card__title">Defina o Tipo de Solicitação</h3>

          <div class="form-field mb-20">
            <label class="flag-question form-label--required" style="margin-bottom:10px;display:block;">Realizar Portabilidade?</label>
            <div class="flag-radio-group">
              <label class="flag-radio-label">
                <input type="radio" v-model="comPortabilidade" value="sim" class="radio-input" />
                <span>Sim</span>
              </label>
              <label class="flag-radio-label">
                <input type="radio" v-model="comPortabilidade" value="nao" class="radio-input" />
                <span>Não</span>
              </label>
            </div>
          </div>

          <template v-if="comPortabilidade === 'sim'">
            <div class="form-field mt-20">
              <label class="form-label" style="margin-bottom:10px;">Selecione o Tipo de Portabilidade</label>
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
          </template>
        </div>

        <!-- Dados da Portabilidade (condicional) -->
        <template v-if="comPortabilidade === 'sim'">
          <div class="section-card">
            <h3 class="section-card__title">Dados da Portabilidade</h3>
            <div class="form-grid">
              <div class="form-field">
                <label class="form-label form-label--required">Processo SUSEP</label>
                <input v-model="form.susep" type="text" placeholder="Digite o número SUSEP" class="form-input" :class="{ 'form-input--error': showErrors && !form.susep }" />
                <span v-if="showErrors && !form.susep" class="form-error">Campo obrigatório</span>
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
                    <input type="radio" v-model="form.tipoPlano" :value="tp" class="radio-input" @change="syncTipoPlanoFromPortabilidade(tp)" />
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
            <h3 class="section-card__title">
              Configurações da Transferência
              <span class="required-badge">Obrigatório</span>
            </h3>
            <div class="form-grid">
              <div class="form-field">
                <label class="form-label-radio form-label--required">Tipo de Transferência</label>
                <div class="radio-group-h">
                  <label v-for="t in ['Total','Parcial']" :key="t" class="radio-label-h">
                    <input type="radio" v-model="form.tipoTransferencia" :value="t" class="radio-input" />
                    <span>{{ t }}</span>
                  </label>
                </div>
                <span v-if="showErrors && !form.tipoTransferencia" class="form-error">Campo obrigatório</span>
              </div>
              <div class="form-field">
                <label class="form-label" :class="{ 'form-label--required': form.tipoTransferencia === 'Parcial' }">Valor da Portabilidade</label>
                <input v-model="form.valorPortabilidade" type="text" placeholder="R$ 0,00" class="form-input" :disabled="form.tipoTransferencia === 'Total'" :class="{ 'form-input--disabled': form.tipoTransferencia === 'Total', 'form-input--error': showErrors && form.tipoTransferencia === 'Parcial' && !form.valorPortabilidade }" />
                <span v-if="showErrors && form.tipoTransferencia === 'Parcial' && !form.valorPortabilidade" class="form-error">Campo obrigatório quando Parcial</span>
              </div>
            </div>
          </div>
        </template>

        <!-- Dados do Plano -->
        <div class="section-card">
          <h3 class="section-card__title">Dados do Plano</h3>

          <!-- Idade sozinha na primeira linha -->
          <div class="form-field" style="max-width:220px;margin-bottom:16px;">
            <label class="form-label form-label--required">Idade que deseja se aposentar</label>
            <input v-model="plano.idadeAposentadoria" type="number" min="18" max="99" placeholder="Ex: 60" class="form-input" :class="{ 'form-input--error': showErrors && !plano.idadeAposentadoria }" />
            <span v-if="showErrors && !plano.idadeAposentadoria" class="form-error">Campo obrigatório</span>
          </div>

          <!-- Caixa com Tipo do Plano + Contribuição Mensal + Aporte Inicial na mesma linha -->
          <div class="plano-inner-box">
            <div class="form-grid form-grid--3col">
              <div class="form-field">
                <label class="form-label-radio form-label--required">Tipo do Plano</label>
                <div class="radio-group-h" style="margin-top:4px;">
                  <label v-for="tp in ['PGBL','VGBL']" :key="tp" class="radio-label-h">
                    <input type="radio" v-model="plano.tipoPlano" :value="tp" class="radio-input" @change="syncTipoPlanoFromDadosPlano(tp)" />
                    <span>{{ tp }}</span>
                  </label>
                </div>
                <span v-if="showErrors && !plano.tipoPlano" class="form-error">Campo obrigatório</span>
              </div>
              <div class="form-field">
                <!-- Quando Portabilidade=Não: obrigatório se Aporte Inicial também estiver vazio -->
                <label class="form-label" :class="{ 'form-label--required': comPortabilidade === 'sim' }">Contribuição Mensal</label>
                <input v-model="plano.contribuicaoMensal" type="text" placeholder="R$ 0,00" class="form-input"
                  :class="{ 'form-input--error': showErrors && comPortabilidade === 'sim' && !plano.contribuicaoMensal }"
                  @input="formatMoedaPlano($event, 'contribuicaoMensal')" />
                <span v-if="showErrors && comPortabilidade === 'sim' && !plano.contribuicaoMensal" class="form-error">Campo obrigatório</span>
              </div>
              <div class="form-field">
                <label class="form-label">Valor do Aporte Inicial</label>
                <input v-model="plano.aporteInicial" type="text" placeholder="R$ 0,00" class="form-input" @input="formatMoedaPlano($event, 'aporteInicial')" />
              </div>
            </div>
          </div>

          <!-- Erro combinado: Portabilidade=Não e nenhum valor preenchido -->
          <div v-if="showErrors && comPortabilidade === 'nao' && !plano.contribuicaoMensal && !plano.aporteInicial"
            style="margin-top: -8px; margin-bottom: 12px; font-size: 12px; color: #ef4444;">
            Preencha ao menos a Contribuição Mensal ou o Valor do Aporte Inicial.
          </div>

          <!-- Seleção de Fundos -->
          <div class="form-field form-field--full mt-20">
            <div class="selecao-fundos-box">
              <div class="selecao-fundos-box__header">SELEÇÃO DE FUNDOS</div>
              <div class="selecao-fundos-box__body">
                <div class="form-field">
                  <label class="form-label form-label--required">Buscar Fundos Disponíveis</label>
                  <button class="btn-buscar-fundos" @click="abrirPopupFundos(plano)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    Nome ou CNPJ do Fundo
                  </button>
                  <span class="form-hint">{{ fundosDisponiveis.length }} fundos disponíveis</span>
                  <span v-if="showErrors && plano.fundosSelecionados.length === 0" class="form-error">Selecione ao menos 1 fundo</span>
                </div>

                <div v-if="plano.fundosSelecionados.length > 0" class="fundos-selecionados-list">
                  <label class="form-label" style="margin-bottom: 8px; display: block;">Fundos Selecionados</label>
                  <div v-for="(fs, fi) in plano.fundosSelecionados" :key="fi" class="fund-card-aliaplan">
                    <!-- Linha 1: Nome | Contribuição Mensal (condicional) | Botão remover -->
                    <div class="fund-card-aliaplan__nome-col">
                      <div class="fund-card-aliaplan__nome">{{ fs.nome }}</div>
                    </div>
                    <!-- Contribuição Mensal: sempre visível quando Portabilidade=Não; quando Sim, só se contribuicaoMensal preenchido -->
                    <div v-if="comPortabilidade !== 'sim' || plano.contribuicaoMensal" class="fund-card-aliaplan__contrib-col">
                      <span class="fund-card-aliaplan__section-label">Contribuição Mensal:</span>
                      <div class="fund-card-aliaplan__field-pair">
                        <span class="fund-card-aliaplan__field-label">Valor Atribuído</span>
                        <input v-model="fs.valorContrib" type="text" class="fund-card-aliaplan__input" placeholder="0,00" />
                      </div>
                      <div class="fund-card-aliaplan__field-pair">
                        <span class="fund-card-aliaplan__field-label">Percentual Atribuído</span>
                        <div class="fund-card-aliaplan__pct-wrap">
                          <input v-model="fs.percContrib" type="text" class="fund-card-aliaplan__pct-input" placeholder="0" />
                          <span class="fund-card-aliaplan__pct-sign">%</span>
                        </div>
                      </div>
                    </div>
                    <button class="btn-remove-fund" @click="removerFundoPlano(fi)" style="grid-column:3;grid-row:1;align-self:start;margin-top:2px;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <!-- Linha 2: CNPJ + badge + Aporte Inicial (condicional) -->
                    <div class="fund-card-aliaplan__cnpj-row">
                      <div style="display:flex;align-items:center;gap:6px;">
                        <span class="fund-card-aliaplan__cnpj">{{ fs.cnpj }}</span>
                        <span v-if="fs.qualificado" class="badge-qualificado">QUALIFICADO</span>
                      </div>
                    </div>
                    <!-- Aporte Inicial: sempre visível quando Portabilidade=Não; quando Sim, só se aporteInicial preenchido -->
                    <div v-if="comPortabilidade !== 'sim' || plano.aporteInicial" class="fund-card-aliaplan__aporte-row">
                      <span class="fund-card-aliaplan__section-label">Aporte Inicial:</span>
                      <div class="fund-card-aliaplan__field-pair">
                        <span class="fund-card-aliaplan__field-label">Valor Atribuído</span>
                        <input v-model="fs.valorAporte" type="text" class="fund-card-aliaplan__input" placeholder="0,00" />
                      </div>
                      <div class="fund-card-aliaplan__field-pair">
                        <span class="fund-card-aliaplan__field-label">Percentual Atribuído</span>
                        <div class="fund-card-aliaplan__pct-wrap">
                          <input v-model="fs.percAporte" type="text" class="fund-card-aliaplan__pct-input" placeholder="0" />
                          <span class="fund-card-aliaplan__pct-sign">%</span>
                        </div>
                      </div>
                    </div>
                    <!-- Linha 3: Meta info -->
                    <div class="fund-card-aliaplan__meta-row">
                      <span>Taxa Máx. Adm.: <strong>{{ fs.taxaAdm }}</strong></span>
                      <span>Rentabilidade: <strong>{{ fs.rentabilidade || '—' }}</strong></span>
                      <span>Estratégia: <strong>{{ fs.estrategia }}</strong></span>
                      <span v-if="fs.riscoLabel">Grau de Risco: <strong>{{ fs.riscoLabel }}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="page-footer">
          <button class="btn-primary" @click="advanceFromDetalhes">Continuar</button>
        </div>
      </template>

      <!-- ══ ABA: BENEFICIÁRIOS ══ -->
      <template v-if="activeTab === tabIndex('Beneficiários')">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <h2 class="page-header__title">Beneficiários</h2>
        </div>

        <div class="section-card">
          <div v-for="(ben, i) in beneficiarios" :key="i" class="beneficiary-card">
            <div class="beneficiary-card__header">
              <span class="beneficiary-card__title">Beneficiário {{ i + 1 }}</span>
              <button v-if="beneficiarios.length > 1" class="btn-remove" @click="removeBen(i)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div class="form-grid">
              <div class="form-field">
                <label class="form-label">Nome Completo</label>
                <input v-model="ben.nome" type="text" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Data de Nascimento</label>
                <input v-model="ben.dataNasc" type="date" class="form-input" />
              </div>
              <div class="form-field">
                <label class="form-label">Grau de Parentesco</label>
                <select v-model="ben.parentesco" class="form-input">
                  <option value="">Selecione</option>
                  <option>Cônjuge</option><option>Filho(a)</option><option>Pai/Mãe</option><option>Irmão/Irmã</option><option>Outro</option>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label">Percentual (%)</label>
                <input v-model.number="ben.percentual" type="number" class="form-input" placeholder="0" min="0" max="100" />
              </div>
            </div>
          </div>
          <div v-if="somaPercentual !== 100 && beneficiarios.some(b => b.nome)" class="alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            A soma dos percentuais deve ser igual a 100%. Atualmente: {{ somaPercentual }}%
          </div>
          <button v-if="beneficiarios.length < 20" class="btn-add" @click="addBen">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
            Adicionar Beneficiário
          </button>
          <p class="disclaimer-note">Na ausência de designação de beneficiários, a indenização será paga de acordo com a legislação aplicável.</p>
        </div>

        <div class="page-footer">
          <button class="btn-primary" @click="changeTab(tabIndex('Formas de Pagamento'))">Continuar</button>
        </div>
      </template>

      <!-- ══ ABA: FORMAS DE PAGAMENTO ══ -->
      <template v-if="activeTab === tabIndex('Formas de Pagamento')">
        <div class="page-header">
          <span class="page-header__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </span>
          <h2 class="page-header__title">Formas de Pagamento</h2>
        </div>

        <div class="section-card">
          <!-- Responsável Financeiro -->
          <div class="resp-financeiro-row mb-16">
            <span class="flag-question">Dados do Responsável Financeiro serão os mesmos aos Dados do Proponente?</span>
            <div class="radio-group-inline">
              <label class="radio-item"><input v-model="pagamento.respFinanceiro" type="radio" value="sim" class="radio-input" /><span class="radio-label">Sim</span></label>
              <label class="radio-item"><input v-model="pagamento.respFinanceiro" type="radio" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
            </div>
          </div>

          <template v-if="pagamento.respFinanceiro === 'nao'">
            <div class="section-card mb-16" style="background:#f8fafc;padding:16px;">
              <h4 class="subsection-title" style="margin-top:0">Dados do Responsável Financeiro</h4>
              <div class="field-grid field-grid--3">
                <!-- CPF -->
                <div class="form-field">
                  <label class="form-label">CPF</label>
                  <input v-model="pagamento.rfCpf" type="text" class="form-input" placeholder="000.000.000-00" maxlength="14" @input="formatRfCpf" />
                </div>
                <!-- Nome Completo -->
                <div class="form-field">
                  <label class="form-label">Nome Completo</label>
                  <input v-model="pagamento.rfNome" type="text" class="form-input" />
                </div>
                <!-- Data de Nascimento -->
                <div class="form-field">
                  <label class="form-label">Data de Nascimento</label>
                  <input v-model="pagamento.rfDataNasc" type="date" class="form-input" />
                </div>
                <!-- Sexo -->
                <div class="form-field">
                  <label class="form-label">Sexo</label>
                  <select v-model="pagamento.rfGenero" class="form-input">
                    <option value="">Selecione...</option>
                    <option>Feminino</option>
                    <option>Masculino</option>
                  </select>
                </div>
                <!-- País de Nascimento -->
                <div class="form-field">
                  <label class="form-label">País de Nascimento</label>
                  <select v-model="pagamento.rfPaisNascimento" class="form-input">
                    <option value="">Selecione...</option>
                    <option v-for="pais in paises" :key="pais">{{ pais }}</option>
                  </select>
                </div>
                <!-- Nacionalidade -->
                <div class="form-field">
                  <label class="form-label">Nacionalidade</label>
                  <input v-model="pagamento.rfNacionalidade" type="text" class="form-input" placeholder="Ex: Brasileira" />
                </div>
                <!-- Telefone -->
                <div class="form-field">
                  <label class="form-label">Telefone</label>
                  <input v-model="pagamento.rfTelefone" type="text" class="form-input" placeholder="(00) 00000-0000" maxlength="15" @input="formatRfTelefone" />
                </div>
                <!-- E-mail -->
                <div class="form-field">
                  <label class="form-label">E-mail</label>
                  <input v-model="pagamento.rfEmail" type="email" class="form-input" />
                </div>
                <!-- Renda Mensal -->
                <div class="form-field">
                  <label class="form-label">Renda Mensal</label>
                  <input v-model="pagamento.rfRenda" type="text" class="form-input" placeholder="R$ 0,00" @input="formatRfMoeda($event, 'rfRenda')" />
                </div>
                <!-- Profissão -->
                <div class="form-field">
                  <label class="form-label">Profissão</label>
                  <div class="autocomplete-wrapper">
                    <input v-model="rfProfissaoQuery" type="text" class="form-input autocomplete-input" placeholder="Digite para buscar..." @input="onRfProfissaoInput" @blur="hideRfProfissaoDropdownDelayed" @focus="onRfProfissaoInput" />
                    <span class="autocomplete-arrow">▼</span>
                    <div v-if="showRfProfissaoDropdown && rfProfissaoResults.length > 0" class="autocomplete-dropdown">
                      <button v-for="p in rfProfissaoResults" :key="p" class="autocomplete-item" @mousedown.prevent="selectRfProfissao(p)">{{ p }}</button>
                    </div>
                  </div>
                </div>
                <!-- Especificação da Profissão RF -->
                <template v-if="pagamento.rfProfissao === 'Outros (Especificar)'">
                  <div class="form-field">
                    <label class="form-label">Especificação da Profissão</label>
                    <input v-model="pagamento.rfProfissaoEspecificacao" type="text" class="form-input" placeholder="Descreva a profissão" />
                  </div>
                </template>
                <!-- Origem da Renda -->
                <div class="form-field">
                  <label class="form-label">Origem da Renda</label>
                  <select v-model="pagamento.rfOrigemRenda" class="form-input">
                    <option value="">Selecione</option>
                    <option>Salário CLT</option>
                    <option>Salário Estatutário</option>
                    <option>Pró-labore</option>
                    <option>Atividade Autônoma</option>
                    <option>Atividade Empresarial</option>
                    <option>Aposentadoria / Pensão</option>
                    <option>Aluguel / Renda Passiva</option>
                    <option>Investimentos</option>
                    <option>Herança / Doação</option>
                    <option>Outros</option>
                  </select>
                </div>
                <!-- Especificação da Origem de Renda RF -->
                <template v-if="pagamento.rfOrigemRenda === 'Outros'">
                  <div class="form-field">
                    <label class="form-label">Especificação da Origem de Renda</label>
                    <input v-model="pagamento.rfOrigemRendaEspecificacao" type="text" class="form-input" placeholder="Descreva a origem da renda" />
                  </div>
                </template>
                <!-- Patrimônio -->
                <div class="form-field">
                  <label class="form-label">Patrimônio</label>
                  <input v-model="pagamento.rfPatrimonio" type="text" class="form-input" placeholder="R$ 0,00" @input="formatRfMoeda($event, 'rfPatrimonio')" />
                </div>
                <!-- É US Person? + NIF na mesma linha -->
                <div class="form-field form-field--full">
                  <div class="form-grid" style="margin-top:0;">
                    <div class="form-field">
                      <label class="form-label">É US Person?</label>
                      <div class="radio-group-h" style="margin-top:4px;">
                        <label class="radio-label-h"><input type="radio" v-model="pagamento.rfUsPerson" value="sim" class="radio-input" /><span>Sim</span></label>
                        <label class="radio-label-h"><input type="radio" v-model="pagamento.rfUsPerson" value="nao" class="radio-input" /><span>Não</span></label>
                      </div>
                    </div>
                    <div class="form-field" v-if="pagamento.rfUsPerson === 'sim'">
                      <label class="form-label">NIF (Número de Identificação Fiscal)</label>
                      <input v-model="pagamento.rfNif" type="text" class="form-input" placeholder="Digite o NIF" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Endereço de Cobrança -->
          <div class="resp-financeiro-row mb-16">
            <span class="flag-question">O Endereço de Cobrança será o mesmo informado nos Dados do Proponente?</span>
            <div class="radio-group-inline">
              <label class="radio-item"><input v-model="pagamento.enderecoCobranca" type="radio" value="sim" class="radio-input" /><span class="radio-label">Sim</span></label>
              <label class="radio-item"><input v-model="pagamento.enderecoCobranca" type="radio" value="nao" class="radio-input" /><span class="radio-label">Não</span></label>
            </div>
          </div>
          <template v-if="pagamento.enderecoCobranca === 'nao'">
            <div class="section-card mb-16" style="background:#f8fafc;padding:16px;">
              <h4 class="subsection-title" style="margin-top:0">Endereço de Cobrança</h4>
              <div class="field-grid field-grid--3">
                <div class="form-field">
                  <label class="form-label">CEP</label>
                  <input v-model="pagamento.cobCep" type="text" class="form-input" placeholder="00000-000" maxlength="9" @input="onCepInputPag" />
                </div>
                <div class="form-field" style="grid-column: span 2">
                  <label class="form-label">Rua</label>
                  <input v-model="pagamento.cobRua" type="text" class="form-input" placeholder="Nome da rua" />
                </div>
                <div class="form-field">
                  <label class="form-label">Número</label>
                  <input v-model="pagamento.cobNumero" type="text" class="form-input" placeholder="123" />
                </div>
                <div class="form-field">
                  <label class="form-label">Complemento</label>
                  <input v-model="pagamento.cobComplemento" type="text" class="form-input" placeholder="Apto, sala, etc." />
                </div>
                <div class="form-field">
                  <label class="form-label">Bairro</label>
                  <input v-model="pagamento.cobBairro" type="text" class="form-input" placeholder="Bairro" />
                </div>
                <div class="form-field">
                  <label class="form-label">Município</label>
                  <input v-model="pagamento.cobMunicipio" type="text" class="form-input" placeholder="Cidade" />
                </div>
                <div class="form-field">
                  <label class="form-label">Estado</label>
                  <select v-model="pagamento.cobEstado" class="form-input">
                    <option value="">Selecione</option>
                    <option v-for="uf in ufs" :key="uf">{{ uf }}</option>
                  </select>
                </div>
                <!-- País de Residência -->
                <div class="form-field">
                  <label class="form-label">País de Residência</label>
                  <select v-model="pagamento.cobPaisResidencia" class="form-input">
                    <option value="">Selecione...</option>
                    <option v-for="pais in paises" :key="pais">{{ pais }}</option>
                  </select>
                </div>
              </div>
            </div>
          </template>

          <hr class="opcoes-divider" />
          <p class="opcoes-title">Opções Disponíveis</p>

          <div class="radio-group mb-16">
            <label class="radio-item"><input type="radio" v-model="pagamento.forma" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
            <label class="radio-item"><input type="radio" v-model="pagamento.forma" value="pix" class="radio-input" /><span class="radio-label">PIX</span></label>
            <label class="radio-item"><input type="radio" v-model="pagamento.forma" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
          </div>

          <!-- Débito em Conta Corrente -->
          <template v-if="pagamento.forma === 'debito'">
            <div class="form-grid mt-16">
              <div class="form-field">
                <label class="form-label">Banco</label>
                <div class="autocomplete-wrapper">
                  <input v-model="bancoQuery" type="text" class="form-input autocomplete-input" placeholder="Digite o nome ou código do banco..." @input="onBancoInput" @blur="hideBancoDropdownDelayed" @focus="onBancoInput" />
                  <span class="autocomplete-arrow">▼</span>
                  <div v-if="showBancoDropdown && bancoResults.length > 0" class="autocomplete-dropdown">
                    <button v-for="b in bancoResults" :key="b.codigo" class="autocomplete-item" @mousedown.prevent="selectBanco(b)">{{ b.codigo }} - {{ b.nome }}</button>
                  </div>
                </div>
              </div>
              <div class="form-field">
                <label class="form-label">Agência</label>
                <input v-model="pagamento.agencia" type="text" class="form-input" placeholder="0000-0" maxlength="6" @input="formatAgencia" />
              </div>
              <div class="form-field">
                <label class="form-label">Conta Corrente</label>
                <input v-model="pagamento.contaCorrente" type="text" class="form-input" placeholder="00000000-0" maxlength="10" @input="formatContaCorrente" />
              </div>
              <div class="form-field">
                <label class="form-label">Dia de Vencimento</label>
                <select v-model="pagamento.diaVencimento" class="form-input">
                  <option value="">Selecione o dia</option>
                  <option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option>
                </select>
              </div>
            </div>
            <div class="info-box-blue mt-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>O débito será realizado automaticamente no dia selecionado de cada mês.<br />Certifique-se de que há saldo suficiente na conta para evitar problemas no processamento.<br />Caso tenha selecionado a opção de um aporte único e contribuições mensais, o primeiro débito será a soma destes valores e ocorrerá em 7 dias úteis após a conclusão da contratação da proposta.</div>
            </div>
          </template>

          <!-- PIX -->
          <template v-if="pagamento.forma === 'pix'">
            <div class="info-box-blue mt-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                Somente a primeira cobrança será realizada via PIX. As demais cobranças serão realizadas em recorrência via {{ pagamento.pixRecorrencia === 'debito' ? 'Débito em Conta Corrente' : pagamento.pixRecorrencia === 'boleto' ? 'Boleto Bancário' : '—' }}.<br />
                O código da chave PIX será gerado após a conclusão da contratação da proposta.<br />
                Caso tenha selecionado a opção de um aporte único e contribuições mensais, a primeira cobrança será a soma destes valores.
              </div>
            </div>
            <div class="mt-16">
              <p class="opcoes-title">Modalidade das Parcelas Seguintes</p>
              <div class="radio-group mb-16">
                <label class="radio-item"><input type="radio" v-model="pagamento.pixRecorrencia" value="debito" class="radio-input" /><span class="radio-label">Débito em Conta Corrente</span></label>
                <label class="radio-item"><input type="radio" v-model="pagamento.pixRecorrencia" value="boleto" class="radio-input" /><span class="radio-label">Boleto Bancário</span></label>
              </div>
              <!-- Débito em Conta Corrente para parcelas seguintes -->
              <template v-if="pagamento.pixRecorrencia === 'debito'">
                <div class="form-grid mt-16">
                  <div class="form-field">
                    <label class="form-label">Banco</label>
                    <div class="autocomplete-wrapper">
                      <input v-model="bancoQuery" type="text" class="form-input autocomplete-input" placeholder="Digite o nome ou código do banco..." @input="onBancoInput" @blur="hideBancoDropdownDelayed" @focus="onBancoInput" />
                      <span class="autocomplete-arrow">▼</span>
                      <div v-if="showBancoDropdown && bancoResults.length > 0" class="autocomplete-dropdown">
                        <button v-for="b in bancoResults" :key="b.codigo" class="autocomplete-item" @mousedown.prevent="selectBanco(b)">{{ b.codigo }} - {{ b.nome }}</button>
                      </div>
                    </div>
                  </div>
                  <div class="form-field">
                    <label class="form-label">Agência</label>
                    <input v-model="pagamento.agencia" type="text" class="form-input" placeholder="0000-0" maxlength="6" @input="formatAgencia" />
                  </div>
                  <div class="form-field">
                    <label class="form-label">Conta Corrente</label>
                    <input v-model="pagamento.contaCorrente" type="text" class="form-input" placeholder="00000000-0" maxlength="10" @input="formatContaCorrente" />
                  </div>
                  <div class="form-field">
                    <label class="form-label">Dia de Vencimento</label>
                    <select v-model="pagamento.diaVencimento" class="form-input">
                      <option value="">Selecione o dia</option>
                      <option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option>
                    </select>
                  </div>
                </div>
              </template>
              <!-- Boleto para parcelas seguintes -->
              <template v-if="pagamento.pixRecorrencia === 'boleto'">
                <div class="form-grid mt-16">
                  <div class="form-field">
                    <label class="form-label">Dia de Vencimento</label>
                    <select v-model="pagamento.diaVencimento" class="form-input">
                      <option value="">Selecione o dia</option>
                      <option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option>
                    </select>
                  </div>
                  <div class="form-field"></div>
                </div>
                <div class="info-box-blue mt-16">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>Atenção: Após a emissão do certificado, a seguradora enviará o boleto em até 5 dias úteis para o e-mail cadastrado. Fique atento à caixa de Spam.</div>
                </div>
              </template>
            </div>
          </template>

          <!-- Boleto Bancário -->
          <template v-if="pagamento.forma === 'boleto'">
            <div class="form-grid mt-16">
              <div class="form-field">
                <label class="form-label">Dia de Vencimento</label>
                <select v-model="pagamento.diaVencimento" class="form-input">
                  <option value="">Selecione o dia</option>
                  <option v-for="d in [5,10,15,20,25]" :key="d" :value="`Dia ${d}`">Dia {{ d }}</option>
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
            <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ proponente.dataNasc ? new Date(proponente.dataNasc + 'T12:00:00').toLocaleDateString('pt-BR') : '—' }}</span></div>
            <div class="field-item"><span class="field-label">Sexo</span><span class="field-value">{{ proponente.genero || '—' }}</span></div>
            <div class="field-item"><span class="field-label">País de Nascimento</span><span class="field-value">{{ proponente.paisNascimento || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Nacionalidade</span><span class="field-value">{{ proponente.nacionalidade || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">{{ proponente.telefone || '—' }}</span></div>
            <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">{{ proponente.email || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">{{ proponente.renda || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Profissão</span><span class="field-value">{{ proponente.profissao || '—' }}</span></div>
            <template v-if="proponente.profissao === 'Outros (Especificar)'">
              <div class="field-item"><span class="field-label">Especificação da Profissão</span><span class="field-value">{{ proponente.profissaoEspecificacao || '—' }}</span></div>
            </template>
            <div class="field-item"><span class="field-label">Origem da Renda</span><span class="field-value">{{ proponente.origemRenda || '—' }}</span></div>
            <template v-if="proponente.origemRenda === 'Outros'">
              <div class="field-item"><span class="field-label">Especificação da Origem de Renda</span><span class="field-value">{{ proponente.origemRendaEspecificacao || '—' }}</span></div>
            </template>
            <div class="field-item"><span class="field-label">Patrimônio</span><span class="field-value">{{ proponente.patrimonio || '—' }}</span></div>
            <div class="field-item"><span class="field-label">É US Person?</span><span class="field-value">{{ proponente.usPerson === 'sim' ? 'Sim' : proponente.usPerson === 'nao' ? 'Não' : '—' }}</span></div>
            <template v-if="proponente.usPerson === 'sim'">
              <div class="field-item"><span class="field-label">NIF</span><span class="field-value">{{ proponente.nif || '—' }}</span></div>
            </template>
          </div>
          <div class="conf-subsection">
            <div class="conf-subsection__title">Dados Residenciais</div>
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">CEP</span><span class="field-value">{{ proponente.cep || '—' }}</span></div>
              <div class="field-item" style="grid-column:span 2"><span class="field-label">Rua</span><span class="field-value">{{ proponente.rua || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Número</span><span class="field-value">{{ proponente.numero || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Complemento</span><span class="field-value">{{ proponente.complemento || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Bairro</span><span class="field-value">{{ proponente.bairro || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Município</span><span class="field-value">{{ proponente.municipio || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Estado</span><span class="field-value">{{ proponente.estado || '—' }}</span></div>
              <div class="field-item"><span class="field-label">País de Residência</span><span class="field-value">{{ proponente.paisResidencia || '—' }}</span></div>
            </div>
          </div>
        </div>

        <!-- Tipo de Solicitação -->
        <div class="section-card">
          <h3 class="section-card__title">Tipo de Solicitação</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Com Portabilidade Atrelada?</span><span class="field-value">{{ comPortabilidade === 'sim' ? 'Sim' : comPortabilidade === 'nao' ? 'Não' : '—' }}</span></div>
            <template v-if="comPortabilidade === 'sim'">
              <div class="field-item"><span class="field-label">Tipo de Portabilidade</span><span class="field-value">{{ tipoPortabilidade === 'externa' ? 'De outra instituição para a Nura' : '—' }}</span></div>
            </template>
          </div>
        </div>

        <!-- Dados da Portabilidade (se sim) -->
        <template v-if="comPortabilidade === 'sim'">
          <div class="section-card">
            <h3 class="section-card__title">Dados da Portabilidade</h3>
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">Processo SUSEP</span><span class="field-value">{{ form.susep || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Seguradora de Origem</span><span class="field-value">{{ form.seguradora || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Nº do Certificado/Apólice</span><span class="field-value">{{ form.certificado || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Nome do Plano</span><span class="field-value">{{ form.nomePlano || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Tipo do Plano</span><span class="field-value">{{ form.tipoPlano || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Regime Tributário</span><span class="field-value">{{ form.regime || '—' }}</span></div>
              <div class="field-item"><span class="field-label">CNPJ do Fundo</span><span class="field-value">{{ form.cnpjFundo || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Situação do Regime</span><span class="field-value">{{ form.situacaoRegime || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Tipo de Transferência</span><span class="field-value">{{ form.tipoTransferencia || '—' }}</span></div>
              <div v-if="form.tipoTransferencia === 'Parcial'" class="field-item"><span class="field-label">Valor da Portabilidade</span><span class="field-value">{{ form.valorPortabilidade || '—' }}</span></div>
            </div>
          </div>
        </template>

        <!-- Dados do Plano -->
        <div class="section-card">
          <h3 class="section-card__title">Dados do Plano — Previdência</h3>
          <div class="field-grid field-grid--3">
            <div class="field-item"><span class="field-label">Idade de Aposentadoria</span><span class="field-value">{{ plano.idadeAposentadoria ? plano.idadeAposentadoria + ' anos' : '—' }}</span></div>
            <div class="field-item"><span class="field-label">Contribuição Mensal</span><span class="field-value">{{ plano.contribuicaoMensal || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Valor do Aporte Inicial</span><span class="field-value">{{ plano.aporteInicial || '—' }}</span></div>
            <div class="field-item"><span class="field-label">Tipo do Plano</span><span class="field-value">{{ plano.tipoPlano || '—' }}</span></div>
          </div>
          <div v-if="plano.fundosSelecionados.length > 0" class="mt-16">
            <label class="form-label" style="margin-bottom: 8px; display: block;">Fundos Selecionados</label>
            <div v-for="(fs, fi) in plano.fundosSelecionados" :key="fi" class="fund-card mb-8">
              <div class="fund-card__header">
                <div>
                  <div class="fund-card__name">{{ fs.nome }}</div>
                  <div class="fund-card__cnpj">{{ fs.cnpj }}</div>
                </div>
              </div>
              <div class="fund-card__body">
                <div class="fund-card__row">
                  <span class="fund-card__label">CONTRIBUIÇÃO MENSAL:</span>
                  <span class="fund-card__text">Valor Atribuído <strong>{{ fs.valorContrib || '—' }}</strong></span>
                  <span class="fund-card__text">Percentual Atribuído <strong>{{ fs.percContrib || '—' }}%</strong></span>
                </div>
                <div class="fund-card__row">
                  <span class="fund-card__label">APORTE INICIAL:</span>
                  <span class="fund-card__text">Valor Atribuído <strong>{{ fs.valorAporte || '—' }}</strong></span>
                  <span class="fund-card__text">Percentual Atribuído <strong>{{ fs.percAporte || '—' }}%</strong></span>
                </div>
                <div class="fund-card__meta">
                  <span>Taxa Máx. Adm.: <strong>{{ fs.taxaAdm }}</strong></span>
                  <span>Rentabilidade: <strong>{{ fs.rentabilidade }}</strong></span>
                  <span>Estratégia: <strong>{{ fs.estrategia }}</strong></span>
                </div>
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
              <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">{{ ben.nome || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ ben.dataNasc || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Grau de Parentesco</span><span class="field-value">{{ ben.parentesco || '—' }}</span></div>
              <div class="field-item"><span class="field-label">Percentual</span><span class="field-value">{{ ben.percentual || 0 }}%</span></div>
            </div>
          </div>
        </div>

        <!-- Forma de Pagamento -->
        <div class="section-card">
          <h3 class="section-card__title">Forma de Pagamento</h3>
          <div class="conf-subsection">
            <div class="conf-subsection__title">Responsável Financeiro</div>
            <div class="field-grid field-grid--3">
              <div class="field-item field-item--full">
                <span class="field-label">Dados do Responsável Financeiro serão os mesmos aos Dados do Proponente?</span>
                <span class="field-value">{{ pagamento.respFinanceiro === 'sim' ? 'Sim' : 'Não' }}</span>
              </div>
              <template v-if="pagamento.respFinanceiro === 'nao'">
                <div class="field-item"><span class="field-label">CPF</span><span class="field-value">{{ pagamento.rfCpf || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Nome Completo</span><span class="field-value">{{ pagamento.rfNome || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Data de Nascimento</span><span class="field-value">{{ pagamento.rfDataNasc ? new Date(pagamento.rfDataNasc + 'T12:00:00').toLocaleDateString('pt-BR') : '—' }}</span></div>
                <div class="field-item"><span class="field-label">Sexo</span><span class="field-value">{{ pagamento.rfGenero || '—' }}</span></div>
                <div class="field-item"><span class="field-label">País de Nascimento</span><span class="field-value">{{ pagamento.rfPaisNascimento || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Nacionalidade</span><span class="field-value">{{ pagamento.rfNacionalidade || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Telefone</span><span class="field-value">{{ pagamento.rfTelefone || '—' }}</span></div>
                <div class="field-item"><span class="field-label">E-mail</span><span class="field-value">{{ pagamento.rfEmail || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Renda Mensal</span><span class="field-value">{{ pagamento.rfRenda || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Profissão</span><span class="field-value">{{ pagamento.rfProfissao || '—' }}</span></div>
                <template v-if="pagamento.rfProfissao === 'Outros (Especificar)'">
                  <div class="field-item"><span class="field-label">Especificação da Profissão</span><span class="field-value">{{ pagamento.rfProfissaoEspecificacao || '—' }}</span></div>
                </template>
                <div class="field-item"><span class="field-label">Origem da Renda</span><span class="field-value">{{ pagamento.rfOrigemRenda || '—' }}</span></div>
                <template v-if="pagamento.rfOrigemRenda === 'Outros'">
                  <div class="field-item"><span class="field-label">Especificação da Origem de Renda</span><span class="field-value">{{ pagamento.rfOrigemRendaEspecificacao || '—' }}</span></div>
                </template>
                <div class="field-item"><span class="field-label">Patrimônio</span><span class="field-value">{{ pagamento.rfPatrimonio || '—' }}</span></div>
                <div class="field-item"><span class="field-label">É US Person?</span><span class="field-value">{{ pagamento.rfUsPerson === 'sim' ? 'Sim' : pagamento.rfUsPerson === 'nao' ? 'Não' : '—' }}</span></div>
                <template v-if="pagamento.rfUsPerson === 'sim'">
                  <div class="field-item"><span class="field-label">NIF</span><span class="field-value">{{ pagamento.rfNif || '—' }}</span></div>
                </template>
              </template>
            </div>
          </div>
          <div class="conf-subsection">
            <div class="conf-subsection__title">Endereço de Cobrança</div>
            <div class="field-grid field-grid--3">
              <div class="field-item field-item--full">
                <span class="field-label">O Endereço de Cobrança será o mesmo informado nos Dados do Proponente?</span>
                <span class="field-value">{{ pagamento.enderecoCobranca === 'sim' ? 'Sim' : 'Não' }}</span>
              </div>
              <template v-if="pagamento.enderecoCobranca === 'nao'">
                <div class="field-item"><span class="field-label">CEP</span><span class="field-value">{{ pagamento.cobCep || '—' }}</span></div>
                <div class="field-item" style="grid-column:span 2"><span class="field-label">Rua</span><span class="field-value">{{ pagamento.cobRua || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Número</span><span class="field-value">{{ pagamento.cobNumero || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Complemento</span><span class="field-value">{{ pagamento.cobComplemento || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Bairro</span><span class="field-value">{{ pagamento.cobBairro || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Município</span><span class="field-value">{{ pagamento.cobMunicipio || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Estado</span><span class="field-value">{{ pagamento.cobEstado || '—' }}</span></div>
                <div class="field-item"><span class="field-label">País de Residência</span><span class="field-value">{{ pagamento.cobPaisResidencia || '—' }}</span></div>
              </template>
            </div>
          </div>
          <div class="conf-subsection">
            <div class="conf-subsection__title">Modalidade de Pagamento</div>
            <div class="field-grid field-grid--3">
              <div class="field-item"><span class="field-label">Forma de Pagamento</span><span class="field-value">{{ formaLabel(pagamento.forma) }}</span></div>
              <template v-if="pagamento.forma === 'pix'">
                <div class="field-item"><span class="field-label">Parcelas Seguintes</span><span class="field-value">{{ pagamento.pixRecorrencia === 'debito' ? 'Débito em Conta Corrente' : pagamento.pixRecorrencia === 'boleto' ? 'Boleto Bancário' : '—' }}</span></div>
              </template>
              <template v-if="pagamento.forma === 'debito' || (pagamento.forma === 'pix' && pagamento.pixRecorrencia === 'debito')">
                <div class="field-item"><span class="field-label">Banco</span><span class="field-value">{{ pagamento.banco || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Agência</span><span class="field-value">{{ pagamento.agencia || '—' }}</span></div>
                <div class="field-item"><span class="field-label">Conta Corrente</span><span class="field-value">{{ pagamento.contaCorrente || '—' }}</span></div>
              </template>
              <template v-if="pagamento.forma !== 'pix' || pagamento.pixRecorrencia">
                <div class="field-item"><span class="field-label">Dia de Vencimento</span><span class="field-value">{{ pagamento.diaVencimento || '—' }}</span></div>
              </template>
            </div>
          </div>
        </div>
      </template>

      <!-- ══ RODAPÉ DA ABA: CONFIRMAÇÃO DOS DADOS ══ -->
      <template v-if="activeTab === tabIndex('Confirmação dos Dados')">
        <div class="page-footer">
          <button class="btn-primary" @click="navigateTo('/propostas-geradas')">Finalizar Solicitação</button>
        </div>
      </template>

      <!-- Modal de Fundos -->
      <div v-if="popupFundos.aberto" class="modal-overlay" @click.self="fecharPopupFundos">
        <div class="modal-fundos">
          <!-- Cabeçalho -->
          <div class="modal-fundos__header">
            <div>
              <div class="modal-fundos__title">Buscar Fundos Disponíveis</div>
              <div class="modal-fundos__count">{{ fundosPopupFiltrados.length }} de {{ fundosDisponiveis.length }} fundos encontrados</div>
            </div>
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <!-- Termômetro de Risco idêntico ao aliaplan -->
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;min-width:220px;">
                <div style="display:flex;align-items:center;gap:5px;flex-shrink:0;">
                  <span style="font-size:11px;color:#6b7280;white-space:nowrap;">Termômetro de Risco</span>
                  <div style="width:13px;height:13px;border-radius:50%;border:1px solid #d1d5db;display:flex;align-items:center;justify-content:center;cursor:help;font-size:9px;color:#6b7280;flex-shrink:0;" title="Indica o nível de risco dos fundos selecionados">i</div>
                </div>
                <div style="display:flex;flex-direction:column;gap:2px;width:220px;flex-shrink:0;">
                  <div style="width:100%;display:flex;height:4px;border-radius:2px;overflow:hidden;">
                    <div v-for="(seg, si) in [{color:'#4285F4'},{color:'#34A853'},{color:'#FBBC04'},{color:'#EA8600'},{color:'#EA4335'}]" :key="si" :style="{flex:1,background:seg.color,height:'100%'}"></div>
                  </div>
                  <div style="display:flex;justify-content:space-between;">
                    <span style="font-size:9px;color:#9ca3af;">Muito baixo</span>
                    <span style="font-size:9px;color:#9ca3af;">Média</span>
                    <span style="font-size:9px;color:#9ca3af;">Muito alto</span>
                  </div>
                </div>
              </div>
              <!-- Botão fechar -->
              <button class="modal-fundos__close" @click="fecharPopupFundos" style="margin-top:2px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <!-- Aviso de limite quando Portabilidade = Sim -->
          <div v-if="comPortabilidade === 'sim'" style="margin: 0 20px 12px; padding: 8px 12px; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; font-size: 12px; color: #92400e; display: flex; align-items: center; gap: 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>Portabilidade: apenas <strong>1 fundo</strong> pode ser selecionado por solicitação.</span>
          </div>
          <!-- Busca -->
          <div class="modal-fundos__search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input v-model="popupFundos.busca" type="text" class="modal-fundos__input" placeholder="Pesquisar por nome ou CNPJ do fundo..." />
          </div>
          <!-- Tabela -->
          <div class="modal-fundos__table-wrapper">
            <table class="modal-fundos__table">
              <colgroup>
                <col style="width:36px" />
                <col style="min-width:280px" />
                <col style="width:120px" />
                <col style="width:130px" />
                <col style="width:150px" />
                <col style="min-width:160px" />
              </colgroup>
              <thead>
                <tr>
                  <th class="col-check"></th>
                  <th class="col-nome">Nome</th>
                  <th class="col-rent th-sortable" @click="toggleSortFundos('rentabilidade')">
                    <span class="th-sort-inner">Rentabilidade
                      <span class="sort-arrows">
                        <span class="sort-arrow-up" :class="{active: popupFundos.sortField==='rentabilidade'&&popupFundos.sortDir==='asc'}"></span>
                        <span class="sort-arrow-down" :class="{active: popupFundos.sortField==='rentabilidade'&&popupFundos.sortDir==='desc'}"></span>
                      </span>
                    </span>
                  </th>
                  <th class="col-risco th-sortable" @click="toggleSortFundos('risco')">
                    <span class="th-sort-inner">Grau de Risco
                      <span class="sort-arrows">
                        <span class="sort-arrow-up" :class="{active: popupFundos.sortField==='risco'&&popupFundos.sortDir==='asc'}"></span>
                        <span class="sort-arrow-down" :class="{active: popupFundos.sortField==='risco'&&popupFundos.sortDir==='desc'}"></span>
                      </span>
                    </span>
                  </th>
                  <th class="col-taxa th-sortable" @click="toggleSortFundos('taxa')">
                    <span class="th-sort-inner">Taxa Máx. Adm.
                      <span class="sort-arrows">
                        <span class="sort-arrow-up" :class="{active: popupFundos.sortField==='taxa'&&popupFundos.sortDir==='asc'}"></span>
                        <span class="sort-arrow-down" :class="{active: popupFundos.sortField==='taxa'&&popupFundos.sortDir==='desc'}"></span>
                      </span>
                    </span>
                  </th>
                  <th class="col-class">Estratégia</th>
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
                  <td style="padding:10px;">
                    <input type="checkbox" :checked="popupFundos.selecionados.includes(f.cnpj)" readonly style="width:13px;height:13px;cursor:pointer;accent-color:#1e3a8a;" />
                  </td>
                  <td style="padding:10px 14px;">
                    <div class="modal-fundo-nome">{{ f.nome }}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
                      <span class="modal-fundo-cnpj">{{ f.cnpj }}</span>
                      <span v-if="f.qualificado" class="badge-qualificado">QUALIFICADO</span>
                    </div>
                  </td>
                  <td style="padding:10px 14px;text-align:right;color:#6b7280;white-space:nowrap;border-left:1px solid #f1f5f9;">{{ f.rentabilidade || '—' }}</td>
                  <td style="padding:10px 14px;text-align:center;border-left:1px solid #f1f5f9;">
                    <div style="display:flex;align-items:center;justify-content:center;">
                      <div :style="{ width:'14px', height:'14px', borderRadius:'50%', background: f.riscoCor || '#4285F4' }"></div>
                    </div>
                  </td>
                  <td style="padding:10px 14px;text-align:right;color:#6b7280;white-space:nowrap;border-left:1px solid #f1f5f9;">{{ f.taxaAdm }}</td>
                  <td style="padding:10px 14px;color:#6b7280;white-space:nowrap;border-left:1px solid #f1f5f9;">{{ f.estrategia }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-fundos__footer">
            <span class="modal-fundos__footer-info">{{ popupFundos.selecionados.length }} fundo{{ popupFundos.selecionados.length !== 1 ? 's' : '' }} selecionado{{ popupFundos.selecionados.length !== 1 ? 's' : '' }}</span>
            <button class="btn-confirmar-fundos" @click="confirmarFundosPopup">Confirmar</button>
          </div>
        </div>
      </div>

    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { PROFISSOES } from '~/composables/profissoes'

interface PlanoData {
  idadeAposentadoria: string | number
  contribuicaoMensal: string
  aporteInicial: string
  tipoPlano: string
  fundosSelecionados: FundoSelecionado[]
}

interface FundoSelecionado {
  nome: string
  cnpj: string
  taxaAdm: string
  rentabilidade: string
  classificacao: string
  estrategia: string
  risco: number
  riscoCor?: string
  riscoLabel?: string
  qualificado?: boolean
  valorContrib: string
  percContrib: string
  valorAporte: string
  percAporte: string
}

interface Beneficiary {
  nome: string
  dataNasc: string
  parentesco: string
  percentual: number
}

interface Banco {
  codigo: string
  nome: string
}

const seguradoras = [
  'Bradesco Vida e Previdência', 'Itaú Vida e Previdência', 'Santander Previdência',
  'Zurich Santander Brasil Seguros', 'Porto Seguro Vida e Previdência', 'Caixa Vida e Previdência',
  'Icatu Seguros', 'XP Vida e Previdência', 'Mapfre Vida', 'Mongeral Aegon Seguros',
  'Tokio Marine Seguradora', 'Allianz Seguros', 'SulAmérica Seguros', 'Prudential do Brasil',
  'MetLife Seguros', 'Generali Brasil Seguros', 'Sompo Seguros', 'HDI Seguros',
]

const bancos: Banco[] = [
  { codigo: '001', nome: 'Banco do Brasil' },
  { codigo: '033', nome: 'Santander' },
  { codigo: '041', nome: 'Banrisul' },
  { codigo: '070', nome: 'BRB - Banco de Brasília' },
  { codigo: '077', nome: 'Banco Inter' },
  { codigo: '085', nome: 'Cecred' },
  { codigo: '104', nome: 'Caixa Econômica Federal' },
  { codigo: '136', nome: 'Unicred' },
  { codigo: '197', nome: 'Stone Pagamentos' },
  { codigo: '208', nome: 'BTG Pactual' },
  { codigo: '212', nome: 'Banco Original' },
  { codigo: '218', nome: 'BS2' },
  { codigo: '237', nome: 'Bradesco' },
  { codigo: '260', nome: 'Nu Pagamentos (Nubank)' },
  { codigo: '290', nome: 'PagSeguro Internet' },
  { codigo: '318', nome: 'Banco BMG' },
  { codigo: '336', nome: 'Banco C6' },
  { codigo: '341', nome: 'Itaú Unibanco' },
  { codigo: '380', nome: 'PicPay' },
  { codigo: '389', nome: 'Banco Mercantil do Brasil' },
  { codigo: '422', nome: 'Banco Safra' },
  { codigo: '505', nome: 'Credit Suisse' },
  { codigo: '623', nome: 'Banco Pan' },
  { codigo: '633', nome: 'Banco Rendimento' },
  { codigo: '637', nome: 'Banco Sofisa' },
  { codigo: '655', nome: 'Banco Votorantim' },
  { codigo: '707', nome: 'Banco Daycoval' },
  { codigo: '735', nome: 'Banco Neon' },
  { codigo: '741', nome: 'Banco Ribeirão Preto' },
  { codigo: '745', nome: 'Citibank' },
  { codigo: '748', nome: 'Sicredi' },
  { codigo: '756', nome: 'Sicoob' },
  { codigo: '077', nome: 'Banco Inter' },
]

const fundosDisponiveis = ref<FundoSelecionado[]>([])

// Carregar fundos do JSON
onMounted(async () => {
  try {
    const res = await fetch('/nura-app/fundos.json')
    const data = await res.json()
    fundosDisponiveis.value = data
  } catch {
    fundosDisponiveis.value = []
  }
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

const comPortabilidade = ref<'sim' | 'nao' | ''>('')
const tipoPortabilidade = ref('externa')

const proponente = reactive({
  cpf: '', nome: '', dataNasc: '', genero: '', paisNascimento: '', nacionalidade: '',
  telefone: '', email: '', renda: '', profissao: '', profissaoEspecificacao: '',
  origemRenda: '', origemRendaEspecificacao: '', patrimonio: '',
  usPerson: 'nao', nif: '',
  cep: '', rua: '', numero: '', complemento: '', bairro: '', municipio: '', estado: '', paisResidencia: '',
})

const form = reactive({
  susep: '', seguradora: '', certificado: '', nomePlano: '',
  tipoPlano: 'PGBL', regime: 'Progressiva', cnpjFundo: '', situacaoRegime: 'Retratável',
  tipoTransferencia: 'Total', valorPortabilidade: '',
})

const plano = reactive<PlanoData>({
  idadeAposentadoria: '',
  contribuicaoMensal: '',
  aporteInicial: '',
  tipoPlano: 'PGBL',
  fundosSelecionados: [],
})

const showErrors = ref(false)

function proponenteValido(): boolean {
  const profOk = proponente.profissao !== 'Outros (Especificar)' || !!proponente.profissaoEspecificacao
  const rendaOk = proponente.origemRenda !== 'Outros' || !!proponente.origemRendaEspecificacao
  const nifOk = proponente.usPerson !== 'sim' || !!proponente.nif
  return !!(proponente.cpf && proponente.nome && proponente.dataNasc && proponente.genero &&
    proponente.telefone && proponente.email && proponente.renda && proponente.profissao &&
    proponente.origemRenda && proponente.patrimonio && proponente.paisNascimento && proponente.nacionalidade &&
    proponente.usPerson && proponente.cep && proponente.numero &&
    profOk && rendaOk && nifOk)
}

function planoValido(): boolean {
  const portOk = comPortabilidade.value === 'nao' || (
    comPortabilidade.value === 'sim' &&
    !!form.susep &&
    !!form.tipoTransferencia &&
    (form.tipoTransferencia !== 'Parcial' || !!form.valorPortabilidade)
  )
  // Quando Portabilidade=Não: Contribuição Mensal OU Aporte Inicial é obrigatório
  // Quando Portabilidade=Sim: Contribuição Mensal é obrigatória (comportamento original)
  const valorOk = comPortabilidade.value === 'nao'
    ? !!(plano.contribuicaoMensal || plano.aporteInicial)
    : !!plano.contribuicaoMensal
  return !!(plano.idadeAposentadoria && valorOk && plano.tipoPlano &&
    plano.fundosSelecionados.length > 0 && comPortabilidade.value !== '' && portOk)
}

function advanceFromDetalhes() {
  showErrors.value = true
  if (!proponenteValido() || !planoValido()) return
  showErrors.value = false
  changeTab(tabIndex('Beneficiários'))
}

// Formatação CPF
function formatCpf() {
  let v = proponente.cpf.replace(/\D/g, '').slice(0, 11)
  if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2')
  proponente.cpf = v
}

function formatTelefone() {
  let v = proponente.telefone.replace(/\D/g, '').slice(0, 11)
  if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  else if (v.length > 6) v = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3')
  else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2')
  proponente.telefone = v
}

function formatMoeda(e: Event, field: 'renda' | 'patrimonio') {
  const input = e.target as HTMLInputElement
  let v = input.value.replace(/\D/g, '')
  if (!v) { proponente[field] = ''; return }
  const num = parseInt(v) / 100
  proponente[field] = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatMoedaPlano(e: Event, field: 'contribuicaoMensal' | 'aporteInicial') {
  const input = e.target as HTMLInputElement
  let v = input.value.replace(/\D/g, '')
  if (!v) { plano[field] = ''; return }
  const num = parseInt(v) / 100
  plano[field] = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// CEP Proponente
async function onCepInput() {
  let v = proponente.cep.replace(/\D/g, '').slice(0, 8)
  if (v.length > 5) v = v.replace(/(\d{5})(\d{0,3})/, '$1-$2')
  proponente.cep = v
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

// CEP Pagamento
async function onCepInputPag() {
  const raw = pagamento.cobCep.replace(/\D/g, '')
  if (raw.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
      const data = await res.json()
      if (!data.erro) {
        pagamento.cobRua = data.logradouro || ''
        pagamento.cobBairro = data.bairro || ''
        pagamento.cobMunicipio = data.localidade || ''
        pagamento.cobEstado = data.uf || ''
      }
    } catch {}
  }
}

// Profissão autocomplete
const profissaoQuery = ref('')
const showProfissaoDropdown = ref(false)
const profissaoResults = computed(() => {
  if (!profissaoQuery.value) return PROFISSOES.slice(0, 50)
  const q = profissaoQuery.value.toLowerCase()
  return PROFISSOES.filter(p => p.toLowerCase().includes(q)).slice(0, 100)
})
function onProfissaoInput() { showProfissaoDropdown.value = true }
function hideProfissaoDropdownDelayed() { setTimeout(() => { showProfissaoDropdown.value = false }, 200) }
function selectProfissao(p: string) {
  proponente.profissao = p
  profissaoQuery.value = p
  showProfissaoDropdown.value = false
  if (p !== 'Outros (Especificar)') proponente.profissaoEspecificacao = ''
}

// RF Profissão autocomplete
const rfProfissaoQuery = ref('')
const showRfProfissaoDropdown = ref(false)
const rfProfissaoResults = computed(() => {
  if (!rfProfissaoQuery.value) return PROFISSOES.slice(0, 50)
  const q = rfProfissaoQuery.value.toLowerCase()
  return PROFISSOES.filter(p => p.toLowerCase().includes(q)).slice(0, 100)
})
function onRfProfissaoInput() { showRfProfissaoDropdown.value = true }
function hideRfProfissaoDropdownDelayed() { setTimeout(() => { showRfProfissaoDropdown.value = false }, 200) }
function selectRfProfissao(p: string) {
  pagamento.rfProfissao = p
  rfProfissaoQuery.value = p
  showRfProfissaoDropdown.value = false
  if (p !== 'Outros (Especificar)') pagamento.rfProfissaoEspecificacao = ''
}

// RF formatação
function formatRfCpf() {
  let v = pagamento.rfCpf.replace(/\D/g, '').slice(0, 11)
  if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2')
  pagamento.rfCpf = v
}
function formatRfTelefone() {
  let v = pagamento.rfTelefone.replace(/\D/g, '').slice(0, 11)
  if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  else if (v.length > 6) v = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3')
  else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2')
  pagamento.rfTelefone = v
}
function formatRfMoeda(e: Event, field: 'rfRenda' | 'rfPatrimonio') {
  const input = e.target as HTMLInputElement
  let v = input.value.replace(/\D/g, '')
  if (!v) { (pagamento as any)[field] = ''; return }
  const num = parseInt(v) / 100
  ;(pagamento as any)[field] = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Banco autocomplete
const bancoQuery = ref('')
const showBancoDropdown = ref(false)
const bancoResults = computed(() => {
  if (!bancoQuery.value) return bancos
  const q = bancoQuery.value.toLowerCase()
  return bancos.filter(b => b.nome.toLowerCase().includes(q) || b.codigo.includes(q))
})
function onBancoInput() { showBancoDropdown.value = true }
function hideBancoDropdownDelayed() { setTimeout(() => { showBancoDropdown.value = false }, 200) }
function selectBanco(b: Banco) {
  pagamento.banco = `${b.codigo} - ${b.nome}`
  bancoQuery.value = `${b.codigo} - ${b.nome}`
  showBancoDropdown.value = false
}

// Formatação Agência e Conta Corrente
function formatAgencia() {
  let v = pagamento.agencia.replace(/\D/g, '').slice(0, 5)
  if (v.length > 4) v = v.replace(/(\d{4})(\d{1})/, '$1-$2')
  pagamento.agencia = v
}
function formatContaCorrente() {
  let v = pagamento.contaCorrente.replace(/\D/g, '').slice(0, 9)
  if (v.length > 1) v = v.replace(/(\d{1,8})(\d{1})$/, '$1-$2')
  pagamento.contaCorrente = v
}

// Beneficiários
function newBen(): Beneficiary { return { nome: '', dataNasc: '', parentesco: '', percentual: 0 } }
const beneficiarios = ref<Beneficiary[]>([newBen()])
const somaPercentual = computed(() => beneficiarios.value.reduce((s, b) => s + (b.percentual || 0), 0))
function addBen() { if (beneficiarios.value.length < 20) beneficiarios.value.push(newBen()) }
function removeBen(i: number) { beneficiarios.value.splice(i, 1) }

// Pagamento
const pagamento = reactive({
  forma: 'debito', diaVencimento: '', pixRecorrencia: '',
  banco: '', agencia: '', contaCorrente: '',
  respFinanceiro: 'sim',
  rfCpf: '', rfNome: '', rfDataNasc: '', rfGenero: '', rfPaisNascimento: '', rfNacionalidade: '',
  rfTelefone: '', rfEmail: '', rfRenda: '', rfProfissao: '', rfProfissaoEspecificacao: '',
  rfOrigemRenda: '', rfOrigemRendaEspecificacao: '', rfPatrimonio: '',
  rfUsPerson: 'nao', rfNif: '',
  enderecoCobranca: 'sim',
  cobCep: '', cobRua: '', cobNumero: '', cobComplemento: '', cobBairro: '', cobMunicipio: '', cobEstado: '', cobPaisResidencia: '',
})

function formaLabel(forma: string) {
  const m: Record<string, string> = { debito: 'Débito em Conta Corrente', pix: 'PIX', boleto: 'Boleto Bancário' }
  return m[forma] || '—'
}

// Autocomplete — Seguradora
const seguradoraQuery = ref('')
const showSeguradoraDropdown = ref(false)
const seguradoraResults = computed(() => {
  if (!seguradoraQuery.value) return seguradoras.slice(0, 8)
  return seguradoras.filter(s => s.toLowerCase().includes(seguradoraQuery.value.toLowerCase())).slice(0, 8)
})
function onSeguradoraInput() { showSeguradoraDropdown.value = true }
function hideDropdownDelayed() { setTimeout(() => { showSeguradoraDropdown.value = false }, 200) }
function selectSeguradora(s: string) { form.seguradora = s; seguradoraQuery.value = s; showSeguradoraDropdown.value = false }

// Cor do risco
function riscoColor(risco: number): string {
  const colors: Record<number, string> = {
    1: '#22c55e',
    2: '#84cc16',
    3: '#3b82f6',
    4: '#f59e0b',
    5: '#ef4444',
  }
  return colors[risco] || '#3b82f6'
}

// Pop-up de busca de fundos
const popupFundos = reactive({
  aberto: false,
  busca: '',
  selecionados: [] as string[],
  blocoAtual: null as PlanoData | null,
  sortField: '' as '' | 'rentabilidade' | 'risco' | 'taxa',
  sortDir: 'asc' as 'asc' | 'desc',
})

function toggleSortFundos(field: 'rentabilidade' | 'risco' | 'taxa') {
  if (popupFundos.sortField === field) {
    popupFundos.sortDir = popupFundos.sortDir === 'asc' ? 'desc' : 'asc'
  } else {
    popupFundos.sortField = field
    popupFundos.sortDir = 'asc'
  }
}

const fundosPopupFiltrados = computed(() => {
  let list = fundosDisponiveis.value
  if (popupFundos.busca) {
    const q = popupFundos.busca.toLowerCase()
    list = list.filter(f => f.nome.toLowerCase().includes(q) || f.cnpj.includes(q))
  }
  if (popupFundos.sortField) {
    const dir = popupFundos.sortDir === 'asc' ? 1 : -1
    list = [...list].sort((a: any, b: any) => {
      if (popupFundos.sortField === 'risco') return (a.risco - b.risco) * dir
      if (popupFundos.sortField === 'taxa') {
        const ta = parseFloat(a.taxaAdm) || 0
        const tb = parseFloat(b.taxaAdm) || 0
        return (ta - tb) * dir
      }
      return 0
    })
  }
  return list
})

function abrirPopupFundos(bloco: PlanoData) {
  popupFundos.blocoAtual = bloco
  popupFundos.busca = ''
  popupFundos.selecionados = bloco.fundosSelecionados.map(f => f.cnpj)
  popupFundos.aberto = true
}

function fecharPopupFundos() {
  popupFundos.aberto = false
  popupFundos.blocoAtual = null
  popupFundos.busca = ''
}

function toggleFundoPopup(f: FundoSelecionado) {
  const idx = popupFundos.selecionados.indexOf(f.cnpj)
  if (idx === -1) {
    // Quando Portabilidade = Sim, limitar a 1 fundo
    if (comPortabilidade.value === 'sim') {
      popupFundos.selecionados = [f.cnpj]
    } else {
      popupFundos.selecionados.push(f.cnpj)
    }
  } else {
    popupFundos.selecionados.splice(idx, 1)
  }
}

function confirmarFundosPopup() {
  if (!popupFundos.blocoAtual) return
  const bloco = popupFundos.blocoAtual
  bloco.fundosSelecionados = bloco.fundosSelecionados.filter(fs =>
    popupFundos.selecionados.includes(fs.cnpj)
  )
  for (const cnpj of popupFundos.selecionados) {
    if (!bloco.fundosSelecionados.find(fs => fs.cnpj === cnpj)) {
      const f = fundosDisponiveis.value.find(fd => fd.cnpj === cnpj)
      if (f) bloco.fundosSelecionados.push({ ...f, valorContrib: '', percContrib: '', valorAporte: '', percAporte: '' })
    }
  }
  fecharPopupFundos()
}

function removerFundoPlano(i: number) { plano.fundosSelecionados.splice(i, 1) }

// Sincronização bidirecional do Tipo do Plano entre Dados da Portabilidade e Dados do Plano
function syncTipoPlanoFromPortabilidade(tp: string) {
  plano.tipoPlano = tp
}
function syncTipoPlanoFromDadosPlano(tp: string) {
  if (comPortabilidade.value === 'sim') {
    form.tipoPlano = tp
  }
}

// Abas
const allTabs = ['Detalhes da Solicitação', 'Beneficiários', 'Formas de Pagamento', 'Confirmação dos Dados']
const visibleTabs = computed(() => allTabs)

function tabIndex(name: string): number {
  return visibleTabs.value.indexOf(name)
}

const activeTab = ref(0)
function changeTab(i: number) {
  if (i >= 0 && i < visibleTabs.value.length) activeTab.value = i
}
</script>

<style scoped>
.page-content { padding: 28px 40px 80px; }

.page-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
.page-header__icon { color: var(--text-muted); display: flex; align-items: center; }
.page-header__title { font-family: var(--font-sans); font-size: 20px; font-weight: 600; color: var(--text-primary); margin: 0; }

.section-card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 20px 24px; margin-bottom: 16px; box-shadow: rgba(0,0,0,0.04) 0px 1px 3px 0px, rgba(0,0,0,0.03) 0px 1px 2px 0px; }
.section-card__title { display: flex; align-items: center; gap: 8px; font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color); }

.tipo-port-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.tipo-port-card { position: relative; display: flex; align-items: center; gap: 12px; padding: 16px; border: 1.5px solid var(--border-color); border-radius: 8px; background: white; cursor: pointer; text-align: left; transition: border-color 0.15s, background-color 0.15s; font-family: var(--font-sans); }
.tipo-port-card--active { border-color: var(--btn-primary-bg); background-color: #f0f4ff; }
.tipo-port-card--disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
.tipo-port-card__radio { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--border-color); flex-shrink: 0; transition: border-color 0.15s, background-color 0.15s; }
.tipo-port-card__radio--active { border-color: var(--btn-primary-bg); background-color: var(--btn-primary-bg); box-shadow: inset 0 0 0 3px white; }
.tipo-port-card__label { font-size: 14px; font-weight: 500; color: var(--text-primary); }
.tipo-port-card__badge { position: absolute; top: 8px; right: 8px; background-color: var(--btn-primary-bg); color: white; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.3px; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
.form-grid--3col { grid-template-columns: 1fr 1fr 1fr; }
.plano-inner-box { border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-bottom: 16px; background: #fafbfc; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field--full { grid-column: 1 / -1; }

/* Estilos dos inputs idênticos ao aliaplan */
.form-label { font-family: var(--font-sans); font-size: 11px; font-weight: 500; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.6px; }
.form-label--required::after { content: ' *'; color: #ef4444; }
.form-input { font-family: var(--font-sans); font-size: 13px; color: rgb(15, 23, 42); padding: 4px 8px; border: 1px solid rgb(226, 232, 240); border-radius: 6px; background-color: rgb(248, 250, 252); outline: none; height: 29.5px; box-sizing: border-box; width: 100%; transition: border-color 0.15s; }
.form-input:focus { border-color: var(--btn-primary-bg); }
.form-input--error { border-color: #ef4444 !important; }
.form-input--disabled { background-color: #f1f5f9; color: #94a3b8; cursor: not-allowed; }
.form-select { font-family: var(--font-sans); font-size: 13px; color: rgb(15, 23, 42); padding: 4px 8px; border: 1px solid rgb(226, 232, 240); border-radius: 6px; background-color: rgb(248, 250, 252); outline: none; height: 29.5px; box-sizing: border-box; width: 100%; }
.form-label-radio { font-family: var(--font-sans); font-size: 11px; font-weight: 500; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.6px; }
.form-error { font-size: 11px; color: #ef4444; margin-top: 2px; }
.form-hint { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

.radio-group-h { display: flex; flex-direction: row; gap: 16px; flex-wrap: wrap; margin-top: 4px; }
.radio-label-h { display: flex; align-items: center; gap: 6px; font-family: var(--font-sans); font-size: 13px; color: var(--text-primary); cursor: pointer; }
.radio-input { accent-color: var(--btn-primary-bg); width: 14px; height: 14px; }

/* Flag question (É US Person? / Será com portabilidade?) */
.flag-question { font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--text-primary); }
.proponente-flags { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-color); }
.proponente-flag-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.flag-radio-group { display: flex; flex-direction: row; gap: 20px; }
.flag-radio-label { display: flex; align-items: center; gap: 7px; font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); cursor: pointer; }
.proponente-residencial { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-color); }
.subsection-divider-title { font-family: var(--font-sans); font-size: 12px; font-weight: 700; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 14px; }

/* Autocomplete */
.autocomplete-wrapper { position: relative; }
.autocomplete-input { padding-right: 28px !important; }
.autocomplete-arrow { position: absolute; right: 9px; top: 50%; transform: translateY(-50%); font-size: 9px; color: #9ca3af; pointer-events: none; line-height: 1; }
.autocomplete-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid var(--border-color); border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 200; max-height: 320px; overflow-y: auto; }
.autocomplete-item { display: block; width: 100%; padding: 8px 12px; background: none; border: none; text-align: left; font-family: var(--font-sans); font-size: 13px; color: var(--text-primary); cursor: pointer; transition: background-color 0.1s; }
.autocomplete-item:hover { background-color: #f8fafc; }

/* NIF inline */
.nif-inline { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-left: 16px; }
.nif-inline .form-label { white-space: nowrap; margin-bottom: 0; }

/* Badge Qualificado */
.badge-qualificado { font-size: 10px; font-weight: 600; color: #4b5563; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 3px; padding: 1px 5px; letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap; flex-shrink: 0; }

/* Colunas sortáveis da tabela de fundos */
.th-sortable { cursor: pointer; user-select: none; }
.th-sort-inner { display: inline-flex; align-items: center; gap: 5px; }
.sort-arrows { display: inline-flex; flex-direction: row; align-items: center; gap: 3px; }
.sort-arrow-up { width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-bottom: 5px solid #d1d5db; }
.sort-arrow-up.active { border-bottom-color: #1e3a8a; }
.sort-arrow-down { width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid #d1d5db; }
.sort-arrow-down.active { border-top-color: #1e3a8a; }

/* Fundos */
.selecao-fundos-box { border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; }
.selecao-fundos-box__header { background-color: #f8fafc; padding: 10px 16px; font-family: var(--font-sans); font-size: 11px; font-weight: 700; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1px solid var(--border-color); }
.selecao-fundos-box__body { padding: 16px; }
.fundos-selecionados-list { margin-top: 16px; }
.fund-card { border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; margin-bottom: 8px; }
.fund-card__header { padding: 12px 16px; background-color: #f8fafc; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.fund-card__name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.fund-card__cnpj { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.fund-card__body { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
.fund-card__row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.fund-card__label { font-size: 11px; font-weight: 600; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.5px; min-width: 140px; }
.fund-card__text { font-size: 12px; color: var(--text-primary); }
.fund-card__meta { display: flex; gap: 20px; margin-top: 4px; flex-wrap: wrap; }
.fund-card__meta span { font-size: 12px; color: var(--text-muted); }
.fund-input { font-family: var(--font-sans); font-size: 13px; color: var(--text-primary); padding: 6px 10px; border: 1px solid var(--border-color); border-radius: 5px; background-color: white; outline: none; width: 110px; box-sizing: border-box; }
.fund-input--sm { width: 60px; }
.btn-remove-fund { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 4px; display: flex; align-items: center; transition: color 0.12s; }
.btn-remove-fund:hover { color: #ef4444; }

/* Fund Card Aliaplan - layout idêntico ao aliaplan */
/* Grid: col1=nome/cnpj, col2=contrib-mensal/aporte, col3=botão remover */
/* Linha 1: nome | contrib mensal (condicional) | botão */
/* Linha 2: cnpj+qualificado | aporte inicial (condicional, alinhado à direita) | - */
/* Linha 3: meta info */
.fund-card-aliaplan { border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px 14px; background: #fff; display: grid; grid-template-columns: 1fr auto 28px; grid-template-rows: auto auto auto; column-gap: 12px; row-gap: 4px; align-items: start; margin-bottom: 8px; }
.fund-card-aliaplan__nome-col { grid-column: 1; grid-row: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.fund-card-aliaplan__nome { font-size: 13px; font-weight: 600; color: #1e293b; word-break: break-word; }
.fund-card-aliaplan__cnpj-row { grid-column: 1; grid-row: 2; display: flex; align-items: center; gap: 6px; }
.fund-card-aliaplan__cnpj { font-size: 11px; color: #6b7280; }
.fund-card-aliaplan__contrib-col { grid-column: 2; grid-row: 1; display: flex; align-items: center; gap: 6px; flex-shrink: 0; justify-content: flex-end; white-space: nowrap; flex-wrap: wrap; }
.fund-card-aliaplan__aporte-row { grid-column: 2; grid-row: 2; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: flex-end; white-space: nowrap; }
.fund-card-aliaplan__meta-row { grid-column: 1 / 4; grid-row: 3; display: flex; gap: 16px; flex-wrap: wrap; padding-top: 6px; border-top: 1px solid #f1f5f9; }
.fund-card-aliaplan__meta-row span { font-size: 11px; color: #6b7280; }
.fund-card-aliaplan__section-label { font-size: 10px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; }
.fund-card-aliaplan__field-pair { display: flex; align-items: center; gap: 3px; }
.fund-card-aliaplan__field-label { font-size: 10px; color: #6b7280; white-space: nowrap; }
.fund-card-aliaplan__input { border: 1px solid #e5e7eb; border-radius: 4px; padding: 2px 5px; font-size: 11px; width: 76px; font-family: var(--font-sans); text-align: center; outline: none; }
.fund-card-aliaplan__pct-wrap { display: flex; align-items: center; border: 1px solid #e5e7eb; border-radius: 4px; background: #f9fafb; overflow: hidden; width: 52px; }
.fund-card-aliaplan__pct-input { border: none; outline: none; padding: 2px 2px 2px 4px; font-size: 11px; width: 34px; text-align: right; background: transparent; color: #1e293b; font-family: var(--font-sans); }
.fund-card-aliaplan__pct-sign { font-size: 11px; color: #4b5563; padding-right: 4px; user-select: none; pointer-events: none; }

.btn-buscar-fundos { display: flex; align-items: center; gap: 8px; width: 100%; padding: 9px 12px; background: white; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-family: var(--font-sans); font-size: 14px; color: #94a3b8; text-align: left; transition: border-color 0.15s; }
.btn-buscar-fundos:hover { border-color: #94a3b8; }

.required-badge { font-size: 10px; font-weight: 600; color: #ef4444; background: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; padding: 2px 6px; text-transform: uppercase; letter-spacing: 0.3px; margin-left: auto; }

/* Forma de Pagamento */
.resp-financeiro-row { display: grid; grid-template-columns: 1fr 160px; align-items: center; gap: 20px; }
.radio-group-inline { display: flex; flex-direction: row; gap: 20px; justify-content: flex-start; }
.opcoes-divider { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0 16px; }
.opcoes-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary); margin: 0 0 12px; }
.subsection-title { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 16px 0 12px; }
.info-box-blue { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 13px; color: #1e40af; line-height: 1.5; }
.info-box-blue svg { flex-shrink: 0; width: 18px; height: 18px; margin-top: 1px; color: #1e40af; }
.radio-group { display: flex; flex-direction: column; gap: 10px; }
.radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); }
.radio-label { font-size: 14px; }

/* Beneficiários */
.beneficiary-card { border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
.beneficiary-card__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.beneficiary-card__title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.btn-remove { display: flex; align-items: center; gap: 4px; font-family: var(--font-sans); font-size: 12px; font-weight: 500; color: #ef4444; background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background-color 0.15s; }
.btn-remove:hover { background-color: #fef2f2; }
.btn-add { display: flex; align-items: center; gap: 6px; font-family: var(--font-sans); font-size: 13px; font-weight: 500;
 color: var(--btn-primary-bg); background: none; border: 1px dashed var(--btn-primary-bg); border-radius: 6px; padding: 8px 16px; cursor: pointer; margin-top: 8px; transition: background-color 0.15s; }
.btn-add:hover { background-color: #f0f4ff; }
.alert-warning { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; font-size: 13px; color: #92400e; margin-bottom: 12px; }
.disclaimer-note { font-size: 12px; color: var(--text-muted); margin-top: 16px; font-style: italic; }

/* Confirmação */
.field-grid { display: grid; gap: 12px 20px; }
.field-grid--3 { grid-template-columns: repeat(3, 1fr); }
.field-item { display: flex; flex-direction: column; gap: 3px; }
.field-item--full { grid-column: 1 / -1; }
.field-label { font-size: 11px; font-weight: 600; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.5px; }
.field-value { font-size: 14px; color: var(--text-primary); }
.conf-subsection { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-color); }
.conf-subsection__title { font-size: 12px; font-weight: 700; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 12px; }
.conf-beneficiario-bloco { border: 1px solid var(--border-color); border-radius: 8px; padding: 14px; margin-bottom: 10px; }
.conf-beneficiario-titulo { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 12px; }

/* Modal de Fundos */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-fundos { background: white; border-radius: 12px; width: 100%; max-width: 1100px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; }
.modal-fundos__header { display: flex; align-items: flex-start; justify-content: space-between; padding: 20px 24px 16px; border-bottom: 1px solid var(--border-color); }
.modal-fundos__title { font-size: 18px; font-weight: 700; color: var(--text-primary); }
.modal-fundos__count { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
.modal-fundos__header-right { display: flex; align-items: center; gap: 16px; }
.modal-fundos__close { background: none; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; padding: 6px; display: flex; align-items: center; color: var(--text-muted); transition: background-color 0.15s; }
.modal-fundos__close:hover { background-color: #f8fafc; }
.modal-fundos__search { display: flex; align-items: center; gap: 10px; padding: 12px 24px; border-bottom: 1px solid var(--border-color); }
.modal-fundos__search svg { color: var(--text-muted); flex-shrink: 0; }
.modal-fundos__input { flex: 1; border: none; outline: none; font-family: var(--font-sans); font-size: 14px; color: var(--text-primary); background: none; }
.modal-fundos__table-wrapper { flex: 1; overflow-y: auto; }
.modal-fundos__table { width: 100%; border-collapse: collapse; }
.modal-fundos__table thead { position: sticky; top: 0; background: white; }
.modal-fundos__table th { padding: 10px 16px; text-align: left; font-size: 11px; font-weight: 600; color: rgb(77, 86, 96); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border-color); border-right: 1px solid var(--border-color); white-space: nowrap; }
.modal-fundos__table th:last-child { border-right: none; }
.modal-fundos__row { cursor: pointer; transition: background-color 0.12s; }
.modal-fundos__row:hover { background-color: #f8fafc; }
.modal-fundos__row--selected { background-color: #f0f4ff; }
.modal-fundos__table td { padding: 12px 16px; font-size: 13px; color: var(--text-primary); border-bottom: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; }
.modal-fundos__table td:last-child { border-right: none; }
.modal-fundo-nome { font-weight: 500; font-size: 13px; }
.modal-fundo-cnpj { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
.modal-checkbox { width: 16px; height: 16px; border: 1.5px solid var(--border-color); border-radius: 3px; display: flex; align-items: center; justify-content: center; transition: background-color 0.12s, border-color 0.12s; }
.modal-checkbox--checked { background-color: var(--btn-primary-bg); border-color: var(--btn-primary-bg); }
.risco-dot { width: 14px; height: 14px; border-radius: 50%; }
.modal-fundos__footer { display: flex; align-items: center; justify-content: space-between; padding: 14px 24px; border-top: 1px solid var(--border-color); }
.modal-fundos__footer-info { font-size: 13px; color: var(--text-muted); }
.btn-confirmar-fundos { background-color: var(--btn-primary-bg); color: white; border: none; border-radius: 8px; padding: 10px 24px; font-family: var(--font-sans); font-size: 14px; font-weight: 600; cursor: pointer; transition: background-color 0.15s; }
.btn-confirmar-fundos:hover { background-color: var(--btn-primary-hover); }

/* Termômetro de risco */
.termometro-risco { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-muted); }
.termometro-barra { width: 40px; height: 6px; border-radius: 3px; overflow: hidden; }
.termometro-fill { height: 100%; }
.termometro-label { font-size: 10px; white-space: nowrap; }

/* Coluna tamanhos */
.col-check { width: 40px; }
.col-nome { min-width: 200px; }
.col-rent { width: 100px; }
.col-risco { width: 80px; }
.col-taxa { width: 120px; }
.col-class { min-width: 140px; }

/* Page footer */
.page-footer { display: flex; justify-content: flex-end; margin-top: 24px; }
.btn-primary { background-color: var(--btn-primary-bg); color: white; border: none; border-radius: 8px; padding: 12px 28px; font-family: var(--font-sans); font-size: 14px; font-weight: 600; cursor: pointer; transition: background-color 0.15s; }
.btn-primary:hover { background-color: var(--btn-primary-hover); }

/* Utilitários */
.mb-8 { margin-bottom: 8px; }
.mb-16 { margin-bottom: 16px; }
.mb-20 { margin-bottom: 20px; }
.mt-16 { margin-top: 16px; }
.mt-20 { margin-top: 20px; }

@media (max-width: 768px) {
  .page-content { padding: 16px 16px 60px; }
  .field-grid--3 { grid-template-columns: 1fr 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .tipo-port-grid { grid-template-columns: 1fr; }
  .resp-financeiro-row { grid-template-columns: 1fr; }
}
</style>
