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
    const userId = searchParams.get('user_id');
    const type = searchParams.get('type');

    if (!userId || !type) {
      return NextResponse.json(
        { error: '사용자 ID와 타입은 필수 항목입니다.' },
        { status: 400 }
      );
    }

    let result;

    if (type === 'following') {
      // 팔로잉 목록 조회
      const { data: followingList, error: followingError } = await supabase
        .from('followers')
        .select('following_id')
        .eq('follower_id', userId);

      if (followingError) {
        throw new Error(followingError.message);
      }

      result = followingList.map(follow => follow.following_id);
    } else if (type === 'follower') {
      // 팔로워 목록 조회
      const { data: followerList, error: followerError } = await supabase
        .from('followers')
        .select('follower_id')
        .eq('following_id', userId);

      if (followerError) {
        throw new Error(followerError.message);
      }

      result = followerList.map(follow => follow.follower_id);
    } else {
      return NextResponse.json(
        { error: '타입은 following 또는 follower 중 하나여야 합니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ result }, { status: 200 });
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