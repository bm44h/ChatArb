// app/components/FaqItemDark.tsx
'use client';

import { useState } from 'react';

type FaqItemProps = {
  question: string;
  answer: string;
};

export default function FaqItemDark({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-right"
      >
        {/* تم تغيير لون نص السؤال إلى الأبيض */}
        <span className="text-lg font-semibold text-white">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {/* تم تغيير لون نص الإجابة إلى رمادي فاتح */}
          <p className="pt-4 text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
