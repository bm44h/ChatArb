// src/app/components/dashboard/tabs/KnowledgeTab.tsx
'use client';

import { useState, useEffect, useCallback  } from 'react';
import KnowledgeCard from './KnowledgeCard';
import toast from "react-hot-toast";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';



interface KnowledgeData {
  documents: (string | null)[];
  metadatas: (Record<string, any> | null)[];
}

const categoryTitles: { [key: string]: string } = {
  store_name: 'اسم المتجر',
  shipping: 'معلومات التوصيل والشحن',
  returns: 'معلومات الإرجاع والاستبدال',
  product_info: 'المنتجات',
  Payment: 'طرق الدفع',
};

export default function KnowledgeTab({ projectId }: { projectId: string }) {
  const [groupedKnowledge, setGroupedKnowledge] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClientComponentClient();


  const knowledgeCacheKey = `bot_knowledge_${projectId}`;

  // ✅ [تم التعديل] فصل دالة الجلب لتكون قابلة لإعادة الاستخدام
  // في KnowledgeTab.tsx

  const fetchAndProcessKnowledge = useCallback(async (fromCache = true) => {
  setIsLoading(true);
  setError(null);
  try {
    // 1. إذا لم يكن تحديثًا قسريًا، حاول استخدام الكاش
    if (fromCache) {
      const cachedData = localStorage.getItem(knowledgeCacheKey);
      if (cachedData) {
        console.log("Loading knowledge from cache.");
        processAndSetKnowledge(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }
    }

    // ✅ [الحل النهائي] إذا كان تحديثًا قسريًا (fromCache = false)،
    // أو إذا لم يتم العثور على الكاش، قم بحذف أي كاش قديم أولاً.
    console.log("Invalidating old knowledge cache...");
    localStorage.removeItem(knowledgeCacheKey);

    // 2. اطلب البيانات الجديدة من الـ API
    console.log("Fetching fresh knowledge from API.");
    const response = await fetch(`/api/knowledge?projectId=${projectId}`);
    if (!response.ok) throw new Error('فشل في جلب بيانات قاعدة المعرفة');
    
    const data = await response.json();
    const knowledgeData = data.documents 
      ? { documents: data.documents.map((d: any) => d.content), metadatas: data.documents.map((d: any) => d.metadata) } 
      : { documents: [], metadatas: [] };

    // 3. قم بتخزين النتيجة الجديدة والصحيحة في الكاش
    console.log("Saving fresh knowledge to cache.");
    localStorage.setItem(knowledgeCacheKey, JSON.stringify(knowledgeData));
    
    // 4. قم بتحديث الواجهة
    processAndSetKnowledge(knowledgeData);

  } catch (err: any) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
}, [projectId, knowledgeCacheKey]);

  // التأثير الأولي لجلب البيانات
  useEffect(() => {
    if (!projectId) {
      setIsLoading(false);
      setError("معرف البوت غير متوفر.");
      return;
    }
    fetchAndProcessKnowledge();
  }, [projectId]);

  // ✅ [الحل النهائي] مستمع لتحديثات Supabase Realtime
  useEffect(() => {
    if (!projectId) return;

    // تعريف قناة الاشتراك
    const channel = supabase
      .channel(`project-updates-${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'projects',
          filter: `id=eq.${projectId}`, // استمع فقط للتغييرات على هذا المشروع
        },
        (payload) => {
          console.log('Supabase Realtime: Project updated!', payload);
          toast('تم اكتشاف تحديثات من الخادم، جاري تحديث قاعدة المعرفة...', { icon: '🔄' });
          
          // قم بإعادة الجلب مع تجاهل الكاش
          fetchAndProcessKnowledge(false);
        }
      )
      .subscribe();

    console.log(`Supabase Realtime: Subscribed to updates for project ${projectId}`);

    // تنظيف الاشتراك عند إغلاق المكون
    return () => {
      console.log(`Supabase Realtime: Unsubscribing from project ${projectId}`);
      supabase.removeChannel(channel);
    };
  }, [projectId, supabase, fetchAndProcessKnowledge]);

  // ... (بقية الكود: processAndSetKnowledge, والجزء الخاص بالعرض يبقى كما هو)
  const processAndSetKnowledge = (data: any) => {
    const groups: Record<string, string[]> = {};
    if (data && data.documents) {
        data.documents.forEach((doc: string, index: number) => {
            if (!doc) return;
            const metadata = data.metadatas[index];
            const category = metadata?.category || 'general';
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(doc);
        });
    }
    setGroupedKnowledge(groups);
  };

  if (isLoading) {
    return <div className="text-center p-10">جاري جلب بيانات قاعدة المعرفة...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">خطأ: {error}</div>;
  }

  const displayCategories = ['store_name', 'shipping', 'returns', 'product_info', 'Payment'];

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">قاعدة المعرفة</h1>
      <p className="text-gray-600 mb-8">
        هذه هي البيانات التي تم جمعها تلقائياً من موقعك. سيستخدمها البوت للإجابة على أسئلة عملائك.
      </p>
      <div className="space-y-4 max-w-4xl mx-auto  ">
        {displayCategories.map(categoryKey => (
          <KnowledgeCard
            key={categoryKey}
            title={categoryTitles[categoryKey] || categoryKey}
            documents={groupedKnowledge[categoryKey] || []}
          />
        ))}
      </div>
    </div>
  );
}