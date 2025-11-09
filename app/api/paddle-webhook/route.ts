// src/app/api/paddle-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET!;

// [تم التعديل] إنشاء عميل Supabase باستخدام مفتاح الخدمة (Service Role Key)
// هذا المفتاح يمنحنا صلاحيات كاملة على قاعدة البيانات من الخادم
// وهو آمن للاستخدام هنا لأن هذا الكود يعمل في الخادم فقط

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const signature = req.headers.get("paddle-signature") || "";
    const requestBody = await req.text();

    // 1. التحقق من التوقيع
    if (!PADDLE_WEBHOOK_SECRET) {
      throw new Error("Paddle webhook secret is not configured.");
    }
    const [timestamp, h1] = signature
      .split(";")
      .map((part) => part.split("=")[1]);
    const signedPayload = `${timestamp}:${requestBody}`;
    const expectedSignature = crypto
      .createHmac("sha256", PADDLE_WEBHOOK_SECRET)
      .update(signedPayload)
      .digest("hex");

    if (h1 !== expectedSignature) {
      console.error("Invalid Paddle webhook signature");
      return new NextResponse("Invalid signature", { status: 401 });
    }

    // 2. تحليل البيانات
    const event = JSON.parse(requestBody);
    console.log("Received Paddle event:", event.event_type);

    // 3. التصرف بناءً على الحدث
    if (event.event_type === "transaction.completed") {
      const transaction = event.data;

      const userId = transaction.custom_data?.user_id;
      const projectName = transaction.custom_data?.project_name;
      const planId = transaction.custom_data?.plan_id; // <-- [تعديل حاسم]
      const periodStartsAt = transaction.billing_period?.starts_at;
      const periodEndsAt = transaction.billing_period?.ends_at;

      if (
        !userId ||
        !projectName ||
        !planId ||
        !periodStartsAt ||
        !periodEndsAt
      ) {
        console.error("Webhook missing critical data:", {
          userId,
          projectName,
          planId,
          periodStartsAt,
          periodEndsAt,
        });
        return new NextResponse("Webhook missing critical data", {
          status: 400,
        });
      }

      // 4. تنفيذ منطق العمل باستخدام عميل Supabase Admin

      // أ. إنشاء المشروع
      const { data: newProject, error: projectError } = await supabaseAdmin
        .from("projects")
        .insert({
          user_id: userId,
          project_name: projectName,
          bot_name: "المساعد الذكي",
          api_key: `sk_${crypto.randomBytes(24).toString("hex")}`,
        })
        .select()
        .single();

      if (projectError) {
        console.error("Error creating project from webhook:", projectError);
        return new NextResponse(
          `Error creating project: ${projectError.message}`,
          { status: 500 }
        );
      }

      // ب. إنشاء الاشتراك
      const { error: subscriptionError } = await supabaseAdmin
        .from("subscriptions")
        .insert({
          project_id: newProject.id,
          plan_id: planId,
          status: "active",
          paddle_subscription_id: transaction.subscription_id,
          paddle_customer_id: transaction.customer_id,
          current_period_start: periodStartsAt, // <-- إضافة تاريخ البدء
          current_period_end: periodEndsAt,
        });

      if (subscriptionError) {
        console.error(
          "Error creating subscription from webhook:",
          subscriptionError
        );
        return new NextResponse(
          `Error creating subscription: ${subscriptionError.message}`,
          { status: 500 }
        );
      }

      console.log(
        `Successfully created project ${newProject.id} with plan ${planId} for user ${userId}`
      );
    }

    // 5. إرسال استجابة ناجحة
    return new NextResponse("Webhook received", { status: 200 });
  } catch (error: any) {
    console.error("Error in Paddle webhook handler:", error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
