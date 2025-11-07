// src/app/dashboard/projects/[projectId]/page.tsx
"use client";

import { useState, useEffect, use } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";

import OverviewTab from "@/app/components/dashboard/tabs/OverviewTab";
import AnalyticsTab from "@/app/components/dashboard/tabs/AnalyticsTab";
import ConversationsTab from "@/app/components/dashboard/tabs/ConversationsTab";
import KnowledgeTab from "@/app/components/dashboard/tabs/KnowledgeTab";
import CustomersTab from "@/app/components/dashboard/tabs/CustomersTab";
import BotSettingsTab from "@/app/components/dashboard/tabs/BotSettingsTab";

export type Tab = "overview" | "analytics" | "conversations" | "knowledge" | "customers" | "botsettings";

export default function BotDashboardPage({ params }: { params: Promise<{ projectId: string }> }) {
  
  const resolvedParams = use(params);
  const { projectId } = resolvedParams;

  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [knowledgeData, setKnowledgeData] = useState(null);
  const [isKnowledgeLoading, setIsKnowledgeLoading] = useState(true);

  // جلب الجلسة باستخدام useEffect
  useEffect(() => {
    const getSession = async () => {
      const supabase = createClientComponentClient();
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();
  }, []);

  // يمكنك وضع هذا خارج المكون أو داخله
const tabComponents: { [key in Tab]: React.ComponentType<any> } = {
  overview: OverviewTab,
  analytics: AnalyticsTab,
  conversations: ConversationsTab,
  knowledge: KnowledgeTab,
  customers: CustomersTab,
  botsettings: BotSettingsTab,
};

  useEffect(() => {
    const fetchKnowledge = async () => {
      if (!projectId) return;
      setIsKnowledgeLoading(true);
      try {
        const response = await fetch(`/api/knowledge?projectId=${projectId}`);
        const data = await response.json();
        setKnowledgeData(data.knowledge);
      } catch (error) {
        console.error("Failed to fetch knowledge data:", error);
      } finally {
        setIsKnowledgeLoading(false);
      }
    };
    fetchKnowledge();
  }, [projectId]);

  const handleTabChange = (tab: Tab) => setActiveTab(tab);

  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="flex flex-col h-screen overflow-hidden " dir="rtl">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#FCFCFC]">
          {/* قم بتصيير المكون النشط فقط ومرر له الخصائص اللازمة */}
          <ActiveComponent projectId={projectId} />
        </main>
      </div>
    </div>
  );
}