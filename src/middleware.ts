// middleware.ts

import supabase from '@/supabaseClient';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // 경로가 /(afterLogin)으로 시작하면 인증이 필요합니다.
  if (req.nextUrl.pathname.startsWith('/(afterLogin)')) {
    const { data: { session } } = await supabase.auth.getSession();
    // 세션이 없으면 로그인 페이지로 리다이렉트
    if (!session) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 나머지 경로는 접근 가능 (beforeLogin 경로 포함)
  return res;
}

// 미들웨어가 적용될 경로를 설정
export const config = {
  matcher: ['/(afterLogin)/:path*'], // (afterLogin) 그룹에 대해 미들웨어를 적용합니다.
};
