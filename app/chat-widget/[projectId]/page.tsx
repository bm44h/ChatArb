'use client';

import { use } from 'react';
import ChatWidget from '@/app/components/chat/ChatWidget';

export default function ChatWidgetPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);

  if (!projectId) {
    return <div>Project ID is missing.</div>;
  }

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: transparent !important;
          
        }
      `}</style>

      <div style={{ background: 'transparent', width: '100%', height: '100%' }}>
        <ChatWidget projectId={projectId} />
      </div>
    </>
  );
}
