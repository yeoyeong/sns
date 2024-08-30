import supabase from '@/_shared/util/supabase/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('post_id');

    if (!postId) {
      return NextResponse.json(
        { error: '게시물 ID는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    const userId = user.id;

    // 좋아요 여부 확인
    const { data: existingLike, error: fetchError } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error(fetchError.message);
    }

    if (existingLike) {
      return NextResponse.json({ liked: true }, { status: 200 });
    }

    return NextResponse.json({ liked: false }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: '예기치 않은 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}