import supabase from '@/_shared/util/supabase/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
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

    // DELETE 요청에서 댓글 ID 추출
    const { comment_id } = await request.json();

    if (!comment_id) {
      return NextResponse.json(
        { error: 'comment_id is required' },
        { status: 400 }
      );
    }

    // 댓글 삭제 작업 수행
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', comment_id)
      .eq('user_id', userData[0].uid);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: 'Comment deleted successfully' },
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