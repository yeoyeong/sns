// pages/api/getMessages.ts
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

    if (!roomId) {
        return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
    }

    const loggedInUserId = user.id; // 로그인 유저

    // 해당 roomId의 참가자 명단을 가져와서 로그인한 유저가 포함되어 있는지 확인

    const { data: roomData, error: roomError } = await supabase
    .from('rooms')
    .select('participants')
    .eq('id', roomId)
    .single(); // 단일 row 가져오기

    if (roomError || !roomData) {
        return NextResponse.json({ message: 'Room not found', error: roomError?.message }, { status: 404 });
    }

    // 참가자 명단에서 로그인한 유저 확인
    const participants = roomData.participants as string[];
    if (!participants.includes(loggedInUserId)) {
        return NextResponse.json({ message: 'You are not a participant of this room' }, { status: 403 });
    }

    // 로그인한 유저가 참가자일 경우 메시지 불러오기
    const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select(`
            *,
            users:user_uid (nickname, profileImg, userId)
          `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

    if (messagesError) {
        return NextResponse.json({ message: 'Failed to fetch messages', error: messagesError.message }, { status: 500 });
    }

    return NextResponse.json(messages);
}
