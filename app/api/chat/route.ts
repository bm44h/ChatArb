// src/app/api/chat/route.ts - الإصدار النهائي باستخدام Supabase

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers';

export async function POST(request: Request) {
  try {
    // 1. التحقق من مفتاح API
    const authorizationHeader = request.headers.get('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'مفتاح الـ API مطلوب' }, { status: 401 });
    }
    const apiKey = authorizationHeader.split(' ')[1];

    // 2. قراءة الطلب
    const body = await request.json();
    const { messages } = body;
    const lastUserMessage = messages[messages.length - 1].content;

    // 3. إعداد عميل Supabase
    const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!privateKey || !url) throw new Error("متغيرات بيئة Supabase غير موجودة.");
    
    const client = createClient(url, privateKey);

    // 4. البحث عن المشروع باستخدام مفتاح الـ API
    const { data: project, error: projectError } = await client
      .from('projects')
      .select('id, store_name')
      .eq('api_key', apiKey)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ error: 'المشروع غير موجود أو مفتاح API غير صالح' }, { status: 404 });
    }
    const storeName = project.store_name || 'هذا المتجر';
    console.log(`💬 Starting chat for: ${storeName}`);

    // ✅ [الحل] 5. البحث عن المستندات ذات الصلة باستخدام SupabaseVectorStore
    // لا حاجة لتحميل النموذج يدويًا! المكتبة تقوم بذلك بكفاءة.
    const embeddings = new HuggingFaceTransformersEmbeddings({ modelName: "Xenova/multilingual-e5-base" });
    const vectorStore = new SupabaseVectorStore(embeddings, {
      client,
      tableName: "documents",
      queryName: "match_documents",
      filter: { 'metadata->>projectId': project.id } // <-- فلترة النتائج للمشروع الحالي فقط
    });

    // similaritySearch سيقوم تلقائيًا بتحويل السؤال إلى متجه والبحث
    const searchResults = await vectorStore.similaritySearch(lastUserMessage, 5);

    if (!searchResults || searchResults.length === 0) {
      console.log('⚠️ No documents found in Supabase for this query');
      return NextResponse.json({ response: "عذرًا، ليس لدي معلومات كافية للإجابة على هذا السؤال." }, { status: 200 });
    }

    const context = searchResults.map(doc => doc.pageContent).join('\n\n---\n\n');
    console.log(`📚 Found ${searchResults.length} relevant documents from Supabase`);

    // 6. بناء الـ Prompt وإرساله إلى Novita.ai
    const prompt = `أنت مساعد متجر "${storeName}". أجب على سؤال العميل بناءً على المعلومات المتوفرة فقط. لا تخترع أي معلومات. إذا لم تكن المعلومة موجودة، قل ذلك بصدق.

المعلومات المتوفرة:
${context}

سؤال العميل: ${lastUserMessage}

الإجابة (باللغة العربية):`;

    const novitaApiKey = process.env.NOVITA_AI_API_KEY;
    if (!novitaApiKey) throw new Error('NOVITA_AI_API_KEY is not set');

    const novitaResponse = await fetch('https://api.novita.ai/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${novitaApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen/qwen3-235b-a22b-instruct-2507',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      } ),
    });

    if (!novitaResponse.ok) {
      const errorText = await novitaResponse.text();
      console.error(`Novita.ai API Error (${novitaResponse.status}):`, errorText);
      throw new Error(`Novita.ai API failed with status ${novitaResponse.status}`);
    }

    const novitaResult = await novitaResponse.json();
    const botResponse = novitaResult.choices[0].message.content;
    
    return NextResponse.json({ response: botResponse }, { status: 200 });

  } catch (error: any) {
    console.error('❌ API POST /chat critical error:', error);
    return NextResponse.json({ error: 'حدث خطأ داخلي في الخادم', details: error.message }, { status: 500 });
  }
}
