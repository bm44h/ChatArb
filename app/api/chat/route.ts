// src/app/api/chat/route.ts

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js'; // <-- [تغيير] استيراد العميل العادي
import { cookies } from 'next/headers';
import { CloudClient } from "chromadb";
import { pipeline, env } from '@xenova/transformers'; // <-- استيراد pipeline

// --- إعدادات خاصة بـ Transformers.js ---
env.allowLocalModels = false;
env.useBrowserCache = false;

// --- دالة مساعدة لضمان تحميل النموذج مرة واحدة فقط ---
let extractor: any = null;
async function getExtractor() {
  if (extractor === null) {
    console.log('🧠 Initializing embeddings model for chat...');
    extractor = await pipeline('feature-extraction', 'Xenova/multilingual-e5-base');
    console.log('🧠 Chat embeddings model ready.');
  }
  return extractor;
}

export async function POST(request: Request) {
  try {

    const authorizationHeader = request.headers.get('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'مفتاح الـ API مطلوب' }, { status: 401 });
    }
    const apiKey = authorizationHeader.split(' ')[1];

    const body = await request.json();
    const {  messages } = body;



    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. البحث عن المشروع باستخدام مفتاح الـ API
    const { data: project, error: projectError } = await supabaseAdmin
      .from('projects')
      .select('id, store_name') // جلب الـ id و store_name
      .eq('api_key', apiKey) // <-- البحث بالمفتاح
      .single();

    if (projectError || !project) {
      console.error('❌ Supabase project fetch error:', projectError);
      return NextResponse.json({ error: 'المشروع غير موجود' }, { status: 404 });
    }

    const projectId = project.id;
    const storeName = project.store_name || 'هذا المتجر';
    const modelToUse = 'qwen/qwen3-235b-a22b-instruct-2507';
    
    console.log(`💬 Starting chat for: ${storeName}`);

    // --- [تم الإصلاح هنا] ---
    // 1. تحويل سؤال المستخدم إلى متجه باستخدام نفس النموذج
    const lastUserMessage = messages[messages.length - 1].content;
    const extractor = await getExtractor();
    const queryEmbedding = await extractor(lastUserMessage, { pooling: 'mean', normalize: true });

    // 2. البحث في ChromaDB باستخدام المتجه
    const chromaClient = new CloudClient();
    const collectionName = `project-${projectId}`; // <-- استخدام البادئة الصحيحة
    console.log(`🔍 Searching in ChromaDB collection: ${collectionName}`);
    const collection = await chromaClient.getCollection({ name: collectionName });

    const searchResults = await collection.query({
      queryEmbeddings: [queryEmbedding.tolist()[0]], // <-- البحث بالمتجه
      nResults: 5,
    });
    // --- [نهاية الإصلاح] ---

    if (!searchResults.documents || searchResults.documents[0].length === 0) {
      console.log('⚠️ No documents found in ChromaDB');
      // يمكنك هنا إرجاع رد عام بدلاً من خطأ
      return NextResponse.json({ response: "عذرًا، ليس لدي معلومات كافية للإجابة على هذا السؤال في الوقت الحالي. هل يمكنني مساعدتك في شيء آخر؟" }, { status: 200 });
    }

    const context = searchResults.documents[0].join('\n\n---\n\n');
    console.log(`📚 Found ${searchResults.documents[0].length} relevant documents`);

    const prompt = `أنت مساعد متجر "${storeName}". أجب على سؤال العميل بناءً على المعلومات المتوفرة فقط. لا تخترع أي معلومات. إذا لم تكن المعلومة موجودة، قل ذلك بصدق.

المعلومات المتوفرة:
${context}

سؤال العميل: ${lastUserMessage}

الإجابة (باللغة العربية):`;

    if (!process.env.NOVITA_AI_API_KEY) {
      throw new Error('NOVITA_AI_API_KEY is not set');
    }

    const novitaResponse = await fetch('https://api.novita.ai/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOVITA_AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      } ),
    });

    if (!novitaResponse.ok) {
      const errorText = await novitaResponse.text();
      // إضافة المزيد من التفاصيل للخطأ
      console.error(`Novita.ai API Error (${novitaResponse.status}):`, errorText);
      throw new Error(`Novita.ai API failed with status ${novitaResponse.status}`);
    }

    const novitaResult = await novitaResponse.json();

        // التحقق من وجود الرد في المسار الصحيح
    if (!novitaResult.choices || !novitaResult.choices[0] || !novitaResult.choices[0].message) {
        console.error('Invalid response structure from Novita.ai:', novitaResult);
        throw new Error('لم يتم العثور على الرد في استجابة Novita.ai');
    }

    const botResponse = novitaResult.choices[0].message.content;
    
    return NextResponse.json({ response: botResponse }, { status: 200 });

  } catch (error: any) {
    console.error('❌ API POST /chat critical error:', error);
    return NextResponse.json({ error: 'حدث خطأ داخلي في الخادم', details: error.message }, { status: 500 });
  }
}
