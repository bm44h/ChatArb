// app/api/widget.js/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  
  const scriptContent = `
    (function() {
      const projectId = document.currentScript.getAttribute('data-project-id');
      if (!projectId) {
        console.error("Manus Chat: data-project-id is missing.");
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.id = 'manus-chat-iframe';
      iframe.src = '${process.env.NEXT_PUBLIC_APP_URL}/chat-widget/' + projectId;
      iframe.style.position = 'fixed';
      iframe.style.bottom = '20px';
      iframe.style.right = '20px';
      iframe.style.border = 'none';
      iframe.style.zIndex = '2147483647'; // أعلى z-index ممكن
      iframe.style.transition = 'width 0.2s ease-out, height 0.2s ease-out';
      iframe.style.backgroundColor = 'transparent';
      iframe.allow = "fullscreen"; // للسماح بالوضع الكامل إذا احتجت إليه
      
      document.body.appendChild(iframe);

      // المستمع الذي يغير حجم الـ iframe بناءً على الرسائل من الداخل
      window.addEventListener('message', function(event) {
        // يمكنك إضافة تحقق من المصدر هنا للأمان في بيئة الإنتاج
        // if (event.origin !== '${process.env.NEXT_PUBLIC_APP_URL}') return;

        if (event.data && event.data.type === 'resize-manus-chat') {
          iframe.style.width = event.data.payload.width;
          iframe.style.height = event.data.payload.height;
        }
      });
    })();
  `;

  return new NextResponse(scriptContent, {
    headers: {
      'Content-Type': 'application/javascript',
      // [مهم] تعطيل الكاش أثناء التطوير لرؤية التغييرات فورًا
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
