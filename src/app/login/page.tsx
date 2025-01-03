"use client";

import React, { useEffect, useState } from "react";
import KakaoLoginButton from "@/components/KakaoLoginButton";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // 기존 사용자 정보가 없을 경우 Authorization Code 처리
    if (!storedUser) {
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        setAuthCode(code);
        handleKakaoLogin(code);
      }
    } else {
      // 사용자 정보가 있으면 바로 메인으로 리디렉트
      router.push("/");
    }
  }, []);

  const handleKakaoLogin = async (code: string) => {
    try {
      const response = await fetch("/api/auth/kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">로그인</h1>
      <KakaoLoginButton />
    </div>
  );
}
