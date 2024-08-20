import { NextResponse } from 'next/server';
import supabase from '@/_shared/util/supabase/client';
import { SignupFormData } from '@/_features/i/lib/types/user';

export async function POST(req: Request) {
  try {
    const formData: SignupFormData = await req.json();

    const { email, password, userId, nickname, profileImg } = formData;

    // 이메일과 비밀번호로 사용자 생성
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      console.error('Error signing up:', signUpError.message);
      return NextResponse.json(
        { success: false, error: signUpError.message },
        { status: 400 }
      );
    }

    const { user, session } = signUpData;

    if (!user || !session) {
      console.error('No user or session returned after sign up');
      return NextResponse.json(
        { success: false, error: 'User creation or session failed' },
        { status: 500 }
      );
    }

    // 별도의 테이블에 추가 사용자 정보 저장
    const { error: dbError } = await supabase.from('users').insert([
      {
        uid: user.id, // 인증된 사용자의 ID 사용
        userId,
        nickname,
        profileImg,
        // 기타 정보 추가
      },
    ]);

    if (dbError) {
      console.error('Error inserting user data:', dbError.message);
      return NextResponse.json(
        { success: false, error: dbError.message },
        { status: 500 }
      );
    }

    // JWT 토큰을 HttpOnly 쿠키로 설정
    const EXPIRES_IN = 36000;
    const response = NextResponse.json({
      success: true,
      user,
    });
    response.cookies.set('supabase-token', session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: session.expires_in ?? EXPIRES_IN,
    });

    // 리프레시 토큰을 HttpOnly 쿠키로 설정
    response.cookies.set(
      'supabase-refresh-token',
      session?.refresh_token ?? '',
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 예시로 30일 동안 유효하게 설정
      }
    );

    return response;
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Unexpected error occurred' },
      { status: 500 }
    );
  }
}