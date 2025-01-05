import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();
  const REST_API_KEY = "e1bc3c4db3a86b3b347d08cef1f2a65c";  // 정확한 REST API 키
  const REDIRECT_URI = "http://localhost:3000/login";

  try {
    console.log("전달된 Authorization Code:", code);  // 전달된 코드 확인
    console.log("REST API KEY:", REST_API_KEY);
    console.log("Redirect URI:", REDIRECT_URI);

    // 액세스 토큰 요청
    const tokenResponse = await fetch(
      "https://kauth.kakao.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: code,  // 인증 코드 전달
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    console.log("토큰 데이터 응답:", tokenData);  // 토큰 응답 확인

    if (tokenData.error) {
      console.error("토큰 발급 실패:", tokenData.error_description);
      return NextResponse.json({ success: false, error: tokenData.error_description });
    }

    // 사용자 정보 요청
    const userInfoResponse = await fetch(
      "https://kapi.kakao.com/v2/user/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const userInfo = await userInfoResponse.json();
    console.log("사용자 정보:", userInfo);  // 사용자 정보 확인

    return NextResponse.json({
      success: true,
      user: userInfo,
    });
  } catch (error) {
    console.error("API 요청 실패:", error);
    return NextResponse.json({ success: false, error: "서버 오류 발생" });
  }
}
