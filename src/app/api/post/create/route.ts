// import supabase from '@/_shared/util/supabase/client';
import { createClient } from '@/_shared/util/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  
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
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // 사용자 인증이 완료된 상태에서 요청 처리
    const { formData } = await request.json();
    const { content, weather, picture } = formData;

    // user.user.id 대신 user.id 사용
    if (!user.id || !content) {
      return NextResponse.json(
        { error: 'User ID and content are required' },
        { status: 400 }
      );
    }

    const { data, error: insertError } = await supabase
      .from('posts')
      .insert([{ user_id: user.id, content, weather, picture }]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    return NextResponse.json(
      { message: 'Post created successfully', data },
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