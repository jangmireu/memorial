import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
  }

  try {
    // 액세스 토큰 요청
    const tokenResponse = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // 사용자 정보 요청
    const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfo = userInfoResponse.data;

    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.set('kakaoUser', JSON.stringify(userInfo), {
      path: '/',
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error('카카오 로그인 실패:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
