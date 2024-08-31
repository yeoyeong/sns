import supabase from '@/_shared/util/supabase/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface User {
  uid: string;
  nickname: string;
  profileImg: string;
}

interface ListItem {
  following_id?: string;
  follower_id?: string;
  users: User | User[]; // 배열이 아닌 단일 객체로 정의
}

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
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // 쿼리 파라미터에서 사용자 ID, 페이지 번호, 페이지 크기 추출
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    const type = url.searchParams.get('type'); // 'following' or 'follower'
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit; // offset = 시작 위치

    if (!userId || !type) {
      return NextResponse.json(
        { error: 'user_id and type are required.' },
        { status: 400 }
      );
    }

    let query;
    if (type === 'following') {
      query = supabase
        .from('followers')
        .select(
          `
          following_id,
          users:following_id(uid, nickname, profileImg)
        `
        )
        .eq('follower_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
    }

    if (type === 'follower') {
      query = supabase
        .from('followers')
        .select(
          `
          follower_id,
          users:follower_id(uid, nickname, profileImg)
        `
        )
        .eq('following_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
    }

    if (!query) {
      return NextResponse.json(
        { error: 'Invalid type. Must be either "following" or "follower".' },
        { status: 400 }
      );
    }

    const { data: list, error: listError } = await query;

    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    if (!list || list.length === 0) {
      return NextResponse.json({ error: 'No data found.' }, { status: 404 });
    }

    // 타입 가드 함수로 users가 배열인지 확인
    const isUserArray = (users: User | User[]): users is User[] => {
      return Array.isArray(users);
    };

    const result = list
      .map((item: ListItem) => {
        if (isUserArray(item.users)) {
          // 만약 users가 배열이라면, 오류를 발생
          throw new Error('관리자에게 문의해주세요');
        }

        // users가 배열이 아닌 객체일 때만 처리
        return {
          userId: item.users.uid,
          nickname: item.users.nickname,
          profileImg: item.users.profileImg,
        };
      })
      .filter(userData => Object.keys(userData).length > 0); // 빈 객체를 필터링

    // 총 데이터 수를 가져와서 클라이언트에 전달 (마지막 페이지인지 판단하기 위해)
    const totalCountQuery =
      type === 'following'
        ? supabase
            .from('followers')
            .select('following_id', { count: 'exact' })
            .eq('follower_id', userId)
        : supabase
            .from('followers')
            .select('follower_id', { count: 'exact' })
            .eq('following_id', userId);

    const { count: totalCount, error: countError } = await totalCountQuery;

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    const totalItems = totalCount || 0;
    const hasMore = offset + limit < totalItems;

    return NextResponse.json(
      {
        data: result,
        page,
        limit,
        hasMore, // 추가 데이터가 있는지 여부
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred.',
      },
      { status: 500 }
    );
  }
}