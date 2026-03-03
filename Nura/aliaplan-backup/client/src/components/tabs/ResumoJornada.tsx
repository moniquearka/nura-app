/**
 * ResumoJornada — réplica fiel do sistema de referência aliaplan-xcs9y4cb.manus.space
 * Ordem das seções:
 * 1. Perfil de Personalidade
 * 2. Cenários de Risco Atual
 * 3. Vulnerabilidades Identificadas
 * 4. Planejamento de Longo Prazo
 * 5. Soluções Propostas (2 colunas + Investimento Mensal)
 * 6. O Que Você Protege + O Que Você Garante (lado a lado)
 */

import React, { useState } from "react";
import { useJornada, ResumoData } from "@/contexts/JornadaContext";
import { toast } from "sonner";

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  Users: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Briefcase: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  Heart: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  Shield: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  TrendingUp: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCardWithIcon({
  icon: Icon,
  title,
  children,
}: {
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-card">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid oklch(90% 0.005 260)" }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "oklch(95% 0.005 260)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon className="h-4 w-4" style={{ color: "oklch(45% 0.02 250)" } as React.CSSProperties} />
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "oklch(20% 0.05 250)" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InlineEdit({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      style={{
        width: "100%",
        border: "1px solid oklch(90% 0.005 260)",
        borderRadius: 6,
        padding: "4px 8px",
        fontSize: 13,
        background: "oklch(98% 0.002 260)",
        color: "oklch(20% 0.05 250)",
        outline: "none",
      }}
    />
  );
}

function TextareaEdit({
  value,
  onChange,
  rows = 2,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      style={{
        width: "100%",
        border: "1px solid oklch(90% 0.005 260)",
        borderRadius: 6,
        padding: "6px 8px",
        fontSize: 13,
        background: "oklch(98% 0.002 260)",
        color: "oklch(20% 0.05 250)",
        outline: "none",
        resize: "vertical",
        fontFamily: "inherit",
      }}
    />
  );
}

function CheckIcon() {
  return (
    <svg style={{ width: 16, height: 16, flexShrink: 0, color: "#22c55e" } as React.CSSProperties} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface ResumoJornadaProps {
  onNext: () => void;
  onEditingChange?: (editing: boolean) => void;
}

export default function ResumoJornada({ onNext, onEditingChange }: ResumoJornadaProps) {
  const { resumoData, saveResumoData, detalhamentoData, saveDetalhamentoData } = useJornada();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<ResumoData>(resumoData);
  const [draftProponente, setDraftProponente] = useState(detalhamentoData.proponente);
  const data = isEditing ? draft : resumoData;
  const proponente = isEditing ? draftProponente : detalhamentoData.proponente;

  const setEditing = (val: boolean) => {
    setIsEditing(val);
    onEditingChange?.(val);
  };

  const handleEdit = () => {
    setDraft(resumoData);
    setDraftProponente(detalhamentoData.proponente);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    saveResumoData(draft);
    saveDetalhamentoData({ ...detalhamentoData, proponente: draftProponente });
    setEditing(false);
    toast.success("Alterações salvas com sucesso.");
  };

  const setProponente = (key: string) => (value: string) => {
    setDraftProponente((p) => ({ ...p, [key]: value }));
  };

  const updateVuln = (idx: number, key: string, val: string) => {
    setDraft((d) => ({
      ...d,
      vulnerabilidades: d.vulnerabilidades.map((v, i) => (i === idx ? { ...v, [key]: val } : v)),
    }));
  };

  const updateTimeline = (idx: number, key: string, val: string) => {
    setDraft((d) => ({
      ...d,
      timeline: d.timeline.map((t, i) => (i === idx ? { ...t, [key]: val } : t)),
    }));
  };

  const updateTimelineRisco = (tIdx: number, rIdx: number, val: string) => {
    setDraft((d) => ({
      ...d,
      timeline: d.timeline.map((t, i) =>
        i === tIdx ? { ...t, riscos: t.riscos.map((r, j) => (j === rIdx ? val : r)) } : t
      ),
    }));
  };

  const updateProtege = (idx: number, key: string, val: string) => {
    setDraft((d) => ({
      ...d,
      protege: d.protege.map((p, i) => (i === idx ? { ...p, [key]: val } : p)),
    }));
  };

  const updateGarante = (idx: number, val: string) => {
    setDraft((d) => ({
      ...d,
      garante: {
        ...d.garante,
        comProtecao: d.garante.comProtecao.map((g, i) => (i === idx ? val : g)),
      },
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "oklch(95% 0.005 260)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg className="h-4 w-4" style={{ color: "oklch(45% 0.02 250)" } as React.CSSProperties} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: "oklch(20% 0.05 250)" }}>Resumo Jornada de Vida</h1>
        </div>
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

      {/* 0. Dados do Proponente */}
      <SectionCardWithIcon
        icon={({ className }) => (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        )}
        title="Dados do Proponente"
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px 24px" }}>
          {/* Linha 1 */}
          <div>
            <p className="field-label">CPF</p>
            {isEditing ? <InlineEdit value={draftProponente.cpf} onChange={setProponente("cpf")} /> : <p className="field-value">{proponente.cpf || "—"}</p>}
          </div>
          <div>
            <p className="field-label">Nome Completo</p>
            {isEditing ? <InlineEdit value={draftProponente.nomeCompleto} onChange={setProponente("nomeCompleto")} /> : <p className="field-value">{proponente.nomeCompleto || "—"}</p>}
          </div>
          <div>
            <p className="field-label">Nome Social</p>
            {isEditing ? <InlineEdit value={draftProponente.nomeSocial} onChange={setProponente("nomeSocial")} /> : <p className="field-value">{proponente.nomeSocial || "—"}</p>}
          </div>
          {/* Linha 2 */}
          <div>
            <p className="field-label">Data de Nascimento</p>
            {isEditing ? (
              <input
                type="date"
                value={draftProponente.dataNascimento}
                onChange={(e) => setProponente("dataNascimento")(e.target.value)}
                style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 6, padding: "4px 8px", fontSize: 13, fontFamily: "inherit", width: "100%" }}
              />
            ) : (
              <p className="field-value">{proponente.dataNascimento ? proponente.dataNascimento.split("-").reverse().join("/") : "—"}</p>
            )}
          </div>
          <div>
            <p className="field-label">Telefone</p>
            {isEditing ? <InlineEdit value={draftProponente.telefone} onChange={setProponente("telefone")} /> : <p className="field-value">{proponente.telefone || "—"}</p>}
          </div>
          <div>
            <p className="field-label">E-mail</p>
            {isEditing ? <InlineEdit value={draftProponente.email} onChange={setProponente("email")} /> : <p className="field-value">{proponente.email || "—"}</p>}
          </div>
          {/* Linha 3 */}
          <div>
            <p className="field-label">Renda Mensal</p>
            {isEditing ? <InlineEdit value={draftProponente.rendaMensal} onChange={setProponente("rendaMensal")} /> : <p className="field-value">{proponente.rendaMensal || "—"}</p>}
          </div>
          <div>
            <p className="field-label">Ocupação</p>
            {isEditing ? <InlineEdit value={draftProponente.ocupacao} onChange={setProponente("ocupacao")} /> : <p className="field-value">{proponente.ocupacao || "—"}</p>}
          </div>
          <div>
            <p className="field-label">Empresa</p>
            {isEditing ? <InlineEdit value={draftProponente.empresa} onChange={setProponente("empresa")} /> : <p className="field-value">{proponente.empresa || "—"}</p>}
          </div>
        </div>
      </SectionCardWithIcon>

      {/* 1. Perfil de Personalidade */}
      <SectionCardWithIcon
        icon={({ className }) => (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        )}
        title="Perfil de Personalidade"
      >
        {isEditing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label className="field-label">Tipo de Perfil</label>
              <InlineEdit value={draft.perfil.tipo} onChange={(v) => setDraft((d) => ({ ...d, perfil: { ...d.perfil, tipo: v } }))} />
            </div>
            <div>
              <label className="field-label">Descrição</label>
              <TextareaEdit value={draft.perfil.descricao} onChange={(v) => setDraft((d) => ({ ...d, perfil: { ...d.perfil, descricao: v } }))} rows={3} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <span className="field-label">Tipo de Perfil</span>
              <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", color: "oklch(20% 0.05 250)" }}>{data.perfil.tipo}</p>
            </div>
            <div>
              <span className="field-label">Descrição</span>
              <p style={{ fontSize: 14, color: "oklch(20% 0.05 250)", lineHeight: 1.625, whiteSpace: "nowrap" }}>{data.perfil.descricao}</p>
            </div>
          </div>
        )}
      </SectionCardWithIcon>

      {/* 2. Cenários de Risco Atual */}
      <SectionCardWithIcon
        icon={({ className }) => (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        )}
        title="Cenários de Risco Atual"
      >
        <div style={{ background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: 8, padding: "12px 16px" }}>
          {isEditing ? (
            <div style={{ marginBottom: 12 }}>
              <InlineEdit value={draft.cenario.titulo} onChange={(v) => setDraft((d) => ({ ...d, cenario: { ...d.cenario, titulo: v } }))} />
            </div>
          ) : (
            <p style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)", marginBottom: 12 }}>{data.cenario.titulo}</p>
          )}
          <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {data.cenario.itens.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#1e40af" }}>
                <span style={{ marginTop: 6, width: 6, height: 6, borderRadius: "50%", background: "#1e40af", flexShrink: 0 }} />
                {isEditing ? (
                  <InlineEdit
                    value={draft.cenario.itens[i]}
                    onChange={(v) => setDraft((d) => ({ ...d, cenario: { ...d.cenario, itens: d.cenario.itens.map((it, j) => (j === i ? v : it)) } }))}
                  />
                ) : item}
              </li>
            ))}
          </ul>
        </div>
      </SectionCardWithIcon>

      {/* 3. Vulnerabilidades Identificadas */}
      <SectionCardWithIcon
        icon={({ className }) => (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        )}
        title="Vulnerabilidades Identificadas"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.vulnerabilidades.map((vuln, i) => {
            const Icon = ICON_MAP[vuln.iconKey] || ICON_MAP.Shield;
            return (
              <div key={i} style={{ borderRadius: 8, padding: 16, border: "1px solid oklch(90% 0.005 260)", background: "#f8fafc", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ marginTop: 2, width: 32, height: 32, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon className="h-4 w-4" style={{ color: "#93c5fd" } as React.CSSProperties} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {isEditing ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <InlineEdit value={draft.vulnerabilidades[i].titulo} onChange={(v) => updateVuln(i, "titulo", v)} className="font-semibold" />
                      <TextareaEdit value={draft.vulnerabilidades[i].descricao} onChange={(v) => updateVuln(i, "descricao", v)} />
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 12, color: "oklch(45% 0.02 250)", whiteSpace: "nowrap" }}>Solução Recomendada:</span>
                        <InlineEdit value={draft.vulnerabilidades[i].solucao} onChange={(v) => updateVuln(i, "solucao", v)} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)", marginBottom: 2 }}>{vuln.titulo}</p>
                      <p style={{ fontSize: 12, color: "oklch(45% 0.02 250)", marginBottom: 4 }}>{vuln.descricao}</p>
                      <p style={{ fontSize: 12, color: "#1e40af", fontWeight: 500 }}>Solução Recomendada: <strong>{vuln.solucao}</strong></p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCardWithIcon>

      {/* 4. Planejamento de Longo Prazo */}
      <SectionCardWithIcon
        icon={({ className }) => (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        )}
        title="Planejamento de Longo Prazo"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {data.timeline.map((item, i) => (
            <div key={i} className="flex gap-4 py-4" style={{ borderBottom: i < data.timeline.length - 1 ? "1px solid oklch(92% 0.003 260)" : "none" }}>
              {/* Left column: dot + vertical line */}
              <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1e3a8a", boxShadow: "0 0 0 3px #bfdbfe", flexShrink: 0 }} />
                <div style={{ width: 2, flex: 1, background: "oklch(90% 0.004 286)", marginTop: 4 }} />
              </div>
              {/* Right: grid 2 cols */}
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, paddingBottom: 4 }}>
                {/* Left col: period + title + description */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#1e40af", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 2 }}>{item.periodo}</p>
                  {isEditing ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <InlineEdit value={draft.timeline[i].titulo} onChange={(v) => updateTimeline(i, "titulo", v)} className="font-semibold" />
                      <TextareaEdit value={draft.timeline[i].descricao} onChange={(v) => updateTimeline(i, "descricao", v)} rows={2} />
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "oklch(20% 0.05 250)", marginBottom: 2 }}>{item.titulo}</p>
                      <p style={{ fontSize: 12, color: "oklch(45% 0.02 250)", lineHeight: 1.5 }}>{item.descricao}</p>
                    </>
                  )}
                </div>
                {/* Right col: risk box */}
                <div style={{ borderRadius: 8, border: "1px solid #bfdbfe", background: "rgba(239,246,255,0.8)", padding: 12, fontSize: 12, color: "#1e40af" }}>
                  <span style={{ display: "inline-block", background: "#dbeafe", color: "#1e40af", fontWeight: 700, fontSize: 11, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 6 }}>{item.riscoLabel}</span>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4 }}>
                    {item.riscos.map((risco, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 12, color: "#1e40af", lineHeight: 1.4 }}>
                        <span style={{ marginTop: 5, width: 4, height: 4, borderRadius: "50%", background: "#1e40af", flexShrink: 0 }} />
                        {isEditing ? (
                          <InlineEdit value={draft.timeline[i].riscos[j]} onChange={(v) => updateTimelineRisco(i, j, v)} />
                        ) : risco}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {/* Visão de Longo Prazo */}
          <div style={{ background: "oklch(97% 0.002 260)", border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, padding: "12px 16px", marginTop: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "oklch(20% 0.05 250)", display: "block", marginBottom: isEditing ? 6 : 4 }}>Visão de Longo Prazo:</span>
            {isEditing ? (
              <TextareaEdit
                value={draft.visaoLongoPrazo || ""}
                onChange={(v) => setDraft((d) => ({ ...d, visaoLongoPrazo: v }))}
                rows={2}
              />
            ) : (
              <span style={{ fontSize: 12, color: "oklch(45% 0.02 250)", fontStyle: "italic", lineHeight: 1.5, display: "block" }}>
                {data.visaoLongoPrazo || "Cada etapa exige preparação financeira específica. O acúmulo de capital deve ser constante para suportar os picos de despesa com educação e saúde familiar."}
              </span>
            )}
          </div>
        </div>
      </SectionCardWithIcon>

      {/* 5. Soluções Propostas */}
      <SectionCardWithIcon
        icon={({ className }) => (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        )}
        title="Soluções Propostas"
      >
        {/* Two columns: Proteção + Previdência */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 16 }}>
          {/* Coluna 1 — Proteção */}
          <div style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, padding: "14px 16px", background: "oklch(97% 0.002 260)" }}>
            {/* Header: valor + percentual editáveis */}
            {isEditing ? (
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
                  <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)", whiteSpace: "nowrap" }}>Destinar</span>
                  <input
                    type="text"
                    value={draft.solucoes.protecao.valor}
                    onChange={(e) => setDraft((d) => ({ ...d, solucoes: { ...d.solucoes, protecao: { ...d.solucoes.protecao, valor: e.target.value } } }))}
                    style={{ width: 110, border: "1px solid oklch(90% 0.005 260)", borderRadius: 6, padding: "3px 6px", fontSize: 12, background: "oklch(98% 0.002 260)", color: "oklch(20% 0.05 250)", outline: "none" }}
                  />
                  <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)", whiteSpace: "nowrap" }}>(</span>
                  <input
                    type="text"
                    value={draft.solucoes.protecao.percentual}
                    onChange={(e) => setDraft((d) => ({ ...d, solucoes: { ...d.solucoes, protecao: { ...d.solucoes.protecao, percentual: e.target.value } } }))}
                    style={{ width: 50, border: "1px solid oklch(90% 0.005 260)", borderRadius: 6, padding: "3px 6px", fontSize: 12, background: "oklch(98% 0.002 260)", color: "oklch(20% 0.05 250)", outline: "none" }}
                  />
                  <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)", whiteSpace: "nowrap" }}>% do saldo) garante:</span>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)" }}>Destinar</span>
                <strong style={{ fontSize: 12 }}>{data.solucoes.protecao.valor}/mês</strong>
                <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)" }}>(<strong style={{ fontSize: 12 }}>{data.solucoes.protecao.percentual}% do saldo</strong>) garante:</span>
              </div>
            )}
            {data.solucoes.protecao.itens.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                <CheckIcon />
                {isEditing ? (
                  <InlineEdit
                    value={draft.solucoes.protecao.itens[i]}
                    onChange={(v) => setDraft((d) => ({ ...d, solucoes: { ...d.solucoes, protecao: { ...d.solucoes.protecao, itens: d.solucoes.protecao.itens.map((it, j) => j === i ? v : it) } } }))}
                  />
                ) : (
                  <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)" }}>{item}</span>
                )}
              </div>
            ))}
          </div>
          {/* Coluna 2 — Previdência */}
          <div style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, padding: "14px 16px", background: "oklch(97% 0.002 260)" }}>
            {/* Header: valor + percentual editáveis */}
            {isEditing ? (
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
                  <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)", whiteSpace: "nowrap" }}>E destinando mais</span>
                  <input
                    type="text"
                    value={draft.solucoes.previdencia.valor}
                    onChange={(e) => setDraft((d) => ({ ...d, solucoes: { ...d.solucoes, previdencia: { ...d.solucoes.previdencia, valor: e.target.value } } }))}
                    style={{ width: 110, border: "1px solid oklch(90% 0.005 260)", borderRadius: 6, padding: "3px 6px", fontSize: 12, background: "oklch(98% 0.002 260)", color: "oklch(20% 0.05 250)", outline: "none" }}
                  />
                  <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)", whiteSpace: "nowrap" }}>(</span>
                  <input
                    type="text"
                    value={draft.solucoes.previdencia.percentual}
                    onChange={(e) => setDraft((d) => ({ ...d, solucoes: { ...d.solucoes, previdencia: { ...d.solucoes.previdencia, percentual: e.target.value } } }))}
                    style={{ width: 50, border: "1px solid oklch(90% 0.005 260)", borderRadius: 6, padding: "3px 6px", fontSize: 12, background: "oklch(98% 0.002 260)", color: "oklch(20% 0.05 250)", outline: "none" }}
                  />
                  <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)", whiteSpace: "nowrap" }}>% do saldo) garante:</span>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)" }}>E destinando mais</span>
                <strong style={{ fontSize: 12 }}>{data.solucoes.previdencia.valor}/mês</strong>
                <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)" }}>(<strong style={{ fontSize: 12 }}>{data.solucoes.previdencia.percentual}% do saldo</strong>) garante:</span>
              </div>
            )}
            {data.solucoes.previdencia.itens.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <CheckIcon />
                {isEditing ? (
                  <InlineEdit
                    value={draft.solucoes.previdencia.itens[i]}
                    onChange={(v) => setDraft((d) => ({ ...d, solucoes: { ...d.solucoes, previdencia: { ...d.solucoes.previdencia, itens: d.solucoes.previdencia.itens.map((it, j) => j === i ? v : it) } } }))}
                  />
                ) : (
                  <span style={{ fontSize: 13, color: "oklch(30% 0.05 250)" }}>{item}</span>
                )}
              </div>
            ))}
            {isEditing ? (
              <TextareaEdit
                value={draft.solucoes.previdencia.citacao}
                onChange={(v) => setDraft((d) => ({ ...d, solucoes: { ...d.solucoes, previdencia: { ...d.solucoes.previdencia, citacao: v } } }))}
                rows={2}
              />
            ) : (
              <p style={{ fontSize: 12, color: "oklch(45% 0.02 250)", fontStyle: "italic", lineHeight: 1.5, borderTop: "1px solid oklch(90% 0.005 260)", paddingTop: 10 }}>
                "{data.solucoes.previdencia.citacao}"
              </p>
            )}
          </div>
        </div>

        {/* Investimento Mensal — soma automática dos dois valores */}
        {(() => {
          // Parse currency strings like "R$ 2.500,00" or "R$ 2.500/mês"
          const parseVal = (s: string) => {
            const clean = s.replace(/[R$\s/mês]/g, "").replace(/\./g, "").replace(",", ".");
            const n = parseFloat(clean);
            return isNaN(n) ? 0 : n;
          };
          const v1 = parseVal(data.solucoes.protecao.valor);
          const v2 = parseVal(data.solucoes.previdencia.valor);
          const total = v1 + v2;
          const totalStr = total.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
          return (
            <div style={{ border: "1px solid oklch(90% 0.005 260)", borderRadius: 8, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "oklch(20% 0.05 250)" }}>Investimento Mensal</p>
                <p style={{ fontSize: 12, color: "oklch(45% 0.02 250)" }}>Apenas 30% do seu saldo mensal</p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)" }}>R$ {totalStr}</span>
            </div>
          );
        })()}
      </SectionCardWithIcon>

      {/*

      {/* 6. O Que Você Protege + O Que Você Garante */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 0 }}>
        <div className="section-card" style={{ marginBottom: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "oklch(20% 0.05 250)", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid oklch(90% 0.005 260)" }}>
            O Que Você Protege
          </h3>
          <div>
            {data.protege.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 0", borderBottom: i < data.protege.length - 1 ? "1px solid rgba(226,232,240,0.6)" : "none", gap: 8 }}>
                <div>
                  {isEditing ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <InlineEdit value={draft.protege[i].titulo} onChange={(v) => updateProtege(i, "titulo", v)} />
                      <InlineEdit value={draft.protege[i].subtitulo} onChange={(v) => updateProtege(i, "subtitulo", v)} />
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "oklch(20% 0.05 250)" }}>{item.titulo}</p>
                      <p style={{ fontSize: 11, color: "oklch(45% 0.02 250)" }}>{item.subtitulo}</p>
                    </>
                  )}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "oklch(20% 0.05 250)", whiteSpace: "nowrap" }}>
                  {isEditing ? (
                    <InlineEdit value={draft.protege[i].valor} onChange={(v) => updateProtege(i, "valor", v)} />
                  ) : item.valor}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card" style={{ marginBottom: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "oklch(20% 0.05 250)", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid oklch(90% 0.005 260)" }}>
            O Que Você Garante
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <CheckIcon />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>Com Proteção</span>
          </div>
          <div>
            {data.garante.comProtecao.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0", borderBottom: i < data.garante.comProtecao.length - 1 ? "1px solid rgba(226,232,240,0.6)" : "none" }}>
                <CheckIcon />
                {isEditing ? (
                  <InlineEdit value={draft.garante.comProtecao[i]} onChange={(v) => updateGarante(i, v)} />
                ) : (
                  <span style={{ fontSize: 13, color: "oklch(20% 0.05 250)", flex: 1 }}>{item}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, paddingTop: 24, paddingBottom: 16 }}>
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
        <button
          onClick={() => {
            if (isEditing) {
              toast.warning("Salve as alterações antes de continuar.", { description: 'Clique em "Salvar" ou "Cancelar" para sair do modo de edição.', duration: 4000 });
              return;
            }
            onNext();
          }}
          disabled={isEditing}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: isEditing ? "oklch(80% 0.005 260)" : "oklch(20% 0.05 250)",
            color: isEditing ? "oklch(50% 0.01 260)" : "#fff",
            padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500,
            border: "none", cursor: isEditing ? "not-allowed" : "pointer",
            opacity: isEditing ? 0.6 : 1,
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
