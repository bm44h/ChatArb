'use client';

import ChatWidget from '@/app/components/chat/ChatWidget';

export default function ChatWidgetPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params;

  if (!projectId) {
    return <div>Project ID is missing.</div>;
  }

  return (
    <div style={{ background: 'transparent', width: '100%', height: '100%' }}>
      <ChatWidget projectId={projectId} />
    </div>
  );
}
