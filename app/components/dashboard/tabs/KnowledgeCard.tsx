// src/app/components/dashboard/tabs/KnowledgeCard.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface KnowledgeCardProps {
  title: string;
  documents: string[];
}

export default function KnowledgeCard({ title, documents }: KnowledgeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasContent = documents.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl ">
      {/* زر التحكم بالفتح والإغلاق */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-right"
        disabled={!hasContent}
      >
        <div className="flex items-center gap-3">
          {hasContent ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <div className="w-5 h-5" /> // مساحة فارغة للمحاذاة
          )}
          <span className={`font-semibold ${hasContent ? 'text-gray-800' : 'text-gray-400'}`}>
            {title}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${hasContent ? 'text-gray-500' : 'text-gray-300'}`}
        />
      </button>
      
      {/* --- [تم التغيير هنا] --- */}
      {/* حاوية المحتوى القابلة للتحريك */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ maxHeight: isOpen ? '3000px' : '0px' }} // قيمة كبيرة لـ max-height
      >
        <div className="px-4 pb-4">
          <div className="bg-gray-100 p-3 rounded-lg space-y-2">
            {documents.map((doc, index) => (
              <p key={index} className="text-sm text-gray-800 border-b border-gray-200 py-2 last:border-b-0">
                {doc}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* --- نهاية التغيير --- */}
    </div>
  );
}
