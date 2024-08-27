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

    // 요청에서 업데이트할 게시물 정보 가져오기
    const { postId, content, weather, picture } = await request.json();

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // 게시물이 현재 로그인한 사용자의 것인지 확인
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', postId)
      .single();

    if (fetchError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (post.user_id !== user.user.id) {
      return NextResponse.json(
        { error: 'You can only update your own posts' },
        { status: 403 }
      );
    }

    // 게시물 업데이트
    const { data, error: updateError } = await supabase
      .from('posts')
      .update({ content, weather, picture })
      .eq('id', postId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Post updated successfully', data },
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