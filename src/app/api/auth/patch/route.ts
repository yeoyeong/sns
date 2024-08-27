import supabase from '@/_shared/util/supabase/client';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    // Authorization 헤더에서 Bearer 토큰 가져오기
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token is required' },
        { status: 401 }
      );
    }

    // Supabase를 통해 토큰 검증 및 사용자 정보 가져오기
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // 요청에서 업데이트할 정보 가져오기
    const { nickname, profileImg } = await request.json();

    if (!nickname && !profileImg) {
      return NextResponse.json(
        { error: 'At least one of nickname or profileImg is required' },
        { status: 400 }
      );
    }

    // 업데이트할 데이터 준비
    const updates: { [key: string]: string | undefined } = {};
    if (nickname) updates.nickname = nickname;
    if (profileImg) updates.profileImg = profileImg;

    // 사용자 정보 업데이트
    const { error: updateError } = await supabase
      .from('users')
      .update(updates)
      .eq('uid', user.user.id); // 인증된 사용자 ID로 필터링

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'User information updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}