import supabase from '@/_shared/util/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { followerId, followingId } = await request.json();

    if (!followerId || !followingId) {
      return NextResponse.json(
        { error: 'Follower ID and Following ID are required' },
        { status: 400 }
      );
    }

    // 중복 여부 확인
    const { data: existingData, error: fetchError } = await supabase
      .from('followers')
      .select('*')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error(fetchError.message);
    }

    if (existingData) {
      // 중복된 레코드 삭제 (언팔로우 처리)
      const { error: deleteError } = await supabase
        .from('followers')
        .delete()
        .eq('follower_id', followerId)
        .eq('following_id', followingId);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      return NextResponse.json(
        { message: 'Unfollowed successfully' },
        { status: 200 }
      );
    }

    // 새로운 팔로우 관계 추가
    const { data, error } = await supabase
      .from('followers')
      .insert([{ follower_id: followerId, following_id: followingId }]);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { message: 'Followed successfully', data },
      { status: 201 }
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