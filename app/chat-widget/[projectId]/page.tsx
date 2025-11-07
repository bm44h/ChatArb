'use client';

import { use } from 'react';
import ChatWidget from '@/app/components/chat/ChatWidget';

export default function ChatWidgetPage({ 
  params 
}: { 
  params: Promise<{ projectId: string }> 
}) {
  // استخدم React.use() لفك Promise في client component
  const { projectId } = use(params);

  if (!projectId) {
    return <div>Project ID is missing.</div>;
  }

  return (
    <div style={{ background: 'transparent', width: '100%', height: '100%' }}>
      <ChatWidget projectId={projectId} />
    </div>
  );
}