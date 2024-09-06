// app/api/messages/read/route.ts
import { NextResponse } from 'next/server';
import supabase from '@/_shared/util/supabase/client';

export async function POST(req: Request) {
  try {
    const { messageId } = await req.json();

    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    // 메시지를 읽음 상태로 업데이트
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', messageId);

    if (error) {
      return NextResponse.json({ error: 'Failed to update message status' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message marked as read' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
