import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 로그인 상태 확인 미들웨어
export function middleware(req: NextRequest) {
  const kakaoUser = req.cookies.get('kakaoUser');

  // 로그인 안 된 경우 /login으로 리디렉트
  if (!kakaoUser && req.nextUrl.pathname !== '/login') {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 미들웨어가 동작할 경로 설정
export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
