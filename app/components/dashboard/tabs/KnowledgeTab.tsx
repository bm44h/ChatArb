// src/app/components/dashboard/tabs/KnowledgeTab.tsx
'use client';

import { useState, useEffect } from 'react';
import KnowledgeCard from './KnowledgeCard';

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

export default function KnowledgeTab({ projectId  }: { projectId : string }) {
  const [groupedKnowledge, setGroupedKnowledge] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- [تم التغيير] مفتاح الكاش الخاص بهذا البوت ---
  const knowledgeCacheKey = `bot_knowledge_${projectId }`;

  useEffect(() => {
    if (!projectId ) {
      setIsLoading(false);
      setError("معرف البوت غير متوفر.");
      return;
    }

    const fetchKnowledge = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. تحقق من الكاش أولاً
        const cachedData = localStorage.getItem(knowledgeCacheKey);
        if (cachedData) {
          console.log("Loading knowledge from cache.");
          const parsedData: KnowledgeData = JSON.parse(cachedData);
          processAndSetKnowledge(parsedData); // <-- استخدام دالة مساعدة
          setIsLoading(false);
          return; // توقف هنا، لا حاجة لطلب API
        }

        // 2. إذا لم يكن في الكاش، اطلبه من الـ API
        console.log("Fetching knowledge from API.");
        const response = await fetch(`/api/knowledge?projectId=${projectId}`); // <-- الإصلاح الصحيح

        if (!response.ok) {
          throw new Error('فشل في جلب بيانات قاعدة المعرفة');
        }
        const data: { knowledge: KnowledgeData } = await response.json();

        // 3. قم بتخزين النتيجة في الكاش للمرة القادمة
        localStorage.setItem(knowledgeCacheKey, JSON.stringify(data.knowledge));
        
        processAndSetKnowledge(data.knowledge); // <-- استخدام دالة مساعدة

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKnowledge();
  }, [projectId ]);

  // دالة مساعدة لتجنب تكرار الكود
  const processAndSetKnowledge = (data: KnowledgeData) => {
    const groups: Record<string, string[]> = {};
    data.documents.forEach((doc, index) => {
      if (!doc) return;
      const metadata = data.metadatas[index];
      const category = metadata?.category || 'general';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(doc);
    });
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
