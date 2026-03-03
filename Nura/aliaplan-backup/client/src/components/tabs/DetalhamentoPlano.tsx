import React, { useState, useRef, useEffect } from "react";
import { useJornada, DetalhamentoData, Plano, SubPlano, FundoSelecionado, Cobertura } from "@/contexts/JornadaContext";
import { toast } from "sonner";

// ─── Funds data ───────────────────────────────────────────────────────────────
import { FUNDOS_DISPONIVEIS as FUNDOS_RAW, FundoDisponivel } from "@/data/fundosData";

// Map from planilha data to app format
const FUNDOS_DISPONIVEIS = FUNDOS_RAW.map((f) => ({
  nome: f.nome,
  cnpj: f.cnpj,
  taxa: f.taxa,
  taxaRaw: f.taxaRaw,
  taxaAdmMax: f.taxaAdmMax,
  taxaPerformance: f.taxaPerformance, // valor da planilha
  rentabilidade: "-",
  classificacao: f.classificacao,
  riscoCor: f.riscoCor,
  risco: f.risco,
  riscoNum: f.riscoNum,
  status: f.status,
  aporteMinimo: f.aporteMinimo,
  contribuicaoMinima: f.contribuicaoMinima,
  susepPGBL: f.susepPGBL,
  susepVGBL: f.susepVGBL,
  codigoPGBL: f.codigoPGBL,
}));



const FUNDO_TIPO_OPTIONS = [
  { value: "PGBL", label: "PGBL" },
  { value: "VGBL", label: "VGBL" },
  { value: "FIA", label: "FIA" },
  { value: "FIM", label: "FIM" },
];

// Opções de Vigência para coberturas do Horizonte
const VIGENCIA_OPTIONS = [
  "Vitalícia",
  "Temporária 5 anos",
  "Temporária 10 anos",
  "Temporária 15 anos",
  "Temporária 20 anos",
  "Temporária 25 anos",
];

// Tabela de Capital Segurado e Contribuição Mensal por cobertura e vigência
// Regra: Vitalícia é a mais cara (total R$ 2.500,00); temporárias são proporcionalmente menores
// Quanto maior a vigência, maiores os valores. Fator: Vit=1.0, T25=0.85, T20=0.70, T15=0.55, T10=0.40, T5=0.25
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

// Nomes das coberturas do produto Horizonte (para a lista suspensa)
const HORIZONTE_NOMES = Object.keys(HORIZONTE_VALORES);

// Dados do produto Horizonte (Capital Segurado mín/máx por cobertura)
// Fonte: Tabela de Limites de Capital Segurado — Produto Horizonte
const HORIZONTE_COBERTURAS: Cobertura[] = HORIZONTE_NOMES.map(nome => ({
  nome,
  valorMin: "R$ 50.000,00",
  valorMax: "R$ 20.000.000,00",
  vigencia: "Vitalícia",
  prazoPagamento: "",
  capitalSegurado: HORIZONTE_VALORES[nome]["Vitalícia"].cs,
  contribuicaoMensal: HORIZONTE_VALORES[nome]["Vitalícia"].cm,
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 style={{ fontSize: 15, fontWeight: 600, color: "oklch(20% 0.05 250)", marginBottom: 16 }}>
      {title}
    </h3>
  );
}

function FieldRow({
  label,
  value,
  isEditing,
  onChange,
  type = "text",
  monetary = false,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (v: string) => void;
  type?: string;
  monetary?: boolean;
}) {
  const handleMonetaryInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) { onChange?.(""); return; }
    const num = parseInt(digits, 10) / 100;
    const formatted = `R$ ${num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    onChange?.(formatted);
  };
  return (
    <div>
      <label className="field-label">{label}</label>
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => monetary ? handleMonetaryInput(e.target.value) : onChange?.(e.target.value)}
          placeholder={monetary ? "R$ 0,00" : undefined}
          className="w-full border border-input rounded-md px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-ring h-10"
        />
      ) : (
        <p style={{ fontSize: 14, color: "oklch(20% 0.05 250)", padding: "8px 0" }}>{value || "—"}</p>
      )}
    </div>
  );
}

// ─── Risk Thermometer (STATIC — não editável) ─────────────────────────────────

// Title part — goes on the same row as "Seleção de Fundos"
function RiskThermometerTitle() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
      <span style={{ fontSize: 11, color: "oklch(55% 0.02 250)", whiteSpace: "nowrap" }}>Termômetro de Risco</span>
      <div
        title="Indica o nível de risco dos fundos selecionados"
        style={{
          width: 13,
          height: 13,
          borderRadius: "50%",
          border: "1px solid oklch(75% 0.01 260)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "help",
          fontSize: 9,
          color: "oklch(55% 0.02 250)",
          flexShrink: 0,
        }}
      >
        i
      </div>
    </div>
  );
}

// Bar part — goes on the same row as "Tipo de Plano"
function RiskThermometerBar() {
  const segments = [
    { color: "#4285F4" },
    { color: "#34A853" },
    { color: "#FBBC04" },
    { color: "#EA8600" },
    { color: "#EA4335" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, width: 220, flexShrink: 0 }}>
      <div style={{ width: "100%", display: "flex", height: 4, borderRadius: 2, overflow: "hidden" }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ flex: 1, background: seg.color, height: "100%" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 9, color: "oklch(65% 0.01 260)" }}>Muito baixo</span>
        <span style={{ fontSize: 9, color: "oklch(65% 0.01 260)" }}>Média</span>
        <span style={{ fontSize: 9, color: "oklch(65% 0.01 260)" }}>Muito alto</span>
      </div>
    </div>
  );
}

function RiskThermometer() { return null; }

// ─── Fundo Selecionado Card ───────────────────────────────────────────────────

// Componente externo estável para evitar remontagem de inputs (perda de foco)
const AtribuicaoRowExt = React.memo(function AtribuicaoRowExt({
  label, percentualVal, valorVal, onPercentualChange, onValorChange, isEditing,
}: {
  label: string; percentualVal: string; valorVal: string;
  onPercentualChange: (v: string) => void; onValorChange: (v: string) => void;
  isEditing: boolean;
}) {
  return (
    <div style={{ marginBottom: 6 }}>
      <p style={{ fontSize: 10, fontWeight: 600, color: "oklch(45% 0.04 250)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px 0" }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: "oklch(55% 0.02 250)", whiteSpace: "nowrap" }}>Valor Atribuído</span>
          {isEditing ? (
            <input type="text" value={valorVal} onChange={(e) => onValorChange(e.target.value)} placeholder="R$ 0,00"
              style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "2px 6px", fontSize: 12, width: 100, fontFamily: "inherit" }} />
          ) : (
            <span style={{ fontSize: 12, fontWeight: 500, color: "oklch(20% 0.05 250)", border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "2px 6px" }}>{valorVal || "R$ 0,00"}</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: "oklch(55% 0.02 250)", whiteSpace: "nowrap" }}>Percentual Atribuído</span>
          {isEditing ? (
            <input type="text" value={percentualVal} onChange={(e) => onPercentualChange(e.target.value)}
              style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "3px 6px", fontSize: 12, width: 52, textAlign: "right", background: "oklch(98% 0.002 260)", color: "oklch(20% 0.05 250)", outline: "none" }} />
          ) : (
            <span style={{ fontSize: 12, fontWeight: 600, color: "oklch(20% 0.05 250)", border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "2px 6px" }}>{percentualVal}%</span>
          )}
        </div>
      </div>
    </div>
  );
});

const FieldPairExt = React.memo(function FieldPairExt({
  label, percentualVal, valorVal, onPercentualChange, onValorChange, isEditing,
}: {
  label: string; percentualVal: string; valorVal: string;
  onPercentualChange: (v: string) => void; onValorChange: (v: string) => void;
  isEditing: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, justifyContent: "flex-end", whiteSpace: "nowrap" }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: "oklch(45% 0.04 250)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{label}:</span>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <span style={{ fontSize: 10, color: "oklch(55% 0.02 250)", whiteSpace: "nowrap" }}>Valor Atribuído</span>
        {isEditing ? (
          <input type="text" value={valorVal} onChange={(e) => onValorChange(e.target.value)} placeholder="0,00"
            style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "2px 5px", fontSize: 11, width: 76, fontFamily: "inherit", textAlign: "center", outline: "none" }} />
        ) : (
          <span style={{ fontSize: 11, fontWeight: 500, color: "oklch(20% 0.05 250)", border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "1px 5px", width: 76, textAlign: "center", display: "inline-block" }}>{valorVal || "0,00"}</span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <span style={{ fontSize: 10, color: "oklch(55% 0.02 250)", whiteSpace: "nowrap" }}>Percentual Atribuído</span>
        {isEditing ? (
          <div style={{ display: "flex", alignItems: "center", border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, background: "oklch(98% 0.002 260)", overflow: "hidden", width: 52 }}>
            <input type="text" value={percentualVal}
              onChange={(e) => { const raw = e.target.value.replace(/[^0-9.,]/g, ""); onPercentualChange(raw); }}
              style={{ border: "none", outline: "none", padding: "2px 2px 2px 4px", fontSize: 11, width: 34, textAlign: "right", background: "transparent", color: "oklch(20% 0.05 250)", fontFamily: "inherit" }} />
            <span style={{ fontSize: 11, color: "oklch(40% 0.02 250)", paddingRight: 4, userSelect: "none", pointerEvents: "none" }}>%</span>
          </div>
        ) : (
          <span style={{ fontSize: 11, fontWeight: 600, color: "oklch(20% 0.05 250)", border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "1px 5px", width: 52, textAlign: "center", display: "inline-block" }}>{percentualVal}%</span>
        )}
      </div>
    </div>
  );
});

function FundoCard({
  fundo,
  isEditing,
  onUpdate,
  onUpdateMultiple,
  onRemove,
  aporteInicial,
  contribuicaoMensal,
}: {
  fundo: FundoSelecionado;
  isEditing: boolean;
  onUpdate: (key: keyof FundoSelecionado, value: string) => void;
  onUpdateMultiple?: (fields: Partial<FundoSelecionado>) => void;
  onRemove: () => void;
  aporteInicial?: string;
  contribuicaoMensal?: string;
}) {
  const parseMoney = (s: string) => {
    if (!s) return 0;
    const clean = s.replace(/[R$\s]/g, "").replace(/\./g, "").replace(",", ".");
    const n = parseFloat(clean);
    return isNaN(n) ? 0 : n;
  };
  const aporteBase = parseMoney(aporteInicial || "");
  const contribBase = parseMoney(contribuicaoMensal || "");

  const formatMoney = (num: number) =>
    `R$ ${num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Handlers para Contribuição Mensal (percentual + valorAtribuido)
  const handleContribPercentualChange = (raw: string) => {
    const pct = raw.replace(/[^0-9.,]/g, "");
    const base = contribBase > 0 ? contribBase : parseMoney(fundo.valorAtribuido);
    if (base > 0) {
      const pctNum = parseFloat(pct.replace(",", ".")) || 0;
      const valor = (pctNum / 100) * base;
      const valorStr = valor > 0 ? formatMoney(valor) : "";
      if (onUpdateMultiple) {
        onUpdateMultiple({ percentual: pct, valorAtribuido: valorStr });
      } else {
        onUpdate("percentual", pct);
        onUpdate("valorAtribuido", valorStr);
      }
    } else {
      onUpdate("percentual", pct);
    }
  };

  const handleContribValorChange = (rawInput: string) => {
    const digits = rawInput.replace(/\D/g, "");
    if (!digits) {
      if (onUpdateMultiple) {
        onUpdateMultiple({ valorAtribuido: "", percentual: contribBase > 0 ? "0" : fundo.percentual });
      } else {
        onUpdate("valorAtribuido", "");
        if (contribBase > 0) onUpdate("percentual", "0");
      }
      return;
    }
    const num = parseInt(digits, 10) / 100;
    const valorStr = formatMoney(num);
    if (contribBase > 0) {
      const pct = Math.round((num / contribBase) * 100);
      if (onUpdateMultiple) {
        onUpdateMultiple({ valorAtribuido: valorStr, percentual: String(pct) });
      } else {
        onUpdate("valorAtribuido", valorStr);
        onUpdate("percentual", String(pct));
      }
    } else {
      onUpdate("valorAtribuido", valorStr);
    }
  };

  // Handlers para Aporte Inicial (percentualAporte + valorAporte)
  const handleAportePercentualChange = (raw: string) => {
    const pct = raw.replace(/[^0-9.,]/g, "");
    if (aporteBase > 0) {
      const pctNum = parseFloat(pct.replace(",", ".")) || 0;
      const valor = (pctNum / 100) * aporteBase;
      const valorStr = valor > 0 ? formatMoney(valor) : "";
      if (onUpdateMultiple) {
        onUpdateMultiple({ percentualAporte: pct, valorAporte: valorStr });
      } else {
        onUpdate("percentualAporte", pct);
        onUpdate("valorAporte", valorStr);
      }
    } else {
      onUpdate("percentualAporte", pct);
    }
  };

  const handleAporteValorChange = (rawInput: string) => {
    const digits = rawInput.replace(/\D/g, "");
    if (!digits) {
      if (onUpdateMultiple) {
        onUpdateMultiple({ valorAporte: "", percentualAporte: aporteBase > 0 ? "0" : fundo.percentualAporte });
      } else {
        onUpdate("valorAporte", "");
        if (aporteBase > 0) onUpdate("percentualAporte", "0");
      }
      return;
    }
    const num = parseInt(digits, 10) / 100;
    const valorStr = formatMoney(num);
    if (aporteBase > 0) {
      const pct = Math.round((num / aporteBase) * 100);
      if (onUpdateMultiple) {
        onUpdateMultiple({ valorAporte: valorStr, percentualAporte: String(pct) });
      } else {
        onUpdate("valorAporte", valorStr);
        onUpdate("percentualAporte", String(pct));
      }
    } else {
      onUpdate("valorAporte", valorStr);
    }
  };

  // Handlers estáveis com useCallback para evitar recriação desnecessaria
  const stableHandleContribPercentual = React.useCallback(handleContribPercentualChange, [fundo.cnpj, contribBase]);
  const stableHandleContribValor = React.useCallback(handleContribValorChange, [fundo.cnpj, contribBase]);
  const stableHandleAportePercentual = React.useCallback(handleAportePercentualChange, [fundo.cnpj, aporteBase]);
  const stableHandleAporteValor = React.useCallback(handleAporteValorChange, [fundo.cnpj, aporteBase]);

  return (
    <div
      style={{
        border: "1px solid oklch(90% 0.005 260)",
        borderRadius: 8,
        padding: "10px 14px",
        background: "#fff",
        display: "grid",
        gridTemplateColumns: "1fr auto 28px",
        gridTemplateRows: "auto auto auto auto",
        columnGap: 12,
        rowGap: 6,
        alignItems: "start",
        overflow: "hidden",
      }}
    >
      {/* Linha 1, col 1: Nome do fundo (completo, sem truncamento) */}
      <p style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)", margin: 0, whiteSpace: "normal", wordBreak: "break-word", gridColumn: 1, gridRow: 1, minWidth: 0 }}>
        {fundo.nome}
      </p>

      {/* Linha 1, col 2: Contribuição Mensal */}
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <FieldPairExt
          label="Contribuição Mensal"
          percentualVal={fundo.percentual}
          valorVal={fundo.valorAtribuido}
          onPercentualChange={stableHandleContribPercentual}
          onValorChange={stableHandleContribValor}
          isEditing={isEditing}
        />
      </div>

      {/* Linha 1, col 3: Botão remover */}
      <div style={{ gridColumn: 3, gridRow: 1, display: "flex", justifyContent: "center" }}>
        {isEditing && (
          <button
            type="button"
            onClick={onRemove}
            style={{ padding: 3, background: "transparent", border: "none", cursor: "pointer", color: "oklch(55% 0.02 250)" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Linha 2, col 1: CNPJ */}
      <div style={{ gridColumn: 1, gridRow: 2, display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
        <p style={{ fontSize: 12, color: "oklch(45% 0.02 250)", margin: 0, whiteSpace: "nowrap" }}>{fundo.cnpj}</p>
      </div>

      {/* Linha 2, col 2: Aporte Inicial */}
      <div style={{ gridColumn: 2, gridRow: 2 }}>
        <FieldPairExt
          label="Aporte Inicial"
          percentualVal={fundo.percentualAporte}
          valorVal={fundo.valorAporte}
          onPercentualChange={stableHandleAportePercentual}
          onValorChange={stableHandleAporteValor}
          isEditing={isEditing}
        />
      </div>

      {/* Linha 2, col 3: espaço vazio */}
      <div style={{ gridColumn: 3, gridRow: 2 }} />

      {/* Linha 3, col 1-3: Taxa Adm. + Taxa Máx. Adm. + Rentabilidade + Classificação */}
      <div style={{ gridColumn: "1 / -1", gridRow: 3, display: "flex", alignItems: "center", gap: 20, flexWrap: "nowrap", paddingTop: 2 }}>
        {/* Taxa Máx. Adm. */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11, color: "oklch(55% 0.02 250)", whiteSpace: "nowrap" }}>Taxa Máx. Adm.:</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "oklch(20% 0.05 250)",
            border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "1px 6px",
            background: "oklch(97% 0.003 260)", whiteSpace: "nowrap" }}>{(fundo as any).taxaAdmMax || fundo.taxaAdm || "-"}</span>
        </div>
        {/* Rentabilidade */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11, color: "oklch(55% 0.02 250)", whiteSpace: "nowrap" }}>Rentabilidade:</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "oklch(20% 0.05 250)",
            border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "1px 6px",
            background: "oklch(97% 0.003 260)", whiteSpace: "nowrap" }}>{fundo.rentabilidade || "-"}</span>
        </div>
        {/* Classificação */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11, color: "oklch(55% 0.02 250)", whiteSpace: "nowrap" }}>Classificação:</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "oklch(20% 0.05 250)",
            border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "1px 6px",
            background: "oklch(97% 0.003 260)", whiteSpace: "nowrap" }}>{fundo.classificacao || "-"}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Fund Search ──────────────────────────────────────────────────────────────

function FundSearch({
  selectedFunds,
  onToggle,
  tipoPlano,
  onTipoPlanoChange,
  isEditing,
  onUpdateFundo,
  onUpdateFundoMultiple,
  contribuicaoMensal,
  aporteInicial,
}: {
  selectedFunds: FundoSelecionado[];
  onToggle: (fundo: typeof FUNDOS_DISPONIVEIS[0]) => void;
  tipoPlano: string;
  onTipoPlanoChange: (v: string) => void;
  isEditing: boolean;
  onUpdateFundo?: (cnpj: string, key: keyof FundoSelecionado, value: string) => void;
  onUpdateFundoMultiple?: (cnpj: string, fields: Partial<FundoSelecionado>) => void;
  contribuicaoMensal?: string;
  aporteInicial?: string;
}) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sortCol, setSortCol] = useState<"taxa" | "rentabilidade" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  // sortCol aceita "taxa" e "rentabilidade" — Classificação não tem filtro de ordenação

  // ── Regras de negócio: parsear valores monetários
  const parseMoney = (s: string) => {
    if (!s) return 0;
    const clean = s.replace(/[R$\s]/g, "").replace(/\./g, "").replace(",", ".");
    const n = parseFloat(clean);
    return isNaN(n) ? 0 : n;
  };
  const contrib = parseMoney(contribuicaoMensal || "");
  const aporte = parseMoney(aporteInicial || "");

  // Filtrar fundos com base nas regras de negócio
  // Regra: fundo disponível se (contrib >= 100 OU aporte >= 1000) E (contrib >= contribuicaoMinima OU aporte >= aporteMinimo)
  // Se nenhum valor foi preenchido, mostrar todos
  const fundoPassaRegra = (f: typeof FUNDOS_DISPONIVEIS[0]) => {
    if (contrib === 0 && aporte === 0) return true; // sem filtro se não preenchido
    const contribuicaoOk = contrib > 0 && contrib >= Math.max(100, f.contribuicaoMinima);
    const aporteOk = aporte > 0 && aporte >= Math.max(1000, f.aporteMinimo);
    return contribuicaoOk || aporteOk;
  };

  // Filtrar por busca, tipo de plano e regras
  const baseFiltered = FUNDOS_DISPONIVEIS.filter((f) => {
    // Filtro por tipo de plano: PGBL exige codigoPGBL preenchido; VGBL exige susepVGBL preenchido
    // Como todos os fundos têm ambos, usamos codigoPGBL como indicador de disponibilidade PGBL
    if (tipoPlano === "PGBL" && !f.codigoPGBL) return false;
    if (tipoPlano === "VGBL" && !f.susepVGBL) return false;
    // Filtro por busca
    if (!f.nome.toLowerCase().includes(search.toLowerCase()) && !f.cnpj.includes(search)) return false;
    // Filtro por regras de negócio
    return fundoPassaRegra(f);
  });

  // Ordenar por taxa ou rentabilidade (Classificação sem ordenação)
  const filtered = [...baseFiltered].sort((a, b) => {
    if (!sortCol) return 0;
    if (sortCol === "taxa") {
      return sortDir === "asc" ? a.taxaRaw - b.taxaRaw : b.taxaRaw - a.taxaRaw;
    }
    if (sortCol === "rentabilidade") {
      // Rentabilidade sem dados reais — ordenação por nome como fallback
      const na = a.nome || "";
      const nb = b.nome || "";
      return sortDir === "asc" ? na.localeCompare(nb) : nb.localeCompare(na);
    }
    return 0;
  });

  const toggleSortTaxa = () => {
    if (sortCol === "taxa") {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol("taxa");
      setSortDir("asc");
    }
  };

  return (
    <div>
      {/* Seleção de Fundos header */}
      <div style={{ marginBottom: 12 }}>
        <label className="field-label" style={{ margin: 0 }}>Seleção de Fundos</label>
      </div>

      {/* Tipo de Plano */}
      <div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
              <label className="field-label" style={{ margin: 0 }}>Tipo de Plano</label>
            </div>
            {isEditing ? (
              <select
                value={tipoPlano}
                onChange={(e) => onTipoPlanoChange(e.target.value)}
                style={{
                  border: "1px solid oklch(90% 0.005 260)",
                  borderRadius: 6,
                  padding: "6px 10px",
                  fontSize: 13,
                  background: "#fff",
                  color: "oklch(20% 0.05 250)",
                  outline: "none",
                  height: 36,
                }}
              >
                {FUNDO_TIPO_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <span style={{ fontSize: 13, border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "4px 10px", color: "oklch(20% 0.05 250)", display: "inline-block" }}>
                {tipoPlano}
              </span>
            )}
          </div>

          {/* Search button — only in edit mode */}
          {isEditing && (
            <div style={{ marginBottom: 8 }}>
              <label className="field-label" style={{ marginBottom: 4 }}>Buscar Fundos Disponíveis</label>
              <button
                type="button"
                onClick={() => { setSearch(""); setShowModal(true); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  border: "1px solid oklch(90% 0.005 260)",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: 13,
                  background: "#fff",
                  color: "oklch(55% 0.02 250)",
                  cursor: "pointer",
                  height: 40,
                  textAlign: "left",
                  boxSizing: "border-box",
                }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0, color: "oklch(55% 0.02 250)" }}>
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
                Nome ou CNPJ do Fundo
              </button>
              <p style={{ fontSize: 11, color: "oklch(55% 0.02 250)", marginTop: 4 }}>
                {FUNDOS_DISPONIVEIS.length} fundos disponíveis
              </p>
            </div>
          )}

          {/* ── MODAL POPUP ── */}
          {showModal && (
            <div
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 280, /* desconsidera a sidebar */
                right: 0,
                zIndex: 200,
                background: "rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                  width: "min(860px, 92vw)",
                  maxHeight: "80vh",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                {/* Modal header */}
                <div style={{ padding: "20px 24px 0", borderBottom: "1px solid oklch(93% 0.003 260)", paddingBottom: 16 }}>
                  {/* Title row + thermometer + close button */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 14 }}>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "oklch(20% 0.05 250)", margin: 0 }}>Buscar Fundos Disponíveis</h3>
                      <p style={{ fontSize: 12, color: "oklch(55% 0.02 250)", margin: "4px 0 0" }}>{filtered.length} de {FUNDOS_DISPONIVEIS.length} fundos encontrados</p>
                    </div>
                    {/* Thermometer + close button on top right */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, minWidth: 260 }}>
                        <RiskThermometerTitle />
                        <RiskThermometerBar />
                      </div>
                      {/* Botão X fechar */}
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          border: "1px solid oklch(88% 0.005 260)",
                          background: "oklch(97% 0.003 260)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "oklch(45% 0.02 250)",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                        title="Fechar"
                      >
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* Search input */}
                  <div style={{ position: "relative" }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "oklch(55% 0.02 250)", pointerEvents: "none" }}>
                      <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                      autoFocus
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Pesquisar por nome ou CNPJ do fundo..."
                      style={{
                        width: "100%",
                        border: "1px solid oklch(88% 0.005 260)",
                        borderRadius: 8,
                        padding: "9px 12px 9px 36px",
                        fontSize: 13,
                        background: "oklch(98% 0.002 260)",
                        color: "oklch(20% 0.05 250)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {/* Modal table */}
                <div style={{ overflowY: "auto", flex: 1 }}>
                  <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                    <thead style={{ background: "oklch(96% 0.004 260)", position: "sticky", top: 0, zIndex: 1 }}>
                      <tr>
                        <th style={{ width: 6, padding: "10px 0 10px 12px" }}></th>
                        <th style={{ textAlign: "left", padding: "10px 10px", fontWeight: 600, color: "oklch(45% 0.02 250)", width: 28 }}></th>
                        <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "oklch(45% 0.02 250)" }}>Nome</th>
                        {/* Taxa Máx. Adm. — com filtro de ordenação, setas lado a lado */}
                        <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "oklch(45% 0.02 250)", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }}
                          onClick={toggleSortTaxa}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                            Taxa Máx. Adm.
                            <span style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
                              {/* seta cima */}
                              <span style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: `5px solid ${sortCol === "taxa" && sortDir === "asc" ? "oklch(20% 0.05 250)" : "oklch(75% 0.01 260)"}` }} />
                              {/* seta baixo */}
                              <span style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `5px solid ${sortCol === "taxa" && sortDir === "desc" ? "oklch(20% 0.05 250)" : "oklch(75% 0.01 260)"}` }} />
                            </span>
                          </span>
                        </th>
                        {/* Rentabilidade — com filtro de ordenação, setas lado a lado */}
                        <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "oklch(45% 0.02 250)", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }}
                          onClick={() => {
                            if (sortCol === "rentabilidade") {
                              setSortDir(d => d === "asc" ? "desc" : "asc");
                            } else {
                              setSortCol("rentabilidade");
                              setSortDir("asc");
                            }
                          }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                            Rentabilidade
                            <span style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
                              {/* seta cima */}
                              <span style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: `5px solid ${sortCol === "rentabilidade" && sortDir === "asc" ? "oklch(20% 0.05 250)" : "oklch(75% 0.01 260)"}` }} />
                              {/* seta baixo */}
                              <span style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `5px solid ${sortCol === "rentabilidade" && sortDir === "desc" ? "oklch(20% 0.05 250)" : "oklch(75% 0.01 260)"}` }} />
                            </span>
                          </span>
                        </th>
                        {/* Classificação — sem filtro de ordenação */}
                        <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "oklch(45% 0.02 250)" }}>
                          Classificação
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((f) => {
                        const isSelected = selectedFunds.some((sf) => sf.cnpj === f.cnpj);
                        return (
                          <tr
                            key={f.cnpj}
                            onClick={() => onToggle(f)}
                            style={{
                              cursor: "pointer",
                              borderTop: "1px solid oklch(94% 0.003 260)",
                              background: isSelected ? "rgba(30,64,175,0.05)" : "transparent",
                            }}
                            onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = "oklch(97.5% 0.003 260)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isSelected ? "rgba(30,64,175,0.05)" : "transparent"; }}
                          >
                            <td style={{ padding: "0 0 0 12px", width: 6 }}>
                              <div style={{ width: 4, height: 40, borderRadius: 2, background: f.riscoCor || "#4285F4" }} />
                            </td>
                            <td style={{ padding: "10px 10px" }}>
                              <input type="checkbox" checked={isSelected} readOnly
                                style={{ width: 13, height: 13, cursor: "pointer", accentColor: "oklch(20% 0.05 250)" }} />
                            </td>
                            <td style={{ padding: "10px 14px" }}>
                              <div style={{ fontWeight: 500, color: "oklch(20% 0.05 250)", lineHeight: 1.3 }}>{f.nome}</div>
                              <div style={{ fontSize: 11, color: "oklch(55% 0.02 250)", marginTop: 2 }}>{f.cnpj}</div>
                            </td>
                            <td style={{ padding: "10px 14px", textAlign: "right", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>{f.taxa}</td>
                            <td style={{ padding: "10px 14px", textAlign: "right", color: "oklch(75% 0.01 260)" }}>—</td>
                            <td style={{ padding: "10px 14px", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>{f.classificacao || "-"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Modal footer */}
                <div style={{ padding: "12px 24px", borderTop: "1px solid oklch(93% 0.003 260)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "oklch(55% 0.02 250)" }}>
                    {selectedFunds.length} fundo{selectedFunds.length !== 1 ? "s" : ""} selecionado{selectedFunds.length !== 1 ? "s" : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      background: "oklch(20% 0.05 250)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "8px 20px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
          

          {/* Fundos Selecionados label — view mode */}
          {!isEditing && selectedFunds.length > 0 && (
            <label className="field-label" style={{ marginBottom: 8, display: "block", marginTop: 8 }}>Fundos Selecionados</label>
          )}
      </div>

      {/* Selected Funds */}
      {selectedFunds.length > 0 && (
        <div>
          {isEditing && (
            <label className="field-label" style={{ marginBottom: 8, display: "block" }}>Fundos Selecionados</label>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {selectedFunds.map((fundo) => (
              <FundoCard
                key={fundo.cnpj}
                fundo={fundo}
                isEditing={isEditing}
                onUpdate={onUpdateFundo ? (key, value) => onUpdateFundo(fundo.cnpj, key, value) : () => {}}
                onUpdateMultiple={onUpdateFundoMultiple ? (fields) => onUpdateFundoMultiple(fundo.cnpj, fields) : undefined}
                onRemove={() => onToggle(FUNDOS_DISPONIVEIS.find((f) => f.cnpj === fundo.cnpj)!)}
                aporteInicial={aporteInicial}
                contribuicaoMensal={contribuicaoMensal}
              />
            ))}
          </div>
        </div>
      )}
      {!isEditing && selectedFunds.length === 0 && (
        <p style={{ fontSize: 13, color: "oklch(55% 0.02 250)", fontStyle: "italic", marginTop: 8 }}>Nenhum fundo selecionado.</p>
      )}
    </div>
  );
}

// ─── SubPlano Block ───────────────────────────────────────────────────────────

function SubPlanoBlock({
  sub,
  isEditing,
  canRemove,
  onUpdate,
  onRemove,
}: {
  sub: SubPlano;
  isEditing: boolean;
  canRemove: boolean;
  onUpdate: (updated: SubPlano) => void;
  onRemove: () => void;
}) {
  // Sincroniza valorAtribuido e valorAporte sempre que contribuicaoMensal, aporteInicial ou fundos mudam.
  // Garante que fundo único com percentual 0 receba 100% automaticamente.
  const prevContribRef = React.useRef("");
  const prevAporteRef = React.useRef("");
  const prevFundosLenRef = React.useRef(0);
  useEffect(() => {
    const parseMoneyLocal = (s: string) => {
      if (!s) return 0;
      const clean = s.replace(/[R$\s]/g, "").replace(/\./g, "").replace(",", ".");
      const n = parseFloat(clean);
      return isNaN(n) ? 0 : n;
    };
    const fmtMoney = (num: number) =>
      `R$ ${num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const contribBase = parseMoneyLocal(sub.contribuicaoMensal);
    const aporteBase = parseMoneyLocal(sub.aporteInicial);
    if (contribBase === 0 && aporteBase === 0) return;
    // Se há exatamente 1 fundo com percentual 0, definir como 100%
    let fundosParaAtualizar = sub.fundos;
    if (sub.fundos.length === 1) {
      const f0 = sub.fundos[0];
      const pct0 = parseFloat(f0.percentual) || 0;
      const pctA0 = parseFloat(f0.percentualAporte) || 0;
      if (pct0 === 0 || pctA0 === 0) {
        fundosParaAtualizar = [{
          ...f0,
          percentual: pct0 === 0 ? "100" : f0.percentual,
          percentualAporte: pctA0 === 0 ? "100" : f0.percentualAporte,
        }];
      }
    }
    const needsUpdate = fundosParaAtualizar.some((f) => {
      const va = parseMoneyLocal(f.valorAtribuido);
      const vap = parseMoneyLocal(f.valorAporte);
      return (contribBase > 0 && va === 0) || (aporteBase > 0 && vap === 0)
        || fundosParaAtualizar !== sub.fundos;
    });
    if (!needsUpdate) return;
    const updatedFundos = fundosParaAtualizar.map((f) => {
      const pct = parseFloat(f.percentual) || 0;
      const pctA = parseFloat(f.percentualAporte) || 0;
      const va = contribBase > 0 && pct > 0 ? fmtMoney((pct / 100) * contribBase) : f.valorAtribuido;
      const vap = aporteBase > 0 && pctA > 0 ? fmtMoney((pctA / 100) * aporteBase) : f.valorAporte;
      return { ...f, valorAtribuido: va, valorAporte: vap };
    });
    prevContribRef.current = sub.contribuicaoMensal;
    prevAporteRef.current = sub.aporteInicial;
    prevFundosLenRef.current = sub.fundos.length;
    onUpdate({ ...sub, fundos: updatedFundos });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub.contribuicaoMensal, sub.aporteInicial, sub.fundos.length]);

  const setField = (key: keyof SubPlano) => (value: string) => {
    const parseMoneyLocal = (s: string) => {
      if (!s) return 0;
      const clean = s.replace(/[R$\s]/g, "").replace(/\./g, "").replace(",", ".");
      const n = parseFloat(clean);
      return isNaN(n) ? 0 : n;
    };
    const fmtMoney = (num: number) =>
      `R$ ${num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Se o campo alterado for contribuicaoMensal, recalcular valorAtribuido de todos os fundos
    if (key === "contribuicaoMensal") {
      const newContribBase = parseMoneyLocal(value);
      // Se há 1 fundo com percentual 0, atribuir 100% automaticamente
      const fundosNormalizados = sub.fundos.length === 1 && (parseFloat(sub.fundos[0].percentual) || 0) === 0
        ? [{ ...sub.fundos[0], percentual: "100" }]
        : sub.fundos;
      const updatedFundos = fundosNormalizados.map((f) => {
        const pct = parseFloat(f.percentual) || 0;
        const valor = newContribBase > 0 && pct > 0 ? (pct / 100) * newContribBase : 0;
        return {
          ...f,
          valorAtribuido: newContribBase > 0 && valor > 0
            ? fmtMoney(valor)
            : f.valorAtribuido,
        };
      });
      onUpdate({ ...sub, [key]: value, fundos: updatedFundos });
      return;
    }

    // Se o campo alterado for aporteInicial, recalcular valorAporte de todos os fundos
    if (key === "aporteInicial") {
      const newAporteBase = parseMoneyLocal(value);
      // Se há 1 fundo com percentualAporte 0, atribuir 100% automaticamente
      const fundosNormalizados = sub.fundos.length === 1 && (parseFloat(sub.fundos[0].percentualAporte) || 0) === 0
        ? [{ ...sub.fundos[0], percentualAporte: "100" }]
        : sub.fundos;
      const updatedFundos = fundosNormalizados.map((f) => {
        const pct = parseFloat(f.percentualAporte) || 0;
        const valor = newAporteBase > 0 && pct > 0 ? (pct / 100) * newAporteBase : 0;
        return {
          ...f,
          valorAporte: newAporteBase > 0 && valor > 0
            ? fmtMoney(valor)
            : f.valorAporte,
        };
      });
      onUpdate({ ...sub, [key]: value, fundos: updatedFundos });
      return;
    }
    onUpdate({ ...sub, [key]: value });
  };

  // Parsear valor monetário para número
  const parseMoney = (s: string) => {
    if (!s) return 0;
    const clean = s.replace(/[R$\s]/g, "").replace(/\./g, "").replace(",", ".");
    const n = parseFloat(clean);
    return isNaN(n) ? 0 : n;
  };
  const formatMoney = (num: number) =>
    `R$ ${num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Redistribui percentuais igualmente entre os fundos e recalcula valorAtribuido e valorAporte
  const redistributePercentuais = (fundos: FundoSelecionado[]): FundoSelecionado[] => {
    if (fundos.length === 0) return fundos;
    const base = Math.floor(100 / fundos.length);
    const remainder = 100 - base * fundos.length;
    const aporteBase = parseMoney(sub.aporteInicial);
    const contribBase = parseMoney(sub.contribuicaoMensal);
    return fundos.map((f, i) => {
      const pct = i === 0 ? base + remainder : base;
      const valorAporte = aporteBase > 0 ? (pct / 100) * aporteBase : 0;
      // Recalcular valorAtribuido com base na contribuicaoMensal se disponível
      const valorAtribuido = contribBase > 0
        ? formatMoney((pct / 100) * contribBase)
        : (f.valorAtribuido || "");
      return {
        ...f,
        // Contribuição Mensal: redistribui percentual e recalcula valor
        percentual: String(pct),
        valorAtribuido,
        // Aporte Inicial: redistribui percentual e recalcula valor
        percentualAporte: String(pct),
        valorAporte: aporteBase > 0 ? formatMoney(valorAporte) : f.valorAporte,
      };
    });
  };

  const toggleFundo = (f: typeof FUNDOS_DISPONIVEIS[0]) => {
    const exists = sub.fundos.some((sf) => sf.cnpj === f.cnpj);
    if (exists) {
      // Ao remover, redistribui percentuais entre os restantes
      const remaining = sub.fundos.filter((sf) => sf.cnpj !== f.cnpj);
      onUpdate({ ...sub, fundos: redistributePercentuais(remaining) });
    } else {
      // taxaPerformance: null = sem taxa (Não há), string = valor real
      const rawPerf = f.taxaPerformance || "";
      const taxaPerf = (rawPerf === "Não há*" || rawPerf === "Não há" || rawPerf === "")
        ? null
        : rawPerf;
      const newFundo: FundoSelecionado = {
        nome: f.nome,
        cnpj: f.cnpj,
        tipo: sub.tipoPlano,
        taxaAdm: f.taxa,
        taxaAdmMax: f.taxaAdmMax || f.taxa,
        taxaPerformance: taxaPerf,
        rentabilidade: f.rentabilidade || "-",
        classificacao: f.classificacao || "-",
        percentual: "0",
        valorAtribuido: "",
        percentualAporte: "0",
        valorAporte: "",
        processoSusep: sub.tipoPlano === "PGBL" ? (f.susepPGBL || "") : (f.susepVGBL || ""),
      };
      // Redistribui percentuais incluindo o novo fundo
      const newFundos = redistributePercentuais([...sub.fundos, newFundo]);
      onUpdate({ ...sub, fundos: newFundos });
    }
  };

  const updateFundoField = (cnpj: string, key: keyof FundoSelecionado, value: string) => {
    onUpdate({
      ...sub,
      fundos: sub.fundos.map((f) => (f.cnpj === cnpj ? { ...f, [key]: value } : f)),
    });
  };

  // Atualiza múltiplos campos de um fundo em uma única operação (evita sobrescrita)
  const updateFundoMultipleFields = (cnpj: string, fields: Partial<FundoSelecionado>) => {
    onUpdate({
      ...sub,
      fundos: sub.fundos.map((f) => (f.cnpj === cnpj ? { ...f, ...fields } : f)),
    });
  };

  return (
    <div style={{ border: "1px solid oklch(92% 0.004 260)", borderRadius: 8, padding: "16px", marginBottom: 16, background: "oklch(98.5% 0.002 260)" }}>
      {/* Header with remove */}
      {isEditing && canRemove && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <button
            type="button"
            onClick={onRemove}
            style={{ padding: "4px 10px", fontSize: 12, color: "oklch(45% 0.02 250)", border: "1px solid oklch(90% 0.005 260)", borderRadius: 6, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Remover
          </button>
        </div>
      )}

      {/* Contribuição + Aporte */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 16 }}>
        <FieldRow label="Contribuição Mensal" value={sub.contribuicaoMensal} isEditing={isEditing} onChange={setField("contribuicaoMensal")} monetary />
        <FieldRow label="Valor do Aporte Inicial" value={sub.aporteInicial} isEditing={isEditing} onChange={setField("aporteInicial")} monetary />
      </div>

      {/* Fund Search + Risk Thermometer */}
      <FundSearch
        selectedFunds={sub.fundos}
        onToggle={toggleFundo}
        tipoPlano={sub.tipoPlano}
        onTipoPlanoChange={(v) => onUpdate({ ...sub, tipoPlano: v })}
        isEditing={isEditing}
        onUpdateFundo={updateFundoField}
        onUpdateFundoMultiple={updateFundoMultipleFields}
        contribuicaoMensal={sub.contribuicaoMensal}
        aporteInicial={sub.aporteInicial}
      />

      {/* Indicador de soma de percentuais — só aparece com 2+ fundos em modo edição */}
      {isEditing && sub.fundos.length > 1 && (() => {
        const soma = sub.fundos.reduce((acc, f) => acc + (parseFloat(f.percentual) || 0), 0);
        const ok = Math.abs(soma - 100) < 0.01;
        return (
          <div
            style={{
              marginTop: 10,
              padding: "8px 12px",
              borderRadius: 6,
              background: ok ? "oklch(97% 0.02 145)" : "oklch(97% 0.03 25)",
              border: `1px solid ${ok ? "oklch(75% 0.12 145)" : "oklch(70% 0.15 25)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 12, color: ok ? "oklch(35% 0.12 145)" : "oklch(40% 0.15 25)", fontWeight: 500 }}>
              {ok
                ? "Distribuição dos percentuais: 100% \u2713"
                : `Soma dos percentuais: ${soma.toFixed(0)}% \u2014 ajuste para totalizar 100%`}
            </span>
            {!ok && (
              <button
                type="button"
                onClick={() => onUpdate({ ...sub, fundos: redistributePercentuais(sub.fundos) })}
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 4,
                  border: "1px solid oklch(70% 0.15 25)",
                  background: "oklch(40% 0.15 25)",
                  color: "#fff",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Redistribuir igualmente
              </button>
            )}
          </div>
        );
      })()}
    </div>
  );
}

// ─── Cálculos de Capital Segurado e Contribuição Mensal ────────────────────────

// Converte string de valor ("R$ 50.000,00") para número
function parseBRL(val: string): number {
  if (!val) return 0;
  const clean = val.replace(/[R$\s.]/g, "").replace(",", ".");
  return parseFloat(clean) || 0;
}

// Formata número para string BRL ("R$ 50.000,00")
function formatBRL(val: number): string {
  if (isNaN(val) || val === 0) return "";
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Calcula o Capital Segurado como média entre mín e máx do produto Horizonte
// Perfil Executora-Analítica-Conservadora: usa média simples (mín + máx) / 2
function calcCapitalSegurado(cob: Cobertura): string {
  // Se já tem valor manual preenchido pelo usuário, mantém
  if (cob.capitalSegurado) return cob.capitalSegurado;
  const min = parseBRL(cob.valorMin);
  const max = parseBRL(cob.valorMax);
  if (!min || !max) return "";
  const media = (min + max) / 2;
  return formatBRL(media);
}

// Tabela de taxas mensais do Horizonte por vigencia e prazo de pagamento
// Fonte: Manual de Subscrição - Horizonte (perfil Conservador)
// Taxa = Prêmio Mensal / Capital Segurado
const HORIZONTE_TAXAS: Record<string, Record<string, number>> = {
  // Vitalícia: prazo de pagamento em anos -> taxa mensal por unidade de capital
  "Vitalícia": {
    "5": 0.0028,
    "10": 0.0015,
    "15": 0.0010,
    "20": 0.00075,
    "25": 0.00060,
    "30": 0.00050,
    "vitalicio": 0.00040, // pagamento vitalicio
  },
  // Temporária: vigencia em anos -> taxa mensal por unidade de capital
  "Temporária 5 anos": { "5": 0.00080, "10": 0.00060, "15": 0.00050, "20": 0.00040, "25": 0.00035 },
  "Temporária 10 anos": { "5": 0.00120, "10": 0.00090, "15": 0.00070, "20": 0.00060, "25": 0.00050 },
  "Temporária 15 anos": { "5": 0.00160, "10": 0.00120, "15": 0.00090, "20": 0.00075, "25": 0.00060 },
  "Temporária 20 anos": { "5": 0.00200, "10": 0.00150, "15": 0.00110, "20": 0.00090, "25": 0.00075 },
  "Temporária 25 anos": { "5": 0.00240, "10": 0.00180, "15": 0.00130, "20": 0.00105, "25": 0.00085 },
};

// Calcula a Contribuição Mensal com base no Capital Segurado, Vigência e Prazo de Pagamento
function calcContribuicaoMensal(capitalSeguradoStr: string, vigencia: string, prazoPagamento: string): string {
  const cs = parseBRL(capitalSeguradoStr);
  if (!cs || !vigencia) return "";
  // Extrair prazo em anos do texto (ex: "20 anos" -> "20", "20" -> "20")
  const prazoMatch = prazoPagamento.match(/(\d+)/);
  const prazoKey = prazoMatch ? prazoMatch[1] : "vitalicio";
  const taxaMap = HORIZONTE_TAXAS[vigencia];
  if (!taxaMap) return "";
  const taxa = taxaMap[prazoKey] || taxaMap["vitalicio"] || Object.values(taxaMap)[0];
  if (!taxa) return "";
  const cm = cs * taxa;
  return formatBRL(cm);
}

// ─── Plano Card ───────────────────────────────────────────────────────────────

function PlanoCard({
  plano,
  index,
  isEditing,
  canRemove,
  onUpdate,
  onRemove,
}: {
  plano: Plano;
  index: number;
  isEditing: boolean;
  canRemove: boolean;
  onUpdate: (updated: Plano) => void;
  onRemove: () => void;
}) {
  const setField = (key: keyof Plano) => (value: string) => {
    onUpdate({ ...plano, [key]: value });
  };

  const addSubPlano = () => {
    const newSub: SubPlano = {
      id: `sub-${Date.now()}`,
      contribuicaoMensal: "",
      aporteInicial: "",
      tipoPlano: "PGBL",
      riskValue: 30,
      fundos: [],
    };
    onUpdate({ ...plano, subPlanos: [...plano.subPlanos, newSub] });
  };

  const updateSubPlano = (id: string) => (updated: SubPlano) => {
    onUpdate({ ...plano, subPlanos: plano.subPlanos.map((s) => (s.id === id ? updated : s)) });
  };

  const removeSubPlano = (id: string) => {
    onUpdate({ ...plano, subPlanos: plano.subPlanos.filter((s) => s.id !== id) });
  };

  const updateCobertura = (idx: number, key: keyof Cobertura, value: string) => {
    const updated = plano.coberturas.map((c, i) => {
      if (i !== idx) return c;
      const newCob = { ...c, [key]: value };
      // Ao mudar vigência ou nome, buscar CS e CM da tabela HORIZONTE_VALORES
      if (key === "vigencia" || key === "nome") {
        const nomeRef = key === "nome" ? value : c.nome;
        const vigRef = key === "vigencia" ? value : c.vigencia;
        const lookup = HORIZONTE_VALORES[nomeRef]?.[vigRef];
        if (lookup) {
          return { ...newCob, capitalSegurado: lookup.cs, contribuicaoMensal: lookup.cm };
        }
      }
      return newCob;
    });
    onUpdate({ ...plano, coberturas: updated });
  };

  const addCobertura = () => {
    const newCob: Cobertura = {
      nome: "",
      valorMin: "",
      valorMax: "",
      vigencia: "Vitalícia",
      prazoPagamento: "",
      capitalSegurado: "",
      contribuicaoMensal: "",
    };
    onUpdate({ ...plano, coberturas: [...plano.coberturas, newCob] });
  };

  const removeCobertura = (idx: number) => {
    onUpdate({ ...plano, coberturas: plano.coberturas.filter((_, i) => i !== idx) });
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid oklch(90% 0.005 260)",
        borderLeft: "4px solid rgba(30,64,175,0.3)",
        borderRadius: 8,
        padding: 24,
        marginBottom: 24,
      }}
    >
      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <SectionHeader title={`Dados do Plano ${index + 1}`} />
        {isEditing && canRemove && (
          <button
            type="button"
            onClick={onRemove}
            style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", color: "oklch(55% 0.02 250)" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        )}
      </div>

      {/* Tipo de Investimento */}
      <div style={{ marginBottom: 24 }}>
        <label className="field-label">Tipo de Investimento</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, marginTop: 8 }}>
          {[
            { id: "previdencia", label: "Previdência" },
            { id: "seguro", label: "Seguro de Vida" },
          ].map((opt) => {
            const isActive = plano.tipo === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                if (!isEditing) return;
                const newTipo = opt.id as "previdencia" | "seguro";
                if (newTipo === "seguro") {
                  // Ao mudar para seguro, garantir coberturas padrão se estiverem vazias
                  const coberturas = plano.coberturas.length > 0 ? plano.coberturas : HORIZONTE_COBERTURAS.map(c => ({ ...c }));
                  onUpdate({ ...plano, tipo: newTipo, coberturas, produtoRecomendado: plano.produtoRecomendado || "Horizonte" });
                } else {
                  // Ao mudar para previdência, garantir pelo menos 1 sub-plano
                  const subPlanos = plano.subPlanos.length > 0 ? plano.subPlanos : [
                    { id: `sub-${Date.now()}`, contribuicaoMensal: "", aporteInicial: "", tipoPlano: "PGBL" as const, riskValue: 30, fundos: [] }
                  ];
                  onUpdate({ ...plano, tipo: newTipo, subPlanos });
                }
              }}
                style={{
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: `1px solid ${isActive ? "oklch(20% 0.05 250)" : "oklch(90% 0.005 260)"}`,
                  background: isActive ? "oklch(20% 0.05 250)" : "#fff",
                  color: isActive ? "#fff" : "oklch(20% 0.05 250)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: isEditing ? "pointer" : "default",
                  transition: "all 0.15s",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Previdência fields */}
      {plano.tipo === "previdencia" && (
        <>
          {/* Idade de aposentadoria */}
          <div style={{ marginBottom: 24 }}>
            <FieldRow
              label="Idade que deseja se aposentar"
              value={plano.idadeAposentadoria}
              isEditing={isEditing}
              onChange={setField("idadeAposentadoria")}
            />
          </div>

          {/* Sub-planos */}
          {plano.subPlanos.map((sub) => (
            <SubPlanoBlock
              key={sub.id}
              sub={sub}
              isEditing={isEditing}
              canRemove={plano.subPlanos.length > 1}
              onUpdate={updateSubPlano(sub.id)}
              onRemove={() => removeSubPlano(sub.id)}
            />
          ))}

          {/* Adicionar Novo Tipo de Plano */}
          {isEditing && (
            <button
              type="button"
              onClick={addSubPlano}
              style={{
                width: "100%",
                border: "1px dashed rgba(30,64,175,0.4)",
                borderRadius: 8,
                padding: "12px 16px",
                fontSize: 13,
                color: "oklch(20% 0.05 250)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontWeight: 500,
                marginTop: 4,
                marginBottom: 8,
              }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Adicionar Novo Tipo de Plano
            </button>
          )}
        </>
      )}

      {/* Seguro de Vida fields */}
      {plano.tipo === "seguro" && (
        <>
          {/* Produto Recomendado — only Horizonte, no selection */}
          <div style={{ marginBottom: 24 }}>
            <label className="field-label">Produto Recomendado</label>
            <div style={{ marginTop: 8 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: 16,
                  borderRadius: 8,
                  border: "1px solid oklch(20% 0.05 250)",
                  background: "rgba(30,64,175,0.04)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "oklch(20% 0.05 250)" }}>Horizonte</p>
                  <p style={{ fontSize: 12, color: "oklch(55% 0.02 250)", marginTop: 2 }}>
                    O Horizonte é o seguro de vida que oferece a combinação perfeita entre proteção e a possibilidade de formação de reserva, de forma temporária ou durante toda a vida.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coberturas table — nova estrutura com Vigência, Prazo de Pagamento, Capital Segurado e Contribuição Mensal */}
          <div style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "auto" }} />
                <col style={{ width: 148 }} />
                <col style={{ width: 120 }} />
                <col style={{ width: 138 }} />
                <col style={{ width: 160 }} />
                {isEditing && <col style={{ width: 30 }} />}
              </colgroup>
              <thead>
                <tr style={{ background: "oklch(95% 0.005 260)", borderBottom: "1px solid oklch(90% 0.005 260)" }}>
                  <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Cobertura</th>
                  <th style={{ textAlign: "center", padding: "8px 6px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Vigência</th>
                  <th style={{ textAlign: "center", padding: "8px 6px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Prazo de Pagamento</th>
                  <th style={{ textAlign: "right", padding: "8px 6px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Capital Segurado</th>
                  <th style={{ textAlign: "right", padding: "8px 16px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Contribuição Mensal</th>
                  {isEditing && <th style={{ padding: "8px 4px" }}></th>}
                </tr>
              </thead>
              <tbody>
                {plano.coberturas.map((cob, i) => {
                  // Buscar CS e CM da tabela de lookup (fonte primária)
                  const lookup = HORIZONTE_VALORES[cob.nome]?.[cob.vigencia];
                  const csDisplay = cob.capitalSegurado || lookup?.cs || calcCapitalSegurado(cob);
                  const cmDisplay = cob.contribuicaoMensal || lookup?.cm || calcContribuicaoMensal(csDisplay, cob.vigencia, cob.prazoPagamento);
                  return (
                    <tr key={i} style={{ borderBottom: i < plano.coberturas.length - 1 ? "1px solid oklch(93% 0.003 260)" : "none" }}>
                      {/* Cobertura — lista suspensa com todas as opções do Horizonte */}
                      <td style={{ padding: "10px 10px", color: "oklch(30% 0.05 250)", fontWeight: i === 0 ? 600 : 400, fontSize: 11, lineHeight: 1.4 }}>
                        {isEditing ? (
                          <select
                            value={cob.nome}
                            onChange={(e) => {
                              const nomeNovo = e.target.value;
                              const lookup = HORIZONTE_VALORES[nomeNovo]?.[cob.vigencia || "Vitalícia"];
                              const updated = plano.coberturas.map((c, idx) =>
                                idx === i ? {
                                  ...c,
                                  nome: nomeNovo,
                                  capitalSegurado: lookup?.cs || "",
                                  contribuicaoMensal: lookup?.cm || "",
                                } : c
                              );
                              onUpdate({ ...plano, coberturas: updated });
                            }}
                            style={{ width: "100%", border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "4px 6px", fontSize: 11, background: "#fff", color: "oklch(20% 0.05 250)", outline: "none" }}
                          >
                            <option value="">Selecione...</option>
                            {HORIZONTE_NOMES.map((nome) => (
                              <option key={nome} value={nome}>{nome}</option>
                            ))}
                          </select>
                        ) : (
                          <span style={{ display: "block", whiteSpace: "normal", wordBreak: "break-word", fontSize: 11, fontWeight: i === 0 ? 600 : 400, color: "oklch(30% 0.05 250)" }}>{cob.nome}</span>
                        )}
                      </td>
                      {/* Vigência */}
                      <td style={{ padding: "10px 6px", textAlign: "center", fontSize: 11, whiteSpace: "nowrap" }}>
                        {isEditing ? (
                          <select
                            value={cob.vigencia}
                            onChange={(e) => updateCobertura(i, "vigencia", e.target.value)}
                            style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "4px 4px", fontSize: 11, background: "#fff", color: "oklch(20% 0.05 250)", outline: "none", width: "100%" }}
                          >
                            {VIGENCIA_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                          </select>
                        ) : (
                          <span style={{ color: "oklch(45% 0.02 250)", fontSize: 11, whiteSpace: "nowrap" }}>{cob.vigencia || "—"}</span>
                        )}
                      </td>
                      {/* Prazo de Pagamento */}
                      <td style={{ padding: "10px 6px", textAlign: "center", fontSize: 11, whiteSpace: "nowrap" }}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={cob.prazoPagamento}
                            onChange={(e) => updateCobertura(i, "prazoPagamento", e.target.value)}
                            placeholder="ex: 20 anos"
                            style={{ width: "100%", border: "1px solid oklch(90% 0.005 260)", borderRadius: 4, padding: "4px 6px", fontSize: 11, background: "#fff", color: "oklch(20% 0.05 250)", outline: "none", textAlign: "center" }}
                          />
                        ) : (
                          <span style={{ color: "oklch(45% 0.02 250)", fontSize: 11, whiteSpace: "nowrap" }}>{cob.prazoPagamento || "—"}</span>
                        )}
                      </td>
                      {/* Capital Segurado — somente leitura, sempre calculado */}
                      <td style={{ padding: "10px 6px", textAlign: "right", fontSize: 11, whiteSpace: "nowrap" }}>
                        <span style={{ color: csDisplay ? "oklch(30% 0.05 250)" : "oklch(70% 0.01 260)", fontWeight: csDisplay ? 500 : 400, fontSize: 11, whiteSpace: "nowrap" }}>
                          {csDisplay || "—"}
                        </span>
                      </td>
                      {/* Contribuição Mensal (calculada) */}
                      <td style={{ padding: "10px 16px", textAlign: "right", fontSize: 11, whiteSpace: "nowrap" }}>
                        <span style={{ color: cmDisplay ? "oklch(20% 0.1 145)" : "oklch(70% 0.01 260)", fontWeight: cmDisplay ? 600 : 400, whiteSpace: "nowrap" }}>
                          {cmDisplay || "—"}
                        </span>
                      </td>
                      {/* Botão remover cobertura */}
                      {isEditing && (
                        <td style={{ padding: "10px 8px", textAlign: "center" }}>
                          {plano.coberturas.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCobertura(i)}
                              style={{ background: "transparent", border: "none", cursor: "pointer", color: "oklch(60% 0.02 250)", padding: 2, display: "flex", alignItems: "center", justifyContent: "center" }}
                              title="Remover cobertura"
                            >
                              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
              {/* Linha de Total */}
              {plano.coberturas.length > 0 && (() => {
                const total = plano.coberturas.reduce((acc, cob) => {
                  const lookupT = HORIZONTE_VALORES[cob.nome]?.[cob.vigencia];
                  const csT = cob.capitalSegurado || lookupT?.cs || calcCapitalSegurado(cob);
                  const cmT = cob.contribuicaoMensal || lookupT?.cm || calcContribuicaoMensal(csT, cob.vigencia, cob.prazoPagamento);
                  return acc + parseBRL(cmT);
                }, 0);
                return total > 0 ? (
                  <tfoot>
                    <tr style={{ background: "oklch(95% 0.005 260)", borderTop: "2px solid oklch(88% 0.005 260)" }}>
                      <td colSpan={4} style={{ padding: "10px 10px", fontSize: 12, fontWeight: 700, color: "oklch(30% 0.05 250)", textAlign: "right" }}>Valor Total</td>
                      <td style={{ padding: "10px 16px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "oklch(20% 0.1 145)" }}>
                        {formatBRL(total)}
                      </td>
                      {isEditing && <td></td>}
                    </tr>
                  </tfoot>
                ) : null;
              })()}
            </table>
          </div>

          {/* Botão Adicionar Cobertura */}
          {isEditing && (
            <button
              type="button"
              onClick={addCobertura}
              style={{
                width: "100%",
                border: "1px dashed rgba(30,64,175,0.4)",
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: 13,
                color: "oklch(20% 0.05 250)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Adicionar Cobertura
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface DetalhamentoPlanoProps {
  onBack: () => void;
  onNext: () => void;
  onEditingChange?: (editing: boolean) => void;
}

export default function DetalhamentoPlano({ onBack, onNext, onEditingChange }: DetalhamentoPlanoProps) {
  const { detalhamentoData, saveDetalhamentoData } = useJornada();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<DetalhamentoData>(detalhamentoData);
  // Track if user has completed an edit action (save or cancel) to enable Continuar
  const [editActionDone, setEditActionDone] = useState(false);
  const data = isEditing ? draft : detalhamentoData;

  const setEditing = (val: boolean) => {
    setIsEditing(val);
    onEditingChange?.(val);
  };

  const handleEdit = () => {
    setDraft(detalhamentoData);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditActionDone(true);
  };

  const handleSave = () => {
    // Validação: soma dos percentuais de cada sub-plano deve ser 100%
    for (const plano of draft.planos) {
      if (plano.tipo !== "previdencia") continue;
      for (let si = 0; si < plano.subPlanos.length; si++) {
        const sub = plano.subPlanos[si];
        if (sub.fundos.length < 2) continue; // 1 fundo é sempre 100%
        const soma = sub.fundos.reduce((acc, f) => acc + (parseFloat(f.percentual) || 0), 0);
        if (Math.abs(soma - 100) >= 0.01) {
          const planoLabel = draft.planos.length > 1 ? ` (Plano ${draft.planos.indexOf(plano) + 1}` : "";
          const subLabel = plano.subPlanos.length > 1 ? `, Tipo de Plano ${si + 1})` : (planoLabel ? ")" : "");
          toast.error(`A soma dos percentuais dos fundos${planoLabel}${subLabel} é ${soma.toFixed(0)}%. Ajuste para totalizar 100% antes de salvar.`);
          return;
        }
      }
    }
    saveDetalhamentoData(draft);
    setEditing(false);
    setEditActionDone(true);
    toast.success("Alterações salvas com sucesso.");
  };

  const setProponente = (key: string) => (value: string) => {
    setDraft((d) => ({ ...d, proponente: { ...d.proponente, [key]: value } }));
  };

  const updatePlano = (id: string) => (updated: Plano) => {
    setDraft((d) => ({
      ...d,
      planos: d.planos.map((p) => (p.id === id ? updated : p)),
    }));
  };

  const removePlano = (id: string) => {
    setDraft((d) => ({ ...d, planos: d.planos.filter((p) => p.id !== id) }));
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const [y, m, d] = dateStr.split("-");
    if (!y || !m || !d) return dateStr;
    return `${d}/${m}/${y}`;
  };

  const continuerDisabled = isEditing;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            <svg className="h-4 w-4" style={{ color: "oklch(45% 0.02 250)" } as React.CSSProperties} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: "oklch(20% 0.05 250)" }}>
            Detalhamento do Plano
          </h1>
        </div>
        {/* Edit button top-right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={isEditing ? handleCancel : handleEdit}
            title={isEditing ? "Cancelar edição" : "Editar"}
            style={{ width: 36, height: 36, borderRadius: 8, background: "oklch(95% 0.005 260)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "oklch(45% 0.02 250)" }}
          >
            {isEditing ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Planos */}
      {data.planos.map((plano, idx) => (
        <PlanoCard
          key={plano.id}
          plano={plano}
          index={idx}
          isEditing={isEditing}
          canRemove={data.planos.length > 1}
          onUpdate={updatePlano(plano.id)}
          onRemove={() => removePlano(plano.id)}
        />
      ))}

      {/* Botão Adicionar novo plano — só aparece quando há apenas 1 plano e está em modo de edição */}
      {isEditing && data.planos.length < 2 && (
        <button
          type="button"
          onClick={() => {
            const newPlano: Plano = {
              id: `plano-${Date.now()}`,
              tipo: "previdencia",
              produtoRecomendado: "Horizonte",
              idadeAposentadoria: "",
              vigencia: "",
              tempoContribuicao: "",
              capitalSegurado: "",
              premioMensal: "",
              coberturas: HORIZONTE_COBERTURAS.map(c => ({ ...c })),
              subPlanos: [{ id: `sub-${Date.now()}`, contribuicaoMensal: "", aporteInicial: "", tipoPlano: "PGBL", riskValue: 30, fundos: [] }],
            };
            setDraft((d) => ({ ...d, planos: [...d.planos, newPlano] }));
          }}
          style={{
            width: "100%",
            border: "1px dashed rgba(30,64,175,0.4)",
            borderRadius: 8,
            padding: "14px 16px",
            fontSize: 13,
            color: "oklch(20% 0.05 250)",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Adicionar um novo plano
        </button>
      )}

      {/* Navigation + Cancelar/Salvar at bottom — todos à direita */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", paddingTop: 8, paddingBottom: 16, gap: 8 }}>
        {isEditing && (
          <>
            <button
              onClick={handleCancel}
              style={{ padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, border: "1px solid oklch(80% 0.005 260)", background: "#fff", color: "oklch(30% 0.05 250)", cursor: "pointer" }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, border: "none", background: "oklch(20% 0.05 250)", color: "#fff", cursor: "pointer" }}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Salvar
            </button>
          </>
        )}
        {/* Continuar — disabled while editing */}
        <button
          onClick={() => {
            if (continuerDisabled) {
              toast.warning("Salve ou cancele as alterações antes de continuar.", { duration: 4000 });
              return;
            }
            onNext();
          }}
          disabled={continuerDisabled}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: continuerDisabled ? "oklch(75% 0.01 260)" : "oklch(20% 0.05 250)",
            color: "#fff",
            padding: "10px 24px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            border: "none",
            cursor: continuerDisabled ? "not-allowed" : "pointer",
            opacity: continuerDisabled ? 0.6 : 1,
          }}
        >
          Continuar
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
