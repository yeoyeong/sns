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
    const followingId = searchParams.get('following_id');

    if (!followingId) {
      console.log(followingId, '팔로잉아이디');
      return NextResponse.json(
        { error: 'ID는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    const userId = user.id;

    if (followingId) {
      // 팔로우 여부 확인
      const { data: existingFollow, error: followError } = await supabase
        .from('followers')
        .select('*')
        .eq('follower_id', userId)
        .eq('following_id', followingId)
        .single();

      if (followError && followError.code !== 'PGRST116') {
        throw new Error(followError.message);
      }

      if (existingFollow) {
        return NextResponse.json({ following: true }, { status: 200 });
      }

      return NextResponse.json({ following: false }, { status: 200 });
    }
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