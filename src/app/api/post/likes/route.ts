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

    const { post_id } = await request.json();

    if (!post_id || !user.id) {
      return NextResponse.json(
        { error: '게시물 ID와 사용자 ID는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    // 중복 여부 확인
    const { data: existingLike, error: fetchError } = await supabase
      .from('likes') // "likes" 테이블을 사용하여 좋아요 관리
      .select('*')
      .eq('post_id', post_id)
      .eq('user_id', user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error(fetchError.message);
    }

    if (existingLike) {
      // 이미 좋아요를 눌렀다면, 이를 취소 (좋아요 삭제)
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('post_id', post_id)
        .eq('user_id', user.id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      return NextResponse.json(
        { message: '좋아요가 취소되었습니다.', state: false },
        { status: 200 }
      );
    }

    // 새로운 좋아요 추가
    const { error } = await supabase
      .from('likes')
      .insert([{ post_id, user_id: user.id }]);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { message: '좋아요가 성공적으로 추가되었습니다.', state: true },
      { status: 201 }
    );
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