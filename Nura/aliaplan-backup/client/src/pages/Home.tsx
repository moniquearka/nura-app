import React, { useState, useRef, useCallback } from "react";
import AppLayout from "@/components/AppLayout";
import ResumoJornada from "@/components/tabs/ResumoJornada";
import DetalhamentoPlano from "@/components/tabs/DetalhamentoPlano";
import RevisaoEstudo from "@/components/tabs/RevisaoEstudo";
import { toast } from "sonner";

type TabId = "resumo" | "detalhamento" | "revisao";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("resumo");
  // Tracks which tab is currently in unsaved-edit mode
  const [editingTab, setEditingTab] = useState<TabId | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [opacity, setOpacity] = useState(1);

  /** Scroll the main content area to the top smoothly */
  const scrollToTop = useCallback(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  /** Animated tab transition with scroll-to-top */
  const doSwitch = useCallback((tab: TabId) => {
    if (tab === activeTab) return;
    // 1. Fade out
    setOpacity(0);
    setTimeout(() => {
      // 2. Switch tab content (still invisible)
      setActiveTab(tab);
      // 3. Scroll to top smoothly after new content is mounted
      setTimeout(() => {
        scrollToTop();
        // 4. Fade in after a brief moment to let scroll start
        setTimeout(() => setOpacity(1), 80);
      }, 30);
    }, 180);
  }, [activeTab, scrollToTop]);

  /** Called by sidebar items and Continuar button */
  const switchTab = useCallback((tab: string) => {
    const target = tab as TabId;
    if (target === activeTab) return;

    // Block navigation if any tab has unsaved edits
    if (editingTab !== null) {
      toast.warning("Salve as alterações antes de continuar.", {
        description: 'Clique em "Salvar" ou "Cancelar" para sair do modo de edição.',
        duration: 4000,
      });
      return;
    }

    doSwitch(target);
  }, [activeTab, editingTab, doSwitch]);

  /** Called by each tab when editing state changes */
  const handleEditingChange = useCallback((tab: TabId, editing: boolean) => {
    setEditingTab(editing ? tab : null);
  }, []);

  return (
    <AppLayout activeTab={activeTab} onTabChange={switchTab} mainRef={mainRef}>
      <div style={{ opacity, transition: "opacity 180ms ease" }}>
        {activeTab === "resumo" && (
          <ResumoJornada
            onNext={() => switchTab("detalhamento")}
            onEditingChange={(editing) => handleEditingChange("resumo", editing)}
          />
        )}
        {activeTab === "detalhamento" && (
          <DetalhamentoPlano
            onBack={() => switchTab("resumo")}
            onNext={() => switchTab("revisao")}
            onEditingChange={(editing) => handleEditingChange("detalhamento", editing)}
          />
        )}
        {activeTab === "revisao" && (
          <RevisaoEstudo />
        )}
      </div>
    </AppLayout>
  );
}
