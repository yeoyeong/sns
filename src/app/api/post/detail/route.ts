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

    // 게시물 조회
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select(
        `
       *,
       users!posts_user_id_fkey (
         userId,
         nickname,
         profileImg
       )
     `
      )
      .eq('id', postId)
      .single();

    if (postError) {
      return NextResponse.json(
        { error: '게시물을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 댓글 수 가져오기
    const { count: commentsCount, error: commentsError } = await supabase
      .from('comments')
      .select('id', { count: 'exact' })
      .eq('post_id', postId);

    if (commentsError) {
      return NextResponse.json(
        { error: commentsError.message },
        { status: 500 }
      );
    }

    // 좋아요 수 가져오기
    const { count: likesCount, error: likesError } = await supabase
      .from('likes')
      .select('id', { count: 'exact' })
      .eq('post_id', postId);

    if (likesError) {
      return NextResponse.json({ error: likesError.message }, { status: 500 });
    }

    // 결과 반환
    const postWithCounts = {
      ...post,
      commentsCount: commentsCount ?? 0, // 댓글 수
      likesCount: likesCount ?? 0, // 좋아요 수
    };

    return NextResponse.json({ post: postWithCounts }, { status: 200 });
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