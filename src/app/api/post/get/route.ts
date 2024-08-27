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
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // 쿼리 파라미터에서 페이지 번호와 페이지 크기 추출
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit; // offset = 시작 위치

    // 데이터 조회 (페이지네이션 적용)
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .range(offset, offset + limit - 1);

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // 총 데이터 수를 가져와서 클라이언트에 전달 (마지막 페이지인지 판단하기 위해)
    const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' });

    const totalCount = count ?? 0; // count가 null이면 0으로 대체
    const hasMore = offset + limit < totalCount;

    return NextResponse.json(
      {
        data,
        page,
        limit,
        hasMore, // 추가 데이터가 있는지 여부
      },
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