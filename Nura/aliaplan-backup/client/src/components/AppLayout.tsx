import React from "react";

// CDN URL da logo ALIA
const ALIA_LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031821263/MgbGpHqkCRImoSLY.png";

interface Tab {
  id: string;
  label: string;
}

interface AppLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
  mainRef?: React.RefObject<HTMLElement | null>;
}

const tabs: Tab[] = [
  { id: "resumo", label: "Resumo Jornada de Vida" },
  { id: "detalhamento", label: "Detalhamento do Plano" },
  { id: "revisao", label: "Revisão do Estudo" },
];

export default function AppLayout({ activeTab, onTabChange, children, mainRef }: AppLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "oklch(96% 0.005 260)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* ── Sidebar ── */}
      <aside
        className="app-sidebar"
        style={{
          width: 280,
          minWidth: 280,
          background: "#ffffff",
          borderRight: "1px solid oklch(90% 0.005 260)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          flexShrink: 0,
          zIndex: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "20px 16px 16px",
            borderBottom: "1px solid oklch(93% 0.003 260)",
          }}
        >
          <img
            src={ALIA_LOGO_URL}
            alt="ALIA"
            style={{ height: 28, width: "auto", display: "block" }}
          />
        </div>

        {/* Voltar */}
        <div style={{ padding: "12px 8px 4px" }}>
          <button
            onClick={() => {}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 8px",
              fontSize: 13,
              color: "oklch(45% 0.02 250)",
              background: "transparent",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={{ flexShrink: 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Voltar
          </button>
        </div>

        {/* Navigation items */}
        <nav style={{ padding: "4px 8px", flex: 1 }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "9px 10px",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "oklch(20% 0.05 250)" : "oklch(45% 0.02 250)",
                  background: isActive ? "oklch(93% 0.005 260)" : "transparent",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  marginBottom: 2,
                  lineHeight: 1.4,
                  transition: "background 0.12s, color 0.12s",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <main
        ref={mainRef}
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Page content */}
        <div
          style={{
            width: "100%",
            padding: "clamp(16px, 3vw, 28px) clamp(16px, 4vw, 40px)",
            flex: 1,
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
