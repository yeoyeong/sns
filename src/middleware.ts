import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabase from '@/_shared/util/supabase/client';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('supabase-token')?.value;
  const refreshToken = req.cookies.get('supabase-refresh-token')?.value;

  const { pathname } = req.nextUrl;

  // 예외 처리할 경로들
  const excludedPaths = ['/login', '/signup', '/api/auth'];

  // 로그인된 상태에서 /login 또는 /signup 접근 시 메인 페이지로 리다이렉트
  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url)); // 메인 페이지로 리다이렉트
  }

  // 예외 처리 경로에 대한 접근은 리다이렉트 하지 않음
  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  let user;

  // 액세스 토큰이 존재하는 경우
  if (token) {
    const {
      data: { user: supabaseUser },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Error fetching user:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
    user = supabaseUser;
  }

  // 액세스 토큰이 없거나 유효하지 않은 경우, 리프레시 토큰을 사용해 새로운 액세스 토큰 발급 시도
  if (!user && refreshToken) {
    const { data, error: refreshError } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    // 리프레시 토큰 사용 실패 시, 콘솔에 에러를 로그로 남기고 로그인 페이지로 리다이렉트
    if (refreshError) {
      console.error('Error refreshing session:', refreshError);
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // 새로운 액세스 토큰을 쿠키에 다시 설정
    user = data.user;

    const newToken = data.session?.access_token ?? '';
    const response = NextResponse.next();
    response.cookies.set('supabase-token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 3600,
    });

    return response;
  }

  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

// if (!token && !refreshToken) {
//   return NextResponse.redirect(new URL('/login', req.url));
// }

// const {
//   data: { user },
//   error,
// } = await supabase.auth.getUser(token);

// if (error || !user) {
//   return NextResponse.redirect(new URL('/login', req.url));
// }

// return NextResponse.next();