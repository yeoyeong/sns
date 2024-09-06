// app/api/messages/unread/route.ts

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
    const { data:{user}, error:userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
        return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
        );
    }

  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('roomId');
  
  // roomId가 있을 경우 해당 방의 읽지 않은 메시지만 조회
  if (roomId) {
    let query = supabase
        .from('messages')
        .select('id')
        .eq('is_read', false)
        .eq('room_id', roomId)
        .neq('user_uid', user.id);  // 본인이 보낸 메시지는 제외
    const { data, error } = await query;
    if (error) {
        return NextResponse.json({ error: 'Failed to fetch unread messages' }, { status: 500 });
      }
      return NextResponse.json({ unreadCount: data.length });
  } 

    // 룸이 없을 경우
    // Step 1: 사용자가 속한 방 목록(room_id)을 가져옴
    let roomQuery = supabase
        .from('rooms')
        .select('id')
        .contains('participants', [user.id]); // participants 배열에 사용자가 포함된 방을 조회

    const { data: roomData, error: roomError } = await roomQuery;

    if (roomError) {
        return NextResponse.json({ error: roomError }, { status: 500 });
    }

    const roomIds = roomData.map((room: { id: string }) => room.id);
    if (roomIds.length === 0) {
        return NextResponse.json({ unreadCount: 0 });
    }

    
    // Step 2: 읽지 않은 메시지를 해당 방(roomIds)에서 조회
    let query = supabase
        .from('messages')
        .select('id')
        .eq('is_read', false)
        .in('room_id', roomIds) // 사용자가 속한 모든 방의 메시지를 조회
        .neq('user_uid', user.id); // 본인이 보낸 메시지는 제외

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: 'Failed to fetch unread messages' }, { status: 500 });
    }

  return NextResponse.json({ unreadCount: data.length });
}
