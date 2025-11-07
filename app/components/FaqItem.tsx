// app/components/FaqItem.tsx
'use client';

import { useState } from 'react';

type FaqItemProps = {
  question: string;
  answer: string;
};

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-right"
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* --- هذا هو الجزء الذي تم تعديله بالكامل --- */}
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out text-slate-600 ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
      {/* --- نهاية الجزء المعدل --- */}
    </div>
  );
}
