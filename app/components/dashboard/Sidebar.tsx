"use client";

import Image from "next/image";
import { Tab } from "@/app/dashboard/projects/[projectId]/page";

const navLinks: { name: string; tab: Tab; icon: string }[] = [
  { name: "نظرة عامة", tab: "overview", icon: "/icons/overview.svg" },
  { name: "التحليلات المتقدمة", tab: "analytics", icon: "/icons/analysis.svg" },
  { name: "المحادثات", tab: "conversations", icon: "/icons/chats.svg" },
  { name: "قاعدة المعرفة", tab: "knowledge", icon: "/icons/database.svg" },
  { name: " العملاء الجديد", tab: "customers", icon: "/icons/customers.svg" },
  { name: "إعدادات البوت", tab: "botsettings", icon: "/icons/settings.svg" },
];

type SidebarProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 bg-[#FCFCFC] border-l border-gray-200 p-6 h-full overflow-y-auto">
      <div className="text-2xl font-bold text-gray-800 mb-10 text-right">
        لوحة التحكم
      </div>

      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => {
          const isActive = activeTab === link.tab;
          return (
            <button
              key={link.name}
              onClick={() => onTabChange(link.tab)}
              className={`flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg text-right text-lg font-medium transition-colors w-full ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Image
                src={link.icon}
                alt={link.name}
                width={22}
                height={22}
                className="object-contain"
              />
              <span>{link.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
