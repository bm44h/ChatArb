// app/components/chat/ChatWidget.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

// --- واجهات الأنواع ---
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  projectId: string;
}

// --- المكون الرئيسي ---
export default function ChatWidget({ projectId }: ChatWidgetProps) {
  // --- الحالة (State) ---
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatColor, setChatColor] = useState("#3b82f6");
  const [storeName, setStoreName] = useState("مساعد المتجر");
  const [isReady, setIsReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- التأثيرات (Effects) ---

  // 1. إرسال رسائل تغيير الحجم إلى الصفحة الأم
  useEffect(() => {
    const resizePayload = isOpen 
      ? { width: '350px', height: '600px' } 
      : { width: '80px', height: '80px' };
    window.parent.postMessage({ type: 'resize-manus-chat', payload: resizePayload }, '*');
  }, [isOpen]);

  // 2. جلب إعدادات الويجت عند التحميل
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/api/widget-settings?projectId=${projectId}`);
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        setChatColor(data.chatColor);
        setStoreName(data.storeName);
        setMessages([{ role: "assistant", content: data.welcomeMessage }]);
      } catch (error) {
        console.error("Error fetching widget settings:", error);
        setMessages([{ role: "assistant", content: "أهلاً بك! كيف أساعدك؟" }]);
      } finally {
        setIsReady(true);
      }
    };
    fetchSettings();
  }, [projectId]);

  // 3. التمرير التلقائي للأسفل عند وصول رسالة جديدة
  useEffect(() => {
    if (isReady) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isReady]);

  // --- الدوال المساعدة ---

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/public-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, messages: [...messages, userMessage] }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "An unknown error occurred.");
      }
      const result = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: result.response }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: "assistant", content: `عذرًا، حدث خطأ: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- واجهة المستخدم (Render) ---

  if (!isReady) {
    // لا تعرض أي شيء حتى يتم تحميل الإعدادات لتجنب الوميض
    return null;
  }

  return (
    <div className="w-full h-full bg-transparent font-sans" dir="rtl">
      
      {/* نافذة الدردشة */}
      <div
        className={`
          flex flex-col w-[350px] h-[580px] bg-white rounded-lg shadow-xl border border-gray-200
          fixed bottom-0 right-0 origin-bottom-right
          transition-transform duration-300
          ${isOpen ? "scale-100" : "scale-0"}
        `}
      >
        <div className="flex justify-between items-center p-3 text-white rounded-t-lg" style={{ backgroundColor: chatColor }}>
          <h3 className="font-semibold">{storeName}</h3>
          <button onClick={toggleOpen} className="hover:opacity-75"><X size={20} /></button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm break-words ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 p-3 rounded-lg">
                  <div className="flex items-center justify-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-2 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="اكتب رسالتك..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { handleSendMessage(e); } }}
            />
            <button type="submit" className="p-2 text-white rounded-full hover:opacity-80 disabled:opacity-50" style={{ backgroundColor: chatColor }} disabled={isLoading || !input.trim()}>
              <img src="/icons/send.svg" alt="send" className="w-5 h-5 invert" />
            </button>
          </form>
        </div>
      </div>

      {/* أيقونة الفقاعة */}
      <button
        onClick={toggleOpen}
        className="p-3 text-white rounded-full shadow-lg transition-transform fixed bottom-4 right-4"
        style={{ 
          backgroundColor: chatColor,
          transform: isOpen ? 'scale(0)' : 'scale(1)', // إخفاء الفقاعة عند الفتح
        }}
      >
        <img src="/icons/support.svg" alt="support" className="w-6 h-6 invert" />
      </button>
    </div>
  );
}
