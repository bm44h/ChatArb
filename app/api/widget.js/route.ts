// src/app/api/widget.js/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  
  const scriptContent = `
    (function() {
      // استخراج projectId من السكربت نفسه
      const scriptTag = document.currentScript;
      const projectId = scriptTag.getAttribute('data-project-id');

      if (!projectId) {
        console.error("Chat Widget: data-project-id is missing.");
        return;
      }

      // 1. إنشاء حاوية للـ Widget
      const widgetContainer = document.createElement('div');
      widgetContainer.id = 'manus-chat-widget-container';
      document.body.appendChild(widgetContainer);

      // 2. إنشاء iframe لعزل الـ Widget
      const iframe = document.createElement('iframe');
      iframe.id = 'manus-chat-iframe';
      iframe.src = '${process.env.NEXT_PUBLIC_APP_URL}/chat-widget/' + projectId;
      iframe.style.position = 'fixed';
      iframe.style.bottom = '20px';
      iframe.style.right = '20px';
      iframe.style.width = '400px'; // عرض مبدئي
      iframe.style.height = '500px'; // ارتفاع مبدئي
      iframe.style.border = 'none';
      iframe.style.zIndex = '999999';
      iframe.style.display = 'block'; // تأكد من أنه مرئي

      widgetContainer.appendChild(iframe);

      console.log('Manus Chat Widget loaded for project:', projectId);
    })();
  `;

  return new NextResponse(scriptContent, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=31536000, immutable', // تخزين مؤقت قوي
    },
  });
}
