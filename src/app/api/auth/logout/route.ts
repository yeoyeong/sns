import { NextResponse } from 'next/server';
import supabase from '@/_shared/util/supabase/client';

export async function POST(req: Request) {
  try {
    const hostname = req.headers.get('host');

    const response = NextResponse.json({ success: true });

    response.cookies.set('supabase-token', '', {
      path: '/',
      domain: hostname ? hostname.split(':')[0] : undefined,
      expires: new Date(0),
      httpOnly: true,
    });
    response.cookies.set('supabase-refresh-token', '', {
      path: '/',
      domain: hostname ? hostname.split(':')[0] : undefined,
      expires: new Date(0),
      httpOnly: true,
    });

    // Supabase에서 로그아웃 처리
    const { error } = await supabase.auth.signOut();
    if (error) {
      // 에러 발생 시 500 상태 코드와 함께 응답 반환
      return NextResponse.json(
        { success: false, error: '로그아웃 실패' },
        { status: 500 }
      );
    }

    return response;
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Unexpected error occurred' },
      { status: 500 }
    );
  }
}