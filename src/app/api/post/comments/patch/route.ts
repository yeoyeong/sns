import supabase from '@/_shared/util/supabase/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('supabase-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    // Supabase를 통해 토큰 검증 및 사용자 정보 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: '유효하지 않거나 만료된 토큰입니다.' },
        { status: 401 }
      );
    }

    // 사용자 인증 성공 후 데이터 가져오기 (예: 프로필 데이터)
    const { data: userData, error: userDataError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', user.id);

    if (userDataError) {
      return NextResponse.json(
        { error: userDataError.message },
        { status: 500 }
      );
    }

    const { comment_id, content } = await request.json();

    // 필수 데이터 체크
    if (!comment_id || !content) {
      return NextResponse.json(
        { error: 'comment_id와 content는 필수입니다.' },
        { status: 400 }
      );
    }

    // 댓글 업데이트
    const { data, error } = await supabase
      .from('comments')
      .update({
        content,
        updated_at: new Date().toISOString(), // 업데이트 타임스탬프 추가
      })
      .eq('id', comment_id)
      .eq('user_id', userData[0].uid); // 현재 사용자 확인

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: '예기치 못한 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}