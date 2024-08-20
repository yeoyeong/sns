// app/api/user/stats/route.ts
import supabase from '@/_shared/util/supabase/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return NextResponse.json({ error: 'UID is required' }, { status: 400 });
  }

  // 팔로워 수 계산
  const { count: followerCount, error: followerError } = await supabase
    .from('followers')
    .select('id', { count: 'exact' })
    .eq('following_id', uid);

  if (followerError) {
    return NextResponse.json({ error: followerError.message }, { status: 500 });
  }

  // 팔로잉 수 계산
  const { count: followingCount, error: followingError } = await supabase
    .from('followers')
    .select('id', { count: 'exact' })
    .eq('follower_id', uid);

  if (followingError) {
    return NextResponse.json({ error: followingError.message }, { status: 500 });
  }

  // 게시글 수 계산
  const { count: postCount, error: postError } = await supabase
    .from('posts')
    .select('id', { count: 'exact' })
    .eq('user_id', uid);

  if (postError) {
    return NextResponse.json({ error: postError.message }, { status: 500 });
  }

  return NextResponse.json({
    followerCount,
    followingCount,
    postCount,
  }, { status: 200 });
}
