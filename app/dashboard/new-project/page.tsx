// src/app/dashboard/new-project/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NewProjectClient from './NewProjectClient';

// [تم التعديل] هذا النوع الآن يحتوي فقط على البيانات الأساسية
export type PlanData = {
  id: string; // plan_free, plan_basic, ...
  name: string;
  price: number;
  paddle_price_id: string | null;
};

export default async function NewProjectPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { redirect('/login'); }

  // [مهم] نحن لا نزال بحاجة لجلب هذه البيانات الأساسية من الخادم
  const { data: plansData, error } = await supabase
    .from('plans')
    .select('id, name, price, paddle_price_id')
    .order('price', { ascending: true });

  if (error) { console.error('Error fetching plans:', error); }

  return <NewProjectClient plansData={plansData || []} />;
}
