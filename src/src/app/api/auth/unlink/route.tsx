import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';  // 쿠키 불러오기 유틸

export async function POST(req: Request) {
  const cookieStore = await cookies();  // await 추가
  const kakaoUser = cookieStore.get('kakaoUser');  // 쿠키에서 kakaoUser 가져오기
  const parsedUser = kakaoUser ? JSON.parse(kakaoUser.value) : null;

  if (!parsedUser) {
    return NextResponse.json({ error: 'User not logged in' }, { status: 401 });
  }

  const userId = parsedUser.id;

  try {
    // 카카오 연결 끊기 (로그아웃)
    await axios.post(
      `https://kapi.kakao.com/v1/user/unlink`,
      null,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          target_id_type: 'user_id',
          target_id: userId,
        },
      }
    );

    const response = NextResponse.redirect('/login');
    response.cookies.delete('kakaoUser');  // 쿠키 삭제
    return response;
  } catch (error) {
    console.error('카카오 로그아웃 실패:', error);
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
