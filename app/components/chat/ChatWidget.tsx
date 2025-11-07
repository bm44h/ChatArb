// src/app/components/chat/ChatWidget.tsx
'use client';

import { useState, useEffect, useRef } from 'react'; // أضف useEffect و useRef
import { MessageSquare, X, Send } from 'lucide-react';

// ... (واجهات Message و ChatWidgetProps تبقى كما هي)
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  projectId: string;
  welcomeMessage?: string;
  chatColor?: string;
}


export default function ChatWidget({ projectId }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [chatColor, setChatColor] = useState('#3b82f6'); // لون افتراضي مؤقت
  const [storeName, setStoreName] = useState('مساعد المتجر');
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  // --- [إضافة جديدة] ---
  // Ref للإشارة إلى حاوية الرسائل للتمرير التلقائي
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // دالة للتمرير إلى أسفل
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/api/widget-settings?projectId=${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        const data = await response.json();
        
        setChatColor(data.chatColor);
        setStoreName(data.storeName);
        // تعيين الرسالة الترحيبية كأول رسالة
        setMessages([{ role: 'assistant', content: data.welcomeMessage }]);

      } catch (error) {
        console.error("Error fetching widget settings:", error);
        // في حالة الفشل، استخدم الرسالة الافتراضية
        setMessages([{ role: 'assistant', content: "أهلاً بك! كيف أساعدك؟" }]);
      } finally {
        setIsSettingsLoading(false);
      }
    };

    fetchSettings();
  }, [projectId]); // يتم استدعاؤها مرة واحدة عند التحميل

  useEffect(() => {
    if (!isSettingsLoading) { // لا تقم بالتمرير إلا بعد تحميل الرسالة الأولى
        scrollToBottom();
    }
  }, [messages, isSettingsLoading]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // --- [تم التحديث بالكامل] ---
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    // أضف رسالة المستخدم على الفور
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/public-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // أرسل سجل المحادثة بالكامل (أو فقط الرسائل الأخيرة)
        body: JSON.stringify({
          projectId: projectId,
          messages: [...messages, userMessage], // إرسال السجل المحدث
        }),
      });

      if (!response.ok) {
        // إذا فشل الطلب، اعرض رسالة خطأ
        const errorData = await response.json();
        throw new Error(errorData.details || 'حدث خطأ ما.');
      }

      const result = await response.json();
      const botResponse: Message = { role: 'assistant', content: result.response };
      
      // أضف رد البوت إلى المحادثة
      setMessages(prev => [...prev, botResponse]);

    } catch (error: any) {
      // في حالة حدوث خطأ في الشبكة أو خطأ آخر
      const errorMessage: Message = { 
        role: 'assistant', 
        content: `عذرًا، حدث خطأ: ${error.message}` 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  // --- [نهاية التحديث] ---

  return (
    <div className="fixed bottom-5 right-5 z-50" dir="rtl">
      {isOpen && (
        <div className="flex flex-col w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200">
          <div
            className="flex justify-between items-center p-3 text-white rounded-t-lg"
            style={{ backgroundColor: chatColor }}
          >
            <h3 className="font-semibold">{storeName}</h3> {/* استخدام الاسم الديناميكي */}
            <button onClick={toggleOpen} className="hover:opacity-75">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm break-words ${ // أضف break-words
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
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
              {/* --- [إضافة جديدة] --- */}
              {/* عنصر فارغ للإشارة إلى نهاية الرسائل */}
              <div ref={messagesEndRef} />
              {/* --- [نهاية الإضافة] --- */}
            </div>
          </div>

          <div className="p-2 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب رسالتك..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    handleSendMessage(e);
                  }
                }}
              />
              <button
                type="submit"
                className="p-2 text-white rounded-full hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: chatColor }}
                disabled={isLoading || !input.trim()}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={toggleOpen}
        className="p-3 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        style={{ backgroundColor: chatColor }}
      >
        {isOpen ? null : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
