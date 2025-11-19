// src/app/api/chat/route.ts - الإصدار 15.0 (The "Aha!" Moment)

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

export async function POST(request: Request) {
  try {
    // ... (كل الكود حتى الخطوة 5 يبقى كما هو)
    const authorizationHeader = request.headers.get("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "مفتاح الـ API مطلوب" },
        { status: 401 }
      );
    }
    const apiKey = authorizationHeader.split(" ")[1];
    const body = await request.json();
    const { messages } = body;
    const lastUserMessage = messages[messages.length - 1].content;
    const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!privateKey || !url)
      throw new Error("متغيرات بيئة Supabase غير موجودة.");
    const client = createClient(url, privateKey);
    const { data: project, error: projectError } = await client
      .from("projects")
      .select("id, store_name, bot_name")
      .eq("api_key", apiKey)
      .single();
    if (projectError || !project) {
      return NextResponse.json(
        { error: "المشروع غير موجود أو مفتاح API غير صالح" },
        { status: 404 }
      );
    }
    const storeName = project.store_name || "هذا المتجر";
    const botName = project.bot_name || "المساعد الذكي";
    console.log(
      `💬 Starting chat for: ${storeName} (Project ID: ${project.id})`
    );

    // ... (التعامل مع الأسئلة التعريفية)

    // 5. [تم التعديل الجذري والنهائي] البحث عن المستندات مع فلتر مباشر
    const embeddings = new HuggingFaceTransformersEmbeddings({
      modelName: "Xenova/multilingual-e5-base",
    });

    const queryEmbedding = await embeddings.embedQuery(lastUserMessage);

    const { data: searchResults, error: rpcError } = await client.rpc(
      "match_documents",
      {
        query_embedding: queryEmbedding,
        match_count: 5,
        p_project_id: project.id, // تمرير project_id إلى المتغير الصحيح
      }
    );
    // استخدام similaritySearch مباشرة، سيتم تطبيق الفلتر تلقائيًا
    if (rpcError) {
      console.error("RPC Error:", rpcError);
      throw new Error("Failed to search for documents using RPC.");
    }

    if (!searchResults || searchResults.length === 0) {
      console.log("⚠️ No documents found in Supabase for this query");
      // ... (التعامل مع الأسئلة التعريفية هنا كخطة بديلة)
      const greetingKeywords = [
        "أنت",
        "من أنت",
        "ماذا تفعل",
        "مرحبا",
        "أهلا",
        "السلام عليكم",
      ];
      if (greetingKeywords.some((k) => lastUserMessage.includes(k))) {
        const introResponse = `أهلاً بك! أنا ${botName}، مساعدك الآلي في متجر "${storeName}". كيف يمكنني خدمتك اليوم؟`;
        return NextResponse.json({ response: introResponse }, { status: 200 });
      }
      return NextResponse.json(
        { response: "عذرًا، ليس لدي معلومات كافية للإجابة على هذا السؤال." },
        { status: 200 }
      );
    }

    const context = searchResults
      .map((doc: { content: any }) => doc.content)
      .join("\n\n---\n\n");
    console.log(
      `📚 Found ${searchResults.length} relevant documents from Supabase`
    );

    const systemPrompt = `
أنت "${botName}"، مساعد ودود ومختصر في متجر "${storeName}".
قواعد صارمة:
1) أجب باختصار (جملة أو جملتين).
2) اعتمد فقط على "المعلومات المتوفرة" في قسم "المعلومات المتوفرة" بالأسفل.
3) إن لم توجد إجابة مؤكدة في المعلومات المتوفرة، أجب بدقة: "عذرًا، لا تتوفر لدي هذه المعلومة."
4) لا تختلق أرقام أو تواريخ أو قيم تكلفة إن لم تكن مذكورة صراحة في المعلومات المتوفرة.
5) تكلم فقط بالغه العربيه فقط.

---
المعلومات المتوفرة:
${context}
---
سؤال العميل: ${lastUserMessage}
الرد المطلوب (ودود، مختصر، ومباشر وباللغه العربيه فقط):
`;

    const novitaApiKey = process.env.NOVITA_AI_API_KEY;
    if (!novitaApiKey) throw new Error("NOVITA_AI_API_KEY is not set");

    const novitaResponse = await fetch(
      "https://api.novita.ai/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${novitaApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-235b-a22b-instruct-2507",
          messages: [
          { role: "system", content: systemPrompt },
          // نضمّن history كاملة لكي يفهم السياق
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],

          temperature: 1.0,
          max_tokens: 150,
        }),
      }
    );

    if (!novitaResponse.ok) {
      const errorText = await novitaResponse.text();
      console.error(
        `Novita.ai API Error (${novitaResponse.status}):`,
        errorText
      );
      throw new Error(
        `Novita.ai API failed with status ${novitaResponse.status}`
      );
    }

    const novitaResult = await novitaResponse.json();
    const botResponse = novitaResult.choices[0].message.content;

    return NextResponse.json({ response: botResponse }, { status: 200 });
  } catch (error: any) {
    console.error("❌ API POST /chat critical error:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي في الخادم", details: error.message },
      { status: 500 }
    );
  }
}
