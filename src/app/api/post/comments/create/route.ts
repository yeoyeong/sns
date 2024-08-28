import supabase from '@/_shared/util/supabase/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
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

    const { post_id, content, parent_id } = await request.json();

    // 필수 데이터 체크
    if (!post_id || !content) {
      return NextResponse.json(
        { error: 'post_id and content required' },
        { status: 400 }
      );
    }

    // 댓글 또는 대댓글 삽입
    const { data, error } = await supabase.from('comments').insert([
      {
        post_id,
        content,
        parent_id,
        nickname: userData[0].nickname,
        user_id: userData[0].user_id,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
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