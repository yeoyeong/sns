import supabase from '@/_shared/util/supabase/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('supabase-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token is required' },
        { status: 401 }
      );
    }

    // Supabase를 통해 토큰 검증 및 사용자 정보 가져오기
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // 요청에서 업데이트할 사용자 정보 가져오기
    const { profileImg, oneLiner, nickname } = await request.json();

    // 필수 필드 검증
    if (!nickname) {
      return NextResponse.json(
        { error: '닉네임은 필수 요소입니다' },
        { status: 400 }
      );
    }

    // 사용자 정보 업데이트
    const { error: updateError } = await supabase
      .from('users')
      .update({ profileImg, oneLiner, nickname })
      .eq('uid', user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 2. 업데이트된 사용자 정보 가져오기
    const { data: userData, error: userErrorData } = await supabase
      .from('users')
      .select('*') // 모든 컬럼을 선택
      .eq('uid', user.id); // 사용자의 ID를 기준으로 필터링

    if (userErrorData || !userData || userData.length === 0) {
      return NextResponse.json(
        { error: 'Failed to fetch updated user data' },
        { status: 500 }
      );
    }

    // 업데이트된 사용자 데이터를 반환
    const userDetails = {
      uid: userData[0].uid,
      userId: userData[0].userId,
      nickname: userData[0].nickname,
      profileImg: userData[0].profileImg,
      oneLiner: userData[0].oneLiner,
    };

    return NextResponse.json(
      { message: 'User profile updated successfully', data: userDetails },
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