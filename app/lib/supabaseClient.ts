// src/lib/supabaseClient.ts
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

// هذا العميل مخصص للاستخدام في المتصفح (Client-side)
// سنقوم بإنشاء عميل آخر للخادم لاحقًا عند الحاجة
export const supabase = createPagesBrowserClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});
