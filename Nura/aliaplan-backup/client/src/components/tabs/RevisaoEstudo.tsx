import { useState, useRef } from "react";
import { useJornada } from "@/contexts/JornadaContext";
import { toast } from "sonner";
import { ALIA_LOGO_BASE64 } from "@/data/aliaLogoBase64";

// Tabela de lookup Capital Segurado e Contribuição Mensal por cobertura e vigência (espelho de DetalhamentoPlano)
const HORIZONTE_VALORES: Record<string, Record<string, { cs: string; cm: string }>> = {
  "Morte Natural ou Acidental + Adiantamento por Doença Terminal (obrigatório)": {
    "Vitalícia":          { cs: "R$ 2.952.000,00", cm: "R$ 1.180,80" },
    "Temporária 25 anos": { cs: "R$ 2.509.000,00", cm: "R$ 1.003,60" },
    "Temporária 20 anos": { cs: "R$ 2.066.000,00", cm: "R$ 826,40" },
    "Temporária 15 anos": { cs: "R$ 1.624.000,00", cm: "R$ 649,60" },
    "Temporária 10 anos": { cs: "R$ 1.181.000,00", cm: "R$ 472,40" },
    "Temporária 5 anos":  { cs: "R$ 738.000,00",   cm: "R$ 295,20" },
  },
  "Indenização Especial de Morte por Acidente (IEA)": {
    "Vitalícia":          { cs: "R$ 1.481.000,00", cm: "R$ 592,40" },
    "Temporária 25 anos": { cs: "R$ 1.259.000,00", cm: "R$ 503,60" },
    "Temporária 20 anos": { cs: "R$ 1.037.000,00", cm: "R$ 414,80" },
    "Temporária 15 anos": { cs: "R$ 815.000,00",   cm: "R$ 326,00" },
    "Temporária 10 anos": { cs: "R$ 592.000,00",   cm: "R$ 236,80" },
    "Temporária 5 anos":  { cs: "R$ 370.000,00",   cm: "R$ 148,00" },
  },
  "Invalidez Permanente por Acidente - Total ou Parcial (IPA)": {
    "Vitalícia":          { cs: "R$ 1.481.000,00", cm: "R$ 592,40" },
    "Temporária 25 anos": { cs: "R$ 1.259.000,00", cm: "R$ 503,60" },
    "Temporária 20 anos": { cs: "R$ 1.037.000,00", cm: "R$ 414,80" },
    "Temporária 15 anos": { cs: "R$ 815.000,00",   cm: "R$ 326,00" },
    "Temporária 10 anos": { cs: "R$ 592.000,00",   cm: "R$ 236,80" },
    "Temporária 5 anos":  { cs: "R$ 370.000,00",   cm: "R$ 148,00" },
  },
  "Indenização Especial de Invalidez por Doença (IED)": {
    "Vitalícia":          { cs: "R$ 156.000,00",   cm: "R$ 62,40" },
    "Temporária 25 anos": { cs: "R$ 133.000,00",   cm: "R$ 53,20" },
    "Temporária 20 anos": { cs: "R$ 109.000,00",   cm: "R$ 43,60" },
    "Temporária 15 anos": { cs: "R$ 86.000,00",    cm: "R$ 34,40" },
    "Temporária 10 anos": { cs: "R$ 62.000,00",    cm: "R$ 24,80" },
    "Temporária 5 anos":  { cs: "R$ 39.000,00",    cm: "R$ 15,60" },
  },
  "Doenças Graves (DG)": {
    "Vitalícia":          { cs: "R$ 156.000,00",   cm: "R$ 62,40" },
    "Temporária 25 anos": { cs: "R$ 133.000,00",   cm: "R$ 53,20" },
    "Temporária 20 anos": { cs: "R$ 109.000,00",   cm: "R$ 43,60" },
    "Temporária 15 anos": { cs: "R$ 86.000,00",    cm: "R$ 34,40" },
    "Temporária 10 anos": { cs: "R$ 62.000,00",    cm: "R$ 24,80" },
    "Temporária 5 anos":  { cs: "R$ 39.000,00",    cm: "R$ 15,60" },
  },
  "Diária por Incapacidade Temporária (DIT)": {
    "Vitalícia":          { cs: "R$ 12.000,00",    cm: "R$ 4,80" },
    "Temporária 25 anos": { cs: "R$ 11.000,00",    cm: "R$ 4,40" },
    "Temporária 20 anos": { cs: "R$ 9.000,00",     cm: "R$ 3,60" },
    "Temporária 15 anos": { cs: "R$ 7.000,00",     cm: "R$ 2,80" },
    "Temporária 10 anos": { cs: "R$ 5.000,00",     cm: "R$ 2,00" },
    "Temporária 5 anos":  { cs: "R$ 3.000,00",     cm: "R$ 1,20" },
  },
  "Diária por Internação Hospitalar (DIH)": {
    "Vitalícia":          { cs: "R$ 6.000,00",     cm: "R$ 2,40" },
    "Temporária 25 anos": { cs: "R$ 5.000,00",     cm: "R$ 2,00" },
    "Temporária 20 anos": { cs: "R$ 4.000,00",     cm: "R$ 1,60" },
    "Temporária 15 anos": { cs: "R$ 3.000,00",     cm: "R$ 1,20" },
    "Temporária 10 anos": { cs: "R$ 2.000,00",     cm: "R$ 0,80" },
    "Temporária 5 anos":  { cs: "R$ 2.000,00",     cm: "R$ 0,80" },
  },
  "Serviço de Assistência Funeral (SAF)": {
    "Vitalícia":          { cs: "R$ 6.000,00",     cm: "R$ 2,40" },
    "Temporária 25 anos": { cs: "R$ 5.000,00",     cm: "R$ 2,00" },
    "Temporária 20 anos": { cs: "R$ 4.000,00",     cm: "R$ 1,60" },
    "Temporária 15 anos": { cs: "R$ 3.000,00",     cm: "R$ 1,20" },
    "Temporária 10 anos": { cs: "R$ 2.000,00",     cm: "R$ 0,80" },
    "Temporária 5 anos":  { cs: "R$ 2.000,00",     cm: "R$ 0,80" },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

// Cabeçalho de página do PDF: logo ALIA alinhado à direita
function PdfPageHeader({ logoBase64 }: { logoBase64: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 10,
        marginBottom: 8,
        borderBottom: "1px solid oklch(90% 0.005 260)",
      }}
    >
      <img
        src={`data:image/png;base64,${logoBase64}`}
        alt="ALIA"
        style={{ height: 28, width: "auto", objectFit: "contain" }}
      />
    </div>
  );
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div
      style={{
        background: "rgba(241,245,249,0.5)",
        borderRadius: 8,
        padding: "5px 12px",
        border: "1px solid oklch(90% 0.005 260)",
        marginBottom: 12,
        marginTop: 8,
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "oklch(45% 0.02 250)",
        }}
      >
        {title}
      </p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid oklch(90% 0.005 260)",
        borderRadius: 8,
        padding: 24,
        marginBottom: 12,
      }}
    >
      <h3
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "oklch(20% 0.05 250)",
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: "1px solid oklch(90% 0.005 260)",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function FieldDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "oklch(55% 0.02 250)",
          display: "block",
          marginBottom: 2,
        }}
      >
        {label}
      </span>
      <p style={{ fontSize: 14, color: "oklch(20% 0.05 250)" }}>{value || "—"}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RevisaoEstudo() {
  const { resumoData, detalhamentoData } = useJornada();
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfContentRef = useRef<HTMLDivElement>(null);
  const pdfGroup1Ref = useRef<HTMLDivElement>(null); // Pág 1: Perfil, Cenários, Vulnerabilidades
  const pdfGroup2Ref = useRef<HTMLDivElement>(null); // Pág 2: Planejamento de Longo Prazo
  const pdfGroup3Ref = useRef<HTMLDivElement>(null); // Pág 3: Protege/Garante, Dados Proponente, Plano 1
  const pdfGroup4Ref = useRef<HTMLDivElement>(null); // Pág 4: Plano 2, Investimento Mensal, Validade
  const pdfCoverRef = useRef<HTMLDivElement>(null);  // Capa do PDF

  const { proponente, planos } = detalhamentoData;
  const { solucoes, protege, garante, visaoLongoPrazo } = resumoData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const [y, m, d] = dateStr.split("-");
    if (!y || !m || !d) return dateStr;
    return `${d}/${m}/${y}`;
  };

  const parseValue = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9,.]/g, "").replace(/\./g, "").replace(",", "."));
    return isNaN(n) ? 0 : n;
  };

  const totalInvestimento = parseValue(solucoes.protecao.valor) + parseValue(solucoes.previdencia.valor);
  const totalPercentual = parseFloat(solucoes.protecao.percentual) + parseFloat(solucoes.previdencia.percentual);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const { toPng } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");

      // A4 a 96dpi = 794px de largura; usamos pixelRatio 2 → 1588px
      const A4_WIDTH_MM = 210;
      const A4_HEIGHT_MM = 297;
      const MARGIN_MM = 10;
      const CONTENT_WIDTH_MM = A4_WIDTH_MM - MARGIN_MM * 2;
      // Largura de captura: equivalente a A4 menos margens em pixels (96dpi)
      const CAPTURE_WIDTH_PX = 794 - 76; // ~718px de conteúdo

      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

      const groups = [
        pdfGroup1Ref.current,  // Pág 1: Perfil, Cenários, Vulnerabilidades (fundo branco)
        pdfGroup2Ref.current,  // Pág 2: Planejamento de Longo Prazo
        pdfGroup3Ref.current,  // Pág 3: Protege/Garante + Dados Proponente + Plano 1
        pdfGroup4Ref.current,  // Pág 4: Plano 2 + Investimento Mensal + Validade
      ].filter(Boolean) as HTMLElement[];

      for (let gi = 0; gi < groups.length; gi++) {
        const group = groups[gi];

        // Inserir cabeçalho com logo ALIA dinamicamente (apenas durante a captura do PDF)
        const pdfHeader = document.createElement("div");
        pdfHeader.style.cssText = [
          "display:flex",
          "justify-content:flex-end",
          "align-items:center",
          "padding-bottom:10px",
          "margin-bottom:8px",
          "border-bottom:1px solid #e2e8f0",
        ].join(";");
        const logoImg = document.createElement("img");
        logoImg.src = `data:image/png;base64,${ALIA_LOGO_BASE64}`;
        logoImg.alt = "ALIA";
        logoImg.style.cssText = "height:28px;width:auto;object-fit:contain";
        pdfHeader.appendChild(logoImg);
        group.insertBefore(pdfHeader, group.firstChild);

        // Forçar largura de captura para evitar distorção
        const originalWidth = group.style.width;
        const originalVisibility = group.style.visibility;
        group.style.width = `${CAPTURE_WIDTH_PX}px`;
        // Tornar visível durante a captura (a capa usa visibility:hidden para não sobrepor o conteúdo)
        group.style.visibility = "visible";

        // Todos os grupos têm fundo branco
        const bgColor = "#ffffff";
        const dataUrl = await toPng(group, {
          pixelRatio: 2,
          backgroundColor: bgColor,
          width: CAPTURE_WIDTH_PX,
          skipFonts: true,
          cacheBust: true,
        });

        group.style.width = originalWidth;
        group.style.visibility = originalVisibility;
        // Remover cabeçalho dinâmico após a captura
        group.removeChild(pdfHeader);

        // Calcular altura proporcional em mm
        const img = new Image();
        await new Promise<void>((resolve) => { img.onload = () => resolve(); img.src = dataUrl; });
        // Altura real em mm: (altura_px / largura_px) * largura_mm_conteúdo
        const imgHeightMM = (img.naturalHeight / img.naturalWidth) * CONTENT_WIDTH_MM;

        if (gi > 0) pdf.addPage();

        // Se a imagem for maior que a página, escalar para caber
        if (imgHeightMM <= A4_HEIGHT_MM - MARGIN_MM * 2) {
          // Cabe na página: centralizar verticalmente
          const topMargin = MARGIN_MM;
          pdf.addImage(dataUrl, "PNG", MARGIN_MM, topMargin, CONTENT_WIDTH_MM, imgHeightMM, undefined, "FAST");
        } else {
          // Não cabe: escalar para preencher a página inteira
          const scale = (A4_HEIGHT_MM - MARGIN_MM * 2) / imgHeightMM;
          const scaledW = CONTENT_WIDTH_MM * scale;
          const scaledH = imgHeightMM * scale;
          const leftOffset = MARGIN_MM + (CONTENT_WIDTH_MM - scaledW) / 2;
          pdf.addImage(dataUrl, "PNG", leftOffset, MARGIN_MM, scaledW, scaledH, undefined, "FAST");
        }
      }

      const now = new Date();
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const aa = String(now.getFullYear()).slice(-2);
      const nomeArquivo = `Revisão do Estudo_${proponente.nomeCompleto || "Proponente"}_${dd}${mm}${aa}.pdf`;
      pdf.save(nomeArquivo);
      toast.success("PDF gerado com sucesso!", { description: "O download foi iniciado." });
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      toast.error("Erro ao gerar PDF", { description: String(err) });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {/* Header — excluído do PDF */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "oklch(95% 0.005 260)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            style={{ width: 16, height: 16, color: "oklch(45% 0.02 250)" } as React.CSSProperties}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: "oklch(20% 0.05 250)" }}>Revisão do Estudo</h1>
          <p style={{ fontSize: 12, color: "oklch(55% 0.02 250)", marginTop: 2 }}>
            Confirme todas as informações antes de finalizar. Esta tela é somente leitura.
          </p>
        </div>
      </div>

      {/* Capa do PDF — oculta na tela, capturada apenas no PDF */}
      <div
        ref={pdfCoverRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          visibility: "hidden",
          width: 718,
          height: 1016, // proporção A4 a 96dpi: 794×1123 → conteúdo 718×1016
          background: "#0f172a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          boxSizing: "border-box",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logotipo ALIA — centralizado */}
        <img
          src={`data:image/png;base64,${ALIA_LOGO_BASE64}`}
          alt="ALIA"
          style={{ width: 200, objectFit: "contain", marginBottom: 64 }}
        />

        {/* Linha decorativa */}
        <div style={{ width: 56, height: 2, background: "rgba(255,255,255,0.25)", marginBottom: 48 }} />

        {/* Título do documento */}
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 24, textAlign: "center" }}>
          Estudo Personalizado
        </p>

        {/* Nome do proponente */}
        <h1 style={{ fontSize: 34, fontWeight: 700, color: "#ffffff", textAlign: "center", lineHeight: 1.25, marginBottom: 20, maxWidth: 540 }}>
          {proponente.nomeCompleto || "Proponente"}
        </h1>

        {/* CPF */}
        {proponente.cpf && (
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 0 }}>
            CPF: {proponente.cpf}
          </p>
        )}

        {/* Linha decorativa inferior */}
        <div style={{ width: 56, height: 2, background: "rgba(255,255,255,0.25)", marginTop: 48, marginBottom: 48 }} />

        {/* Data de emissão */}
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textAlign: "center" }}>
          Data de Emissão: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Conteúdo capturado no PDF */}
      <div ref={pdfContentRef}>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* GRUPO PDF 1: Resumo Parte 1 — Perfil, Cenários, Vulnerabilidades      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div ref={pdfGroup1Ref} style={{ padding: "16px 0" }}>
      <SectionDivider title="Resumo Jornada de Vida" />

      {/* 0. Dados do Proponente */}
      <SectionCard title="Dados do Proponente">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px 32px" }}>
          <FieldDisplay label="CPF" value={proponente.cpf} />
          <FieldDisplay label="Nome Completo" value={proponente.nomeCompleto} />
          <FieldDisplay label="Nome Social" value={proponente.nomeSocial || "—"} />
          <FieldDisplay label="Data de Nascimento" value={formatDate(proponente.dataNascimento)} />
          <FieldDisplay label="Telefone" value={proponente.telefone} />
          <FieldDisplay label="E-mail" value={proponente.email} />
          <FieldDisplay label="Renda Mensal" value={proponente.rendaMensal} />
          <FieldDisplay label="Ocupação" value={proponente.ocupacao} />
          <FieldDisplay label="Empresa" value={proponente.empresa} />
        </div>
      </SectionCard>

      {/* 1.1 Perfil de Personalidade */}
      <SectionCard title="Perfil de Personalidade">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <FieldDisplay label="Tipo de Perfil" value={resumoData.perfil.tipo} />
          <FieldDisplay label="Descrição" value={resumoData.perfil.descricao} />
        </div>
      </SectionCard>

      {/* 1.2 Cenários de Risco Atual */}
      <SectionCard title="Cenários de Risco Atual">
        <div style={{ background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: 8, padding: "12px 16px" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)", marginBottom: 8 }}>
            {resumoData.cenario.titulo}
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {resumoData.cenario.itens.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#1e40af" }}>
                <span style={{ marginTop: 6, width: 6, height: 6, borderRadius: "50%", background: "#1e40af", flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </SectionCard>

      {/* 1.3 Vulnerabilidades Identificadas */}
      <SectionCard title="Vulnerabilidades Identificadas">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {resumoData.vulnerabilidades.map((vuln, i) => (
            <div
              key={i}
              style={{
                background: "#f8fafc",
                border: "1px solid oklch(90% 0.005 260)",
                borderRadius: 8,
                padding: 12,
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)" }}>{vuln.titulo}</p>
              <p style={{ fontSize: 12, color: "oklch(45% 0.02 250)", marginTop: 2 }}>{vuln.descricao}</p>
              <p style={{ fontSize: 12, color: "#1e40af", fontWeight: 500, marginTop: 4 }}>
                Solução: {vuln.solucao}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      </div>{/* /pdfGroup1Ref */}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* GRUPO PDF 2: Planejamento de Longo Prazo                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div ref={pdfGroup2Ref} style={{ padding: "16px 0" }}>

      {/* 1.4 Planejamento de Longo Prazo */}
      <SectionCard title="Planejamento de Longo Prazo">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {resumoData.timeline.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#f8fafc",
                border: "1px solid oklch(90% 0.005 260)",
                borderRadius: 8,
                padding: "12px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#1e40af",
                    background: "#dbeafe",
                    padding: "2px 8px",
                    borderRadius: 4,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.periodo}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)" }}>{item.titulo}</span>
              </div>
              <p style={{ fontSize: 13, color: "oklch(45% 0.02 250)", marginBottom: 8 }}>{item.descricao}</p>
              {item.riscos.length > 0 && (
                <div>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#1e40af",
                      marginBottom: 4,
                    }}
                  >
                    {item.riscoLabel}
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {item.riscos.map((r, ri) => (
                      <li key={ri} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 12, color: "oklch(45% 0.02 250)" }}>
                        <span style={{ marginTop: 5, width: 5, height: 5, borderRadius: "50%", background: "oklch(55% 0.02 250)", flexShrink: 0 }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        {visaoLongoPrazo && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: "oklch(97% 0.003 260)", borderRadius: 8, borderLeft: "3px solid oklch(75% 0.03 250)" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "oklch(45% 0.02 250)", marginBottom: 4 }}>Visão de Longo Prazo:</p>
            <p style={{ fontSize: 13, color: "oklch(35% 0.03 250)", lineHeight: 1.6 }}>{visaoLongoPrazo}</p>
          </div>
        )}
      </SectionCard>

      </div>{/* /pdfGroup2Ref — fim: apenas Planejamento de Longo Prazo */}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* GRUPO PDF 3: Protege/Garante + Dados Proponente + Plano 1             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div ref={pdfGroup3Ref} style={{ padding: "16px 0" }}>
      {/* 1.5 O Que Você Protege + O Que Você Garante (lado a lado) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {/* O Que Você Protege */}
        <div
          style={{
            background: "#fff",
            border: "1px solid oklch(90% 0.005 260)",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <h3
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "oklch(20% 0.05 250)",
              marginBottom: 14,
              paddingBottom: 10,
              borderBottom: "1px solid oklch(90% 0.005 260)",
            }}
          >
            O Que Você Protege
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {protege.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "oklch(20% 0.05 250)" }}>{item.titulo}</p>
                  <p style={{ fontSize: 11, color: "oklch(55% 0.02 250)" }}>{item.subtitulo}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)", whiteSpace: "nowrap" }}>
                  {item.valor}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* O Que Você Garante */}
        <div
          style={{
            background: "#fff",
            border: "1px solid oklch(90% 0.005 260)",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <h3
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "oklch(20% 0.05 250)",
              marginBottom: 14,
              paddingBottom: 10,
              borderBottom: "1px solid oklch(90% 0.005 260)",
            }}
          >
            O Que Você Garante
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg style={{ width: 14, height: 14, color: "#16a34a", flexShrink: 0 } as React.CSSProperties} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>Com Proteção</span>
            </div>
            {garante.comProtecao.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <svg style={{ width: 14, height: 14, color: "#16a34a", flexShrink: 0 } as React.CSSProperties} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider title="Detalhamento do Plano" />

      {/* 2.1 Dados do Plano 1 (apenas o primeiro plano no grupo 3) */}
      {planos.slice(0, 1).map((plano, idx) => {
        const isPrevidencia = plano.tipo === "previdencia";
        const isSeguro = plano.tipo === "seguro";

        return (
          <SectionCard key={plano.id} title={`Dados do Plano ${idx + 1}`}>
            {/* Tipo de Investimento */}
            <div style={{ marginBottom: 16 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "oklch(55% 0.02 250)",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Tipo de Investimento
              </span>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "oklch(20% 0.05 250)",
                  background: "oklch(95% 0.005 260)",
                  border: "1px solid oklch(85% 0.005 260)",
                  borderRadius: 6,
                  padding: "4px 12px",
                }}
              >
                {isPrevidencia ? "Previdência" : "Seguro de Vida"}
              </span>
            </div>

            {/* Previdência */}
            {isPrevidencia && (
              <>
                <div style={{ marginBottom: 16 }}>
                  <FieldDisplay label="Idade para Aposentadoria" value={plano.idadeAposentadoria} />
                </div>
                {plano.subPlanos.map((sub, si) => (
                  <div key={sub.id} style={{ marginBottom: si < plano.subPlanos.length - 1 ? 20 : 0 }}>
                    {plano.subPlanos.length > 1 && (
                      <p style={{ fontSize: 12, fontWeight: 600, color: "oklch(45% 0.02 250)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Tipo de Plano {si + 1}: {sub.tipoPlano}
                      </p>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px", marginBottom: 12 }}>
                      <FieldDisplay label="Contribuição Mensal" value={sub.contribuicaoMensal} />
                      <FieldDisplay label="Aporte Inicial" value={sub.aporteInicial} />
                      <FieldDisplay label="Tipo de Plano" value={sub.tipoPlano} />
                    </div>
                    {sub.fundos.length > 0 && (
                      <div>
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "oklch(55% 0.02 250)",
                            marginBottom: 8,
                          }}
                        >
                          Fundo Selecionado
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {sub.fundos.map((fundo) => (
                            <div
                              key={fundo.cnpj}
                              style={{
                                background: "#f8fafc",
                                border: "1px solid oklch(90% 0.005 260)",
                                borderRadius: 8,
                                padding: "10px 14px",
                              }}
                            >
                              {/* Linha 1: Nome do fundo */}
                              <p style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)", margin: 0, marginBottom: 6, whiteSpace: "normal", wordBreak: "break-word" }}>{fundo.nome}</p>
                              {/* Linha 2: CNPJ + SUSEP + Carregamento */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 16px", fontSize: 11, color: "oklch(45% 0.02 250)", marginBottom: 4 }}>
                                <span>{fundo.cnpj}</span>
                                {fundo.processoSusep && (
                                  <span>Processo SUSEP: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.processoSusep}</span></span>
                                )}
                                <span>Carregamento: <span style={{ color: "oklch(20% 0.05 250)" }}>0%</span></span>
                              </div>
                              {/* Linha 3: Taxa Máx. Adm. + Rentabilidade + Classificação */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 16px", fontSize: 11, color: "oklch(45% 0.02 250)", marginBottom: 4 }}>
                                <span>Taxa Máx. Adm.: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.taxaAdmMax || fundo.taxaAdm || "-"}</span></span>
                                <span>Rentabilidade: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.rentabilidade || "-"}</span></span>
                                <span>Classificação: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.classificacao || "-"}</span></span>
                                {fundo.taxaPerformance && (
                                  <span>Taxa de Performance: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.taxaPerformance}</span></span>
                                )}
                              </div>
                              {/* Linha 4: Contribuição Mensal + Aporte Inicial (mesma linha) */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 24px", fontSize: 11 }}>
                                <span style={{ color: "oklch(45% 0.02 250)" }}>Contribuição Mensal: <span style={{ fontWeight: 600, color: "oklch(20% 0.05 250)" }}>{fundo.valorAtribuido || "-"}</span> <span style={{ color: "oklch(55% 0.02 250)" }}>({fundo.percentual}%)</span></span>
                                <span style={{ color: "oklch(45% 0.02 250)" }}>Aporte Inicial: <span style={{ fontWeight: 600, color: "oklch(20% 0.05 250)" }}>{fundo.valorAporte || "-"}</span>{fundo.percentualAporte && fundo.percentualAporte !== "0" && <span style={{ color: "oklch(55% 0.02 250)" }}> ({fundo.percentualAporte}%)</span>}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* Seguro de Vida */}
            {isSeguro && (
              <>
                {plano.produtoRecomendado && (
                  <div style={{ marginBottom: 16 }}>
                    <FieldDisplay label="Produto Recomendado" value={plano.produtoRecomendado} />
                  </div>
                )}
                {plano.coberturas.length > 0 && (
                  <div style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, overflow: "hidden" }}>
                    <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse", tableLayout: "fixed" }}>
                      <colgroup>
                        <col style={{ width: "auto" }} />
                        <col style={{ width: 148 }} />
                        <col style={{ width: 120 }} />
                        <col style={{ width: 138 }} />
                        <col style={{ width: 138 }} />
                      </colgroup>
                      <thead>
                        <tr style={{ background: "oklch(95% 0.005 260)", borderBottom: "1px solid oklch(90% 0.005 260)" }}>
                          <th style={{ textAlign: "left", padding: "7px 16px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap", overflow: "hidden" }}>Cobertura</th>
                          <th style={{ textAlign: "center", padding: "7px 6px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Vigência</th>
                          <th style={{ textAlign: "center", padding: "7px 6px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Prazo de Pagamento</th>
                          <th style={{ textAlign: "right", padding: "7px 6px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Capital Segurado</th>
                          <th style={{ textAlign: "right", padding: "7px 16px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Contribuição Mensal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plano.coberturas.map((cob, ci) => {
                          const lookupR = HORIZONTE_VALORES[cob.nome]?.[cob.vigencia];
                          const csR = cob.capitalSegurado || lookupR?.cs || "—";
                          const cmR = cob.contribuicaoMensal || lookupR?.cm || "—";
                          return (
                          <tr
                            key={ci}
                            style={{
                              borderBottom: ci < plano.coberturas.length - 1 ? "1px solid oklch(93% 0.003 260)" : "none",
                            }}
                          >
                            <td style={{ padding: "10px 10px", color: "oklch(30% 0.05 250)", fontWeight: ci === 0 ? 600 : 400, fontSize: 11, whiteSpace: "normal", wordBreak: "break-word" }}>{cob.nome}</td>
                            <td style={{ padding: "10px 6px", textAlign: "center", fontSize: 11, color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>{cob.vigencia || "—"}</td>
                            <td style={{ padding: "10px 6px", textAlign: "center", fontSize: 11, color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>{cob.prazoPagamento || "—"}</td>
                            <td style={{ padding: "10px 6px", textAlign: "right", fontSize: 11, color: "oklch(30% 0.05 250)", fontWeight: 500, whiteSpace: "nowrap" }}>{csR}</td>
                            <td style={{ padding: "10px 16px", textAlign: "right", fontSize: 11, color: "oklch(20% 0.1 145)", fontWeight: 600, whiteSpace: "nowrap" }}>{cmR}</td>
                          </tr>
                          );
                        })}
                      </tbody>
                      {/* Linha de Total */}
                      {(() => {
                        const total = plano.coberturas.reduce((acc, cob) => {
                          const val = cob.contribuicaoMensal || "";
                          const num = parseFloat(val.replace(/[R$\s.]/g, "").replace(",", ".")) || 0;
                          return acc + num;
                        }, 0);
                        return total > 0 ? (
                          <tfoot>
                            <tr style={{ background: "oklch(95% 0.005 260)", borderTop: "2px solid oklch(88% 0.005 260)" }}>
                              <td colSpan={4} style={{ padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "oklch(30% 0.05 250)", textAlign: "right" }}>Valor Total</td>
                              <td style={{ padding: "8px 16px", textAlign: "right", fontSize: 12, fontWeight: 700, color: "oklch(20% 0.1 145)", whiteSpace: "nowrap" }}>
                                {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                              </td>
                            </tr>
                          </tfoot>
                        ) : null;
                      })()}
                    </table>
                  </div>
                )}
              </>
            )}
          </SectionCard>
        );
      })}

      </div>{/* /pdfGroup3Ref */}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* GRUPO PDF 4: Plano 2 + Investimento Mensal + Validade do Estudo       */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div ref={pdfGroup4Ref} style={{ padding: "16px 0" }}>

      {/* Plano 2 em diante */}
      {planos.slice(1).map((plano, idx) => {
        const isPrevidencia = plano.tipo === "previdencia";
        const isSeguro = plano.tipo === "seguro";
        return (
          <SectionCard key={plano.id} title={`Dados do Plano ${idx + 2}`}>
            {/* Tipo de Investimento */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "oklch(55% 0.02 250)", display: "block", marginBottom: 4 }}>Tipo de Investimento</span>
              <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "oklch(20% 0.05 250)", background: "oklch(95% 0.005 260)", border: "1px solid oklch(85% 0.005 260)", borderRadius: 6, padding: "4px 12px" }}>
                {isPrevidencia ? "Previdência" : "Seguro de Vida"}
              </span>
            </div>
            {isPrevidencia && (
              <>
                <div style={{ marginBottom: 16 }}><FieldDisplay label="Idade para Aposentadoria" value={plano.idadeAposentadoria} /></div>
                {plano.subPlanos.map((sub, si) => (
                  <div key={sub.id} style={{ marginBottom: si < plano.subPlanos.length - 1 ? 20 : 0 }}>
                    {plano.subPlanos.length > 1 && (
                      <p style={{ fontSize: 12, fontWeight: 600, color: "oklch(45% 0.02 250)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Tipo de Plano {si + 1}: {sub.tipoPlano}</p>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px", marginBottom: 12 }}>
                      <FieldDisplay label="Contribuição Mensal" value={sub.contribuicaoMensal} />
                      <FieldDisplay label="Aporte Inicial" value={sub.aporteInicial} />
                      <FieldDisplay label="Tipo de Plano" value={sub.tipoPlano} />
                    </div>
                    {sub.fundos.length > 0 && (
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "oklch(55% 0.02 250)", marginBottom: 8 }}>Fundo Selecionado</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {sub.fundos.map((fundo) => (
                            <div key={fundo.cnpj} style={{ background: "#f8fafc", border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, padding: "10px 14px" }}>
                              {/* Linha 1: Nome do fundo */}
                              <p style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)", margin: 0, marginBottom: 6, whiteSpace: "normal", wordBreak: "break-word" }}>{fundo.nome}</p>
                              {/* Linha 2: CNPJ + SUSEP + Carregamento */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 16px", fontSize: 11, color: "oklch(45% 0.02 250)", marginBottom: 4 }}>
                                <span>{fundo.cnpj}</span>
                                {fundo.processoSusep && <span>Processo SUSEP: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.processoSusep}</span></span>}
                                <span>Carregamento: <span style={{ color: "oklch(20% 0.05 250)" }}>0%</span></span>
                              </div>
                              {/* Linha 3: Taxa + Rentabilidade + Classificação */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 16px", fontSize: 11, color: "oklch(45% 0.02 250)", marginBottom: 4 }}>
                                <span>Taxa Máx. Adm.: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.taxaAdmMax || fundo.taxaAdm || "-"}</span></span>
                                <span>Rentabilidade: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.rentabilidade || "-"}</span></span>
                                <span>Classificação: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.classificacao || "-"}</span></span>
                                {fundo.taxaPerformance && <span>Taxa de Performance: <span style={{ color: "oklch(20% 0.05 250)" }}>{fundo.taxaPerformance}</span></span>}
                              </div>
                              {/* Linha 4: Contribuição Mensal + Aporte Inicial (mesma linha) */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 24px", fontSize: 11 }}>
                                <span style={{ color: "oklch(45% 0.02 250)" }}>Contribuição Mensal: <span style={{ fontWeight: 600, color: "oklch(20% 0.05 250)" }}>{fundo.valorAtribuido || "-"}</span> <span style={{ color: "oklch(55% 0.02 250)" }}>({fundo.percentual}%)</span></span>
                                <span style={{ color: "oklch(45% 0.02 250)" }}>Aporte Inicial: <span style={{ fontWeight: 600, color: "oklch(20% 0.05 250)" }}>{fundo.valorAporte || "-"}</span>{fundo.percentualAporte && fundo.percentualAporte !== "0" && <span style={{ color: "oklch(55% 0.02 250)" }}> ({fundo.percentualAporte}%)</span>}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
            {isSeguro && (
              <>
                {plano.produtoRecomendado && (<div style={{ marginBottom: 16 }}><FieldDisplay label="Produto Recomendado" value={plano.produtoRecomendado} /></div>)}
                {plano.coberturas.length > 0 && (
                  <div style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, overflow: "hidden" }}>
                    <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse", tableLayout: "fixed" }}>
                      <colgroup>
                        <col style={{ width: "auto" }} />
                        <col style={{ width: 148 }} />
                        <col style={{ width: 120 }} />
                        <col style={{ width: 138 }} />
                        <col style={{ width: 138 }} />
                      </colgroup>
                      <thead>
                        <tr style={{ background: "oklch(95% 0.005 260)", borderBottom: "1px solid oklch(90% 0.005 260)" }}>
                          <th style={{ textAlign: "left", padding: "7px 16px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Cobertura</th>
                          <th style={{ textAlign: "center", padding: "7px 6px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Vigência</th>
                          <th style={{ textAlign: "center", padding: "7px 6px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Prazo de Pagamento</th>
                          <th style={{ textAlign: "right", padding: "7px 6px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Capital Segurado</th>
                          <th style={{ textAlign: "right", padding: "7px 16px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Contribuição Mensal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plano.coberturas.map((cob, ci) => {
                          const lookupR = HORIZONTE_VALORES[cob.nome]?.[cob.vigencia];
                          const csR = cob.capitalSegurado || lookupR?.cs || "—";
                          const cmR = cob.contribuicaoMensal || lookupR?.cm || "—";
                          return (
                            <tr key={ci} style={{ borderBottom: ci < plano.coberturas.length - 1 ? "1px solid oklch(93% 0.003 260)" : "none" }}>
                              <td style={{ padding: "10px 10px", color: "oklch(30% 0.05 250)", fontWeight: ci === 0 ? 600 : 400, fontSize: 11, whiteSpace: "normal", wordBreak: "break-word" }}>{cob.nome}</td>
                              <td style={{ padding: "10px 6px", textAlign: "center", fontSize: 11, color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>{cob.vigencia || "—"}</td>
                              <td style={{ padding: "10px 6px", textAlign: "center", fontSize: 11, color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>{cob.prazoPagamento || "—"}</td>
                              <td style={{ padding: "10px 6px", textAlign: "right", fontSize: 11, color: "oklch(30% 0.05 250)", fontWeight: 500, whiteSpace: "nowrap" }}>{csR}</td>
                              <td style={{ padding: "10px 16px", textAlign: "right", fontSize: 11, color: "oklch(20% 0.1 145)", fontWeight: 600, whiteSpace: "nowrap" }}>{cmR}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </SectionCard>
        );
      })}

      {/* Investimento Mensal */}
      <div style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, padding: "10px 16px", background: "#f8fafc", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 13, color: "oklch(45% 0.02 250)" }}>Investimento Mensal</p>
          <p style={{ fontSize: 11, color: "oklch(60% 0.02 250)", marginTop: 1 }}>Apenas {isNaN(totalPercentual) ? "—" : totalPercentual}% do seu saldo mensal</p>
        </div>
        <span style={{ fontSize: 15, fontWeight: 600, color: "oklch(20% 0.05 250)" }}>R$ {totalInvestimento.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
      </div>

      {/* Validade do estudo */}
      <div style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, padding: "10px 16px", background: "#f8fafc", marginTop: 8, marginBottom: 4 }}>
        <p style={{ fontSize: 12, color: "oklch(45% 0.02 250)", fontStyle: "italic" }}>
          Estudo com validade de 7 dias úteis a partir da data{" "}
          {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" })}.
        </p>
      </div>

      </div>{/* /pdfGroup4Ref */}

      </div>{/* /pdfContentRef */}

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8, paddingBottom: 16 }}>
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: isGenerating ? "oklch(55% 0.02 250)" : "oklch(20% 0.05 250)",
            color: "#fff",
            padding: "10px 24px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            border: "none",
            cursor: isGenerating ? "not-allowed" : "pointer",
            opacity: isGenerating ? 0.7 : 1,
          }}
        >
          {isGenerating ? (
            <>
              <svg style={{ width: 16, height: 16 }} className="animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Gerando PDF...
            </>
          ) : (
            <>
              <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Baixar Estudo
            </>
          )}
        </button>
      </div>
    </div>
  );
}
