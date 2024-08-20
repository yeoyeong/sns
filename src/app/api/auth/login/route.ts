import { NextResponse } from 'next/server';
import supabase from '@/_shared/util/supabase/client';

export async function POST(req: Request) {
  try {
    const { email, password }: { email: string; password: string } =
      await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const EXPIRES_IN = 36000; // 만료시간

    // JWT 토큰을 HttpOnly 쿠키로 설정
    const response = NextResponse.json(data);

    response.cookies.set('supabase-token', data.session?.access_token ?? '', {
      httpOnly: true,
      // process.env.NODE_ENV = 어플이 실행되고 있는 환경을 나타냄
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // 'Strict'를 'strict'로 수정
      path: '/',
      maxAge: data.session?.expires_in ?? EXPIRES_IN, // 만료 시간 설정
    });

    // 리프레시 토큰을 HttpOnly 쿠키로 설정
    response.cookies.set(
      'supabase-refresh-token',
      data.session?.refresh_token ?? '',
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 예시로 30일 동안 유효하게 설정
      }
    );

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}