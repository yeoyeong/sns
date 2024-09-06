// pages/api/sendMessage.ts
import { NextResponse } from 'next/server';
import supabase from '@/_shared/util/supabase/client';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  // 쿠키에서 JWT 토큰 가져오기
  const token = cookies().get('supabase-token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication token not found' },
      { status: 401 }
    );
  }

  // Supabase에서 토큰 검증
  const { data, error:userError } = await supabase.auth.getUser(token);

  if (userError || !data) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  const { content, imageUrl, userUId, roomId } = await req.json();

  if (!content || !userUId || !roomId) {
    return NextResponse.json({ message: 'Content, userId, and roomId are required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('messages')
    .insert([{ content, image_url: imageUrl, user_uid:userUId, room_id:roomId }]);

  if (error) {
    return NextResponse.json({ message: 'Failed to send message', error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Message sent successfully' });
}
