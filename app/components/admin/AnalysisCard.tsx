// src/app/admin/AnalysisCard.tsx
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// نفس الواجهة من الصفحة الرئيسية
interface AnalysisRequest {
  id: string;
  hostname: string;
  product_name_selector: string | null;
  product_description_selector: string | null;
}

export default function AnalysisCard({ request, onComplete }: { request: AnalysisRequest, onComplete: (id: string) => void }) {
  const [nameSelector, setNameSelector] = useState(request.product_name_selector || '');
  const [descSelector, setDescSelector] = useState(request.product_description_selector || '');
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClientComponentClient();

  const handleSave = async () => {
    if (!nameSelector || !descSelector) {
      alert('Please provide both selectors.');
      return;
    }
    setIsSaving(true);
    const { error } = await supabase
      .from('store_structures')
      .update({
        product_name_selector: nameSelector,
        product_description_selector: descSelector,
        status: 'completed' // تحديث الحالة إلى "مكتمل"
      })
      .eq('id', request.id);

    setIsSaving(false);
    if (error) {
      alert(`Error saving: ${error.message}`);
    } else {
      alert('Selectors saved successfully!');
      onComplete(request.id); // إزالة البطاقة من القائمة
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{request.hostname}</h2>
        <a 
          href={`http://${request.hostname}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Visit Site ↗
        </a>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor={`name-${request.id}`} className="block text-sm font-medium text-gray-700">
            Product Name Selector
          </label>
          <input
            type="text"
            id={`name-${request.id}`}
            value={nameSelector}
            onChange={(e ) => setNameSelector(e.target.value)}
            placeholder="e.g., h1.product-title"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor={`desc-${request.id}`} className="block text-sm font-medium text-gray-700">
            Product Description Selector
          </label>
          <input
            type="text"
            id={`desc-${request.id}`}
            value={descSelector}
            onChange={(e) => setDescSelector(e.target.value)}
            placeholder="e.g., .product-description"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {isSaving ? 'Saving...' : 'Save and Complete'}
        </button>
      </div>
    </div>
  );
}
