// pages/api/rooms.ts
import { NextResponse } from 'next/server';
import supabase from '@/_shared/util/supabase/client';
import { cookies } from 'next/headers';

export async function GET() {
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


  // 해당 roomId의 참가자 명단을 가져옴
  const { data: roomsData, error: roomError } = await supabase
    .from('rooms')
    .select('id, participants, room_name')
    .contains('participants', [user.id]); // 'participants' 배열에 'uid'가 포함된 방을 찾음

  if (roomError || !roomsData) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  // 방 데이터와 각 방의 최근 메시지를 가져오기 위한 map 함수
  const roomsWithLastMessage = await Promise.all(
    roomsData.map(async (room) => {
      // 각 방의 가장 최근 메시지 한 개 가져오기
      const { data: lastMessage, error: messageError } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', room.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (messageError) {
        console.error(`Error fetching last message for room ${room.id}:`, messageError);
        return {
          roomId: room.id,
          roomName:room.room_name,
          participants: room.participants,
          lastMessage: null,
        };
      }

      // 각 방과 해당 방의 최근 메시지 반환
      return {
        roomId: room.id,
        roomName:room.room_name,
        participants: room.participants,
        lastMessage: lastMessage || null, // 메시지가 없을 수도 있음
      };
    })
  );

  // 사용자가 참가자 명단에 포함되어 있을 경우만 데이터를 반환
  return NextResponse.json([ ...roomsWithLastMessage ]);
}