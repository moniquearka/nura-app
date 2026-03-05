// composables/usePdfRevisaoEstudo.ts
// Gera o PDF "Revisão do Estudo" com layout fiel aos documentos de referência

import { FAVICON_B64 } from './faviconBase64'

export interface StudyData {
  clientName: string
  cpf: string
  dataNascimento: string
  telefone: string
  email: string
  rendaMensal: string
  ocupacao: string
  empresa: string
  // Perfil
  tipoPerfil: string
  descricaoPerfil: string
  // Plano 1 (Previdência)
  tipoPlano: string // PGBL | VGBL
  regimeTributacao: string
  contribuicaoMensal: string
  aporteInicial: string
  idadeAposentadoria?: string
  fundo?: {
    nome: string
    cnpj: string
    processoSusep: string
    carregamento: string
    taxaAdm: string
    rentabilidade: string
    classificacao: string
    percContribuicao: string
    percAporte: string
  }
  // Plano 2 (Seguro de Vida) - opcional
  produtoSeguro?: string
  coberturas?: Array<{
    cobertura: string
    vigencia: string
    prazoPagamento: string
    capitalSegurado: string
    contribuicaoMensal: string
  }>
  // Totais
  investimentoMensal: string
  dataEstudo: string
  versao?: string
}

// Cores do design
const COLORS = {
  logoGradientStart: [232, 121, 160] as [number, number, number],  // #e879a0
  logoGradientEnd: [168, 85, 247] as [number, number, number],     // #a855f7
  cardBorder: [229, 231, 235] as [number, number, number],         // #e5e7eb
  sectionLabel: [156, 163, 175] as [number, number, number],       // #9ca3af
  textPrimary: [17, 24, 39] as [number, number, number],           // #111827
  textSecondary: [75, 85, 99] as [number, number, number],         // #4b5563
  textMuted: [107, 114, 128] as [number, number, number],          // #6b7280
  blueLight: [239, 246, 255] as [number, number, number],          // #eff6ff
  blueMid: [59, 130, 246] as [number, number, number],             // #3b82f6
  blueDark: [30, 64, 175] as [number, number, number],             // #1e40af
  greenLight: [240, 253, 244] as [number, number, number],         // #f0fdf4
  greenMid: [16, 185, 129] as [number, number, number],            // #10b981
  badgePrevBg: [219, 234, 254] as [number, number, number],        // #dbeafe
  badgePrevText: [29, 78, 216] as [number, number, number],        // #1d4ed8
  badgeSegBg: [209, 250, 229] as [number, number, number],         // #d1fae5
  badgeSegText: [6, 95, 70] as [number, number, number],           // #065f46
  footerBg: [248, 250, 252] as [number, number, number],           // #f8fafc
  white: [255, 255, 255] as [number, number, number],
  pageBackground: [249, 250, 251] as [number, number, number],     // #f9fafb
}

const PAGE_W = 210
const PAGE_H = 297
const MARGIN = 14
const CONTENT_W = PAGE_W - MARGIN * 2

export function usePdfRevisaoEstudo() {
  async function generatePdf(study: StudyData): Promise<void> {
    // Import dinâmico para evitar SSR issues
    const { default: jsPDF } = await import('jspdf')
    const { default: autoTable } = await import('jspdf-autotable')

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    // Estado de posição vertical
    let y = MARGIN

    // ─── Helpers ──────────────────────────────────────────────────────────────

    function addPage() {
      doc.addPage()
      y = MARGIN
      drawHeader()
    }

    function checkPageBreak(neededHeight: number) {
      if (y + neededHeight > PAGE_H - MARGIN - 10) {
        addPage()
      }
    }

    // Desenha o logo ALIA no canto superior direito
    function drawHeader() {
      // Logo "ALIA" com gradiente simulado (texto com cor)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(22)

      // Simula gradiente com duas cores (jsPDF não suporta gradiente nativo)
      // Usa cor intermediária entre pink e purple
      doc.setTextColor(180, 100, 210)
      doc.text('ALIA', PAGE_W - MARGIN, MARGIN + 6, { align: 'right' })

      // Linha separadora sutil abaixo do header
      doc.setDrawColor(...COLORS.cardBorder)
      doc.setLineWidth(0.3)
      doc.line(MARGIN, MARGIN + 10, PAGE_W - MARGIN, MARGIN + 10)

      y = MARGIN + 16
    }

    // Desenha label de seção (ex: "RESUMO JORNADA DE VIDA")
    function drawSectionLabel(label: string) {
      checkPageBreak(12)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...COLORS.sectionLabel)
      doc.text(label.toUpperCase(), MARGIN, y)
      doc.setDrawColor(...COLORS.cardBorder)
      doc.setLineWidth(0.3)
      doc.line(MARGIN + doc.getTextWidth(label.toUpperCase()) + 3, y - 1, PAGE_W - MARGIN, y - 1)
      y += 6
    }

    // Inicia um card (retângulo branco com borda)
    function beginCard(estimatedHeight: number): number {
      checkPageBreak(estimatedHeight)
      const cardY = y
      y += 4 // padding top
      return cardY
    }

    // Finaliza o card desenhando o retângulo
    function endCard(cardY: number) {
      const cardH = y - cardY + 4
      doc.setFillColor(...COLORS.white)
      doc.setDrawColor(...COLORS.cardBorder)
      doc.setLineWidth(0.4)
      doc.roundedRect(MARGIN, cardY, CONTENT_W, cardH, 3, 3, 'FD')
      y += 6 // gap após card
    }

    // Título de card
    function drawCardTitle(title: string, cardX: number = MARGIN + 4) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(...COLORS.textPrimary)
      doc.text(title, cardX, y)
      y += 2
      // Linha separadora fina
      doc.setDrawColor(...COLORS.cardBorder)
      doc.setLineWidth(0.3)
      doc.line(MARGIN + 4, y, PAGE_W - MARGIN - 4, y)
      y += 5
    }

    // Campo label + valor em grid
    function drawFieldGrid(fields: Array<{ label: string; value: string }>, cols: number = 3) {
      const colW = CONTENT_W / cols
      const startX = MARGIN + 4

      for (let i = 0; i < fields.length; i += cols) {
        const rowFields = fields.slice(i, i + cols)
        const rowY = y

        rowFields.forEach((field, j) => {
          const x = startX + j * colW

          // Label
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(7)
          doc.setTextColor(...COLORS.sectionLabel)
          doc.text(field.label.toUpperCase(), x, rowY)

          // Value
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          doc.setTextColor(...COLORS.textPrimary)
          doc.text(field.value || '—', x, rowY + 5)
        })

        y += 14
      }
    }

    // Texto com label acima
    function drawLabelValue(label: string, value: string, x: number = MARGIN + 4, bold: boolean = false) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(...COLORS.sectionLabel)
      doc.text(label.toUpperCase(), x, y)
      y += 4

      doc.setFont('helvetica', bold ? 'bold' : 'normal')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.textPrimary)

      // Quebra de linha automática
      const lines = doc.splitTextToSize(value, CONTENT_W - 8)
      doc.text(lines, x, y)
      y += lines.length * 5 + 3
    }

    // Info box azul com bullet list
    function drawInfoBox(label: string, items: string[]) {
      checkPageBreak(20 + items.length * 6)
      const boxX = MARGIN + 4
      const boxW = CONTENT_W - 8
      const boxH = 8 + items.length * 6 + 4

      doc.setFillColor(...COLORS.blueLight)
      doc.setDrawColor(191, 219, 254) // #bfdbfe
      doc.setLineWidth(0.4)
      doc.roundedRect(boxX, y, boxW, boxH, 2, 2, 'FD')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(...COLORS.blueDark)
      doc.text(label, boxX + 4, y + 6)

      items.forEach((item, i) => {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(...COLORS.blueMid)
        doc.text(`• ${item}`, boxX + 4, y + 12 + i * 6)
      })

      y += boxH + 4
    }

    // Card de vulnerabilidade
    function drawVulnCard(titulo: string, descricao: string, solucao: string) {
      checkPageBreak(30)
      const cardX = MARGIN + 4
      const cardW = CONTENT_W - 8

      const descLines = doc.splitTextToSize(descricao, cardW - 8)
      const cardH = 6 + 5 + descLines.length * 4.5 + 6

      doc.setFillColor(250, 250, 250)
      doc.setDrawColor(...COLORS.cardBorder)
      doc.setLineWidth(0.3)
      doc.roundedRect(cardX, y, cardW, cardH, 2, 2, 'FD')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.5)
      doc.setTextColor(...COLORS.textPrimary)
      doc.text(titulo, cardX + 4, y + 6)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.5)
      doc.setTextColor(...COLORS.textSecondary)
      doc.text(descLines, cardX + 4, y + 11)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.5)
      doc.setTextColor(...COLORS.blueMid)
      doc.text(`Solução: ${solucao}`, cardX + 4, y + 11 + descLines.length * 4.5 + 2)

      y += cardH + 3
    }

    // Badge colorido
    function drawBadge(text: string, tipo: 'prev' | 'seg' | 'timeline', x: number, badgeY: number): number {
      const bgColor = tipo === 'prev' ? COLORS.badgePrevBg : tipo === 'seg' ? COLORS.badgeSegBg : COLORS.blueDark
      const textColor = tipo === 'prev' ? COLORS.badgePrevText : tipo === 'seg' ? COLORS.badgeSegText : COLORS.white

      doc.setFontSize(8)
      const textW = doc.getTextWidth(text)
      const padH = 2.5
      const padV = 1.5
      const badgeW = textW + padH * 2
      const badgeH = 5 + padV * 2

      doc.setFillColor(...bgColor)
      doc.setDrawColor(...bgColor)
      doc.roundedRect(x, badgeY - 4, badgeW, badgeH, 1.5, 1.5, 'F')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7.5)
      doc.setTextColor(...textColor)
      doc.text(text, x + padH, badgeY)

      return badgeW
    }

    // ─── Início do documento ──────────────────────────────────────────────────

    drawHeader()

    // ═══════════════════════════════════════════════════════════════════════════
    // PÁGINA 1 — RESUMO JORNADA DE VIDA
    // ═══════════════════════════════════════════════════════════════════════════

    drawSectionLabel('Resumo Jornada de Vida')
    y += 2

    // Card: Dados do Proponente
    {
      const cardY = beginCard(60)
      drawCardTitle('Dados do Proponente')
      drawFieldGrid([
        { label: 'CPF', value: study.cpf },
        { label: 'Nome Completo', value: study.clientName },
        { label: 'Nome Social', value: '—' },
        { label: 'Data de Nascimento', value: study.dataNascimento },
        { label: 'Telefone', value: study.telefone },
        { label: 'E-mail', value: study.email },
        { label: 'Renda Mensal', value: study.rendaMensal },
        { label: 'Ocupação', value: study.ocupacao },
        { label: 'Empresa', value: study.empresa },
      ])
      endCard(cardY)
    }

    // Card: Perfil de Personalidade
    {
      const cardY = beginCard(40)
      drawCardTitle('Perfil de Personalidade')
      drawLabelValue('Tipo de Perfil', study.tipoPerfil, MARGIN + 4, true)
      drawLabelValue('Descrição', study.descricaoPerfil)
      endCard(cardY)
    }

    // Card: Cenários de Risco Atual
    {
      const cardY = beginCard(40)
      drawCardTitle('Cenários de Risco Atual')
      drawInfoBox('Impacto da perda de uma renda:', [
        'Perda imediata de 42% a 58% da renda familiar',
        'Patrimônio consumido em ~27 meses',
        'Futuro dos filhos comprometido',
      ])
      endCard(cardY)
    }

    // Card: Vulnerabilidades Identificadas
    {
      const cardY = beginCard(120)
      drawCardTitle('Vulnerabilidades Identificadas')

      const vulns = [
        { titulo: 'Ausência Prematura', descricao: 'Impacto severo no padrão de vida dos filhos e dependentes devido à perda da renda principal.', solucao: 'Seguro de Vida Vitalício' },
        { titulo: 'Invalidez Laborativa', descricao: 'Interrupção da capacidade de gerar receita por doença ou acidente, comprometendo o fluxo de caixa.', solucao: 'Seguro de Invalidez + DIT' },
        { titulo: 'Doenças Graves', descricao: 'Custos elevados de tratamento que podem consumir rapidamente a reserva de liquidez e investimentos.', solucao: 'Cobertura para Doenças Graves' },
        { titulo: 'Sucessão Patrimonial', descricao: 'Custos de inventário e impostos (ITCMD) podem bloquear até 20% do patrimônio familiar.', solucao: 'Seguro para Custeio de Inventário' },
        { titulo: 'Longevidade Financeira', descricao: 'Risco de sobreviver à capacidade da reserva financeira acumulada (viver mais que o dinheiro).', solucao: 'Aporte em Previdência Privada' },
      ]

      vulns.forEach(v => drawVulnCard(v.titulo, v.descricao, v.solucao))

      endCard(cardY)
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PÁGINA 2 — PLANEJAMENTO DE LONGO PRAZO
    // ═══════════════════════════════════════════════════════════════════════════

    addPage()

    // Card: Planejamento de Longo Prazo
    {
      const cardY = beginCard(200)
      drawCardTitle('Planejamento de Longo Prazo')

      const timeline = [
        {
          badge: 'HOJE (40 ANOS)',
          title: 'Momento Atual',
          desc: 'Estabilidade na carreira, renda sólida, patrimônio em formação (R$ 800k).',
          riskLabel: 'RISCO ATUAL',
          risks: ['ZERO Proteção', 'Perda de renda = Déficit', 'Patrimônio acaba em 27 meses', 'Família exposta'],
        },
        {
          badge: 'PRÓXIMOS 3-5 ANOS',
          title: 'Crescimento Profissional',
          desc: 'Ambição de ascender ao cargo de Diretoria. Potencial aumento de renda.',
          riskLabel: 'RISCO PROFISSIONAL',
          risks: ['Renda concentrada em CLT', 'Pretensão não alcançada', 'Estresse/Burnout'],
        },
        {
          badge: 'PRÓXIMOS 5-10 ANOS',
          title: 'Educação dos Filhos',
          desc: 'Custos elevados com escola e faculdade (R$ 300-500k). Possível intercâmbio.',
          riskLabel: 'RISCO EDUCACIONAL',
          risks: ['Inflação Educacional', 'Interrupção dos estudos', 'Perda do padrão escolar'],
        },
        {
          badge: 'PRÓXIMOS 10-20 ANOS',
          title: 'Transição de Carreira',
          desc: 'Decisão de empreender em negócio próprio.',
          riskLabel: 'RISCO FINANCEIRO',
          risks: ['Baixa reserva financeira devido a altos custos ao longo dos anos', 'Falta de backup familiar', 'Fracasso do negócio'],
        },
        {
          badge: 'EM 20 ANOS (60 ANOS)',
          title: 'Aposentadoria Planejada',
          desc: 'Objetivo: Renda mensal de R$ 29k. Necessidade de patrimônio de R$ 4,2M.',
          riskLabel: 'RISCO LONGEVIDADE',
          risks: ['Custos médicos altos', 'Depender dos filhos', 'Patrimônio insuficiente'],
        },
      ]

      timeline.forEach(item => {
        checkPageBreak(35)
        const itemY = y

        // Card do item
        const descLines = doc.splitTextToSize(item.desc, CONTENT_W - 16)
        const itemH = 8 + 5 + descLines.length * 4.5 + 5 + item.risks.length * 5 + 6

        doc.setFillColor(250, 250, 250)
        doc.setDrawColor(...COLORS.cardBorder)
        doc.setLineWidth(0.3)
        doc.roundedRect(MARGIN + 4, itemY, CONTENT_W - 8, itemH, 2, 2, 'FD')

        // Badge + título na mesma linha
        const badgeW = drawBadge(item.badge, 'timeline', MARGIN + 8, itemY + 7)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.setTextColor(...COLORS.textPrimary)
        doc.text(item.title, MARGIN + 8 + badgeW + 4, itemY + 7)

        y = itemY + 11

        // Descrição
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.setTextColor(...COLORS.textSecondary)
        doc.text(descLines, MARGIN + 8, y)
        y += descLines.length * 4.5 + 3

        // Risk label
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(7.5)
        doc.setTextColor(...COLORS.blueMid)
        doc.text(item.riskLabel, MARGIN + 8, y)
        y += 5

        // Risks
        item.risks.forEach(risk => {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(8.5)
          doc.setTextColor(...COLORS.textSecondary)
          doc.text(`• ${risk}`, MARGIN + 8, y)
          y += 5
        })

        y = itemY + itemH + 4
      })

      endCard(cardY)
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PÁGINA 3 — DETALHAMENTO DO PLANO
    // ═══════════════════════════════════════════════════════════════════════════

    addPage()

    // Card duplo: O Que Você Protege | O Que Você Garante
    {
      const cardY = beginCard(60)
      const halfW = (CONTENT_W - 4) / 2

      // Left card
      doc.setFillColor(...COLORS.white)
      doc.setDrawColor(...COLORS.cardBorder)
      doc.setLineWidth(0.4)
      doc.roundedRect(MARGIN, cardY, halfW, 58, 3, 3, 'FD')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.textPrimary)
      doc.text('O Que Você Protege', MARGIN + 4, cardY + 7)

      doc.setDrawColor(...COLORS.cardBorder)
      doc.line(MARGIN + 4, cardY + 10, MARGIN + halfW - 4, cardY + 10)

      const protecoes = [
        { label: 'Educação dos Filhos', sub: 'Faculdade + Intercâmbio', value: 'R$ 1,1 Milhão' },
        { label: 'Empreendedorismo', sub: 'Capital Inicial + Reserva', value: 'R$ 700 Mil' },
        { label: 'Aposentadoria', sub: 'Patrimônio Necessário', value: 'R$ 4 Milhões' },
        { label: 'Patrimônio Atual', sub: 'Investimentos', value: 'R$ 800 Mil' },
      ]

      let leftY = cardY + 15
      protecoes.forEach(p => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.setTextColor(...COLORS.textPrimary)
        doc.text(p.label, MARGIN + 4, leftY)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(...COLORS.textMuted)
        doc.text(p.sub, MARGIN + 4, leftY + 4)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.setTextColor(...COLORS.textPrimary)
        doc.text(p.value, MARGIN + halfW - 4 - doc.getTextWidth(p.value), leftY)

        leftY += 12
      })

      // Right card
      const rightX = MARGIN + halfW + 4
      doc.setFillColor(...COLORS.white)
      doc.setDrawColor(...COLORS.cardBorder)
      doc.setLineWidth(0.4)
      doc.roundedRect(rightX, cardY, halfW, 58, 3, 3, 'FD')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.textPrimary)
      doc.text('O Que Você Garante', rightX + 4, cardY + 7)

      doc.setDrawColor(...COLORS.cardBorder)
      doc.line(rightX + 4, cardY + 10, rightX + halfW - 4, cardY + 10)

      const garantias = ['Com Proteção', 'Patrimônio Intacto', 'Faculdade Garantida', 'Renda Vitalícia Mantida']
      let rightY = cardY + 17
      garantias.forEach(g => {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(...COLORS.greenMid)
        doc.text('✓', rightX + 4, rightY)
        doc.setTextColor(...COLORS.textPrimary)
        doc.text(g, rightX + 10, rightY)
        rightY += 9
      })

      y = cardY + 58 + 6
    }

    drawSectionLabel('Detalhamento do Plano')
    y += 2

    // Card: Dados do Plano 1 (Previdência)
    {
      const cardY = beginCard(80)
      drawCardTitle('Dados do Plano 1')

      // Tipo de investimento com badge
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(...COLORS.sectionLabel)
      doc.text('TIPO DE INVESTIMENTO', MARGIN + 4, y)
      y += 5
      drawBadge('Previdência', 'prev', MARGIN + 4, y)
      y += 8

      // Idade para aposentadoria
      drawLabelValue('Idade para Aposentadoria', study.idadeAposentadoria || '60 anos')

      // Contribuição + Aporte em 2 colunas
      const halfW = (CONTENT_W - 8) / 2
      const colY = y
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(...COLORS.sectionLabel)
      doc.text('CONTRIBUIÇÃO MENSAL', MARGIN + 4, colY)
      doc.text('APORTE INICIAL', MARGIN + 4 + halfW, colY)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.textPrimary)
      doc.text(study.contribuicaoMensal || 'R$ 0,00', MARGIN + 4, colY + 5)
      doc.text(study.aporteInicial || 'R$ 0,00', MARGIN + 4 + halfW, colY + 5)
      y = colY + 12

      // Tipo de plano
      drawLabelValue('Tipo de Plano', study.tipoPlano)

      // Fundo selecionado
      if (study.fundo) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(...COLORS.sectionLabel)
        doc.text('FUNDO SELECIONADO', MARGIN + 4, y)
        y += 5

        // Sub-card do fundo
        const fundoLines1 = doc.splitTextToSize(study.fundo.nome, CONTENT_W - 16)
        const fundoH = 6 + fundoLines1.length * 5 + 5 + 5 + 5

        doc.setFillColor(250, 250, 250)
        doc.setDrawColor(...COLORS.cardBorder)
        doc.setLineWidth(0.3)
        doc.roundedRect(MARGIN + 4, y, CONTENT_W - 8, fundoH, 2, 2, 'FD')

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.setTextColor(...COLORS.textPrimary)
        doc.text(fundoLines1, MARGIN + 8, y + 5)

        const detY = y + 5 + fundoLines1.length * 5
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7.5)
        doc.setTextColor(...COLORS.textSecondary)
        doc.text(
          `${study.fundo.cnpj}    Processo SUSEP: ${study.fundo.processoSusep}    Carregamento: ${study.fundo.carregamento}`,
          MARGIN + 8, detY
        )
        doc.text(
          `Taxa Máx. Adm.: ${study.fundo.taxaAdm}    Rentabilidade: ${study.fundo.rentabilidade}    Classificação: ${study.fundo.classificacao}`,
          MARGIN + 8, detY + 5
        )
        doc.text(
          `Contribuição Mensal: ${study.contribuicaoMensal} (${study.fundo.percContribuicao})    Aporte Inicial: ${study.aporteInicial} (${study.fundo.percAporte})`,
          MARGIN + 8, detY + 10
        )

        y += fundoH + 4
      }

      endCard(cardY)
    }

    // Card: Dados do Plano 2 (Seguro de Vida) - se houver coberturas
    if (study.coberturas && study.coberturas.length > 0) {
      checkPageBreak(20)

      const cardY = beginCard(20 + study.coberturas.length * 14 + 20)
      drawCardTitle('Dados do Plano 2')

      // Tipo de investimento com badge
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(...COLORS.sectionLabel)
      doc.text('TIPO DE INVESTIMENTO', MARGIN + 4, y)
      y += 5
      drawBadge('Seguro de Vida', 'seg', MARGIN + 4, y)
      y += 8

      if (study.produtoSeguro) {
        drawLabelValue('Produto Recomendado', study.produtoSeguro, MARGIN + 4, true)
      }

      // Tabela de coberturas
      autoTable(doc, {
        startY: y,
        margin: { left: MARGIN + 4, right: MARGIN + 4 },
        head: [['COBERTURA', 'VIGÊNCIA', 'PRAZO DE PAGAMENTO', 'CAPITAL SEGURADO', 'CONTRIBUIÇÃO MENSAL']],
        body: study.coberturas.map(c => [
          c.cobertura,
          c.vigencia,
          c.prazoPagamento,
          c.capitalSegurado,
          c.contribuicaoMensal,
        ]),
        styles: {
          fontSize: 8,
          cellPadding: 3,
          textColor: COLORS.textPrimary,
          lineColor: COLORS.cardBorder,
          lineWidth: 0.3,
        },
        headStyles: {
          fillColor: COLORS.footerBg,
          textColor: COLORS.sectionLabel,
          fontStyle: 'normal',
          fontSize: 7,
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
        columnStyles: {
          0: { cellWidth: 48 },
          1: { cellWidth: 22, halign: 'center' },
          2: { cellWidth: 28, halign: 'center' },
          3: { cellWidth: 32, halign: 'right' },
          4: { cellWidth: 32, halign: 'right', fontStyle: 'bold' },
        },
      })

      y = (doc as any).lastAutoTable.finalY + 4
      endCard(cardY)
    }

    // ─── Footer bar: Investimento Mensal ─────────────────────────────────────
    checkPageBreak(20)

    const footerBarY = y
    doc.setFillColor(...COLORS.footerBg)
    doc.setDrawColor(...COLORS.cardBorder)
    doc.setLineWidth(0.4)
    doc.roundedRect(MARGIN, footerBarY, CONTENT_W, 14, 2, 2, 'FD')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...COLORS.textPrimary)
    doc.text('Investimento Mensal', MARGIN + 6, footerBarY + 6)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...COLORS.textMuted)
    doc.text('Apenas 30% do seu saldo mensal', MARGIN + 6, footerBarY + 11)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...COLORS.textPrimary)
    doc.text(study.investimentoMensal, PAGE_W - MARGIN - 6, footerBarY + 9, { align: 'right' })

    y = footerBarY + 18

    // ─── Nota de validade ─────────────────────────────────────────────────────
    checkPageBreak(12)
    doc.setFillColor(...COLORS.white)
    doc.setDrawColor(...COLORS.cardBorder)
    doc.setLineWidth(0.4)
    doc.roundedRect(MARGIN, y, CONTENT_W, 10, 2, 2, 'FD')

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8.5)
    doc.setTextColor(...COLORS.textMuted)
    doc.text(
      `Estudo com validade de 7 dias úteis a partir da data ${study.dataEstudo}.`,
      MARGIN + 6,
      y + 6.5
    )

    // ─── Salvar PDF ───────────────────────────────────────────────────────────
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yy = String(today.getFullYear()).slice(-2)
    const dateStr = `${dd}${mm}${yy}`

    const clientNameClean = study.clientName.replace(/\s+/g, '')
    const versao = study.versao ? `_${study.versao}` : ''
    const fileName = `RevisãodoEstudo_${clientNameClean}_${dateStr}${versao}.pdf`

    doc.save(fileName)
  }

  return { generatePdf }
}
