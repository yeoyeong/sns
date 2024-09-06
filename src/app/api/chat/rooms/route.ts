// pages/api/rooms.ts
import { NextResponse } from 'next/server';
import supabase from '@/_shared/util/supabase/client';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  // 쿠키에서 JWT 토큰 가져오기
  const token = cookies().get('supabase-token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication token not found' },
      { status: 401 }
    );
  }

  // Supabase에서 토큰 검증
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
  }

  // 해당 roomId의 참가자 명단을 가져옴
  const { data: roomData, error: roomError } = await supabase
    .from('rooms')
    .select('id, participants')
    .eq('id', roomId)
    .single();

  if (roomError || !roomData) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  // 참가자 명단에서 현재 사용자가 포함되어 있는지 확인
  const participants = roomData.participants as string[];
  if (!participants.includes(user.id)) {
    return NextResponse.json({ error: 'You are not a participant of this room' }, { status: 403 });
  }

  // 사용자가 참가자 명단에 포함되어 있을 경우만 데이터를 반환
  return NextResponse.json({ exists: true });
}

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
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  const { roomId, participants } = await req.json();

    if (!participants.includes(user.id)) {
    return NextResponse.json({ message: 'User must be included in participants' }, { status: 400 });
  }

  const { error } = await supabase
    .from('rooms')
    .insert([{ id: roomId, participants }]);

  if (error) {
    return NextResponse.json({ message: 'Failed to create room', error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Room created successfully' });
}
