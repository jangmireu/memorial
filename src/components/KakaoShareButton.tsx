"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoShareButton() {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      // 카카오 SDK 초기화
      if (!window.Kakao.isInitialized()) {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (kakaoKey) {
          window.Kakao.init(kakaoKey);
        } else {
          console.error("카카오 JavaScript 키가 설정되지 않았습니다.");
        }
      }
    } else {
      console.error("Kakao SDK가 로드되지 않았습니다.");
    }
  }, []);

  const shareToKakao = () => {
    if (!window.Kakao) {
      alert("공유 기능이 지원되지 않습니다.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "추모 페이지",
        description: "추모 페이지에 함께하세요.",
        imageUrl: "https://your-website.com/images/flower.png",  // 실제 이미지 URL로 교체
        link: {
          mobileWebUrl: pageUrl,
          webUrl: pageUrl,
        },
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: pageUrl,
            webUrl: pageUrl,
          },
        },
      ],
    })
    .then(() => {
      alert("카카오톡 공유 완료!");
    })
    .catch((err: any) => {
      console.error("카카오 공유 실패:", err);
      alert("카카오 공유에 실패했습니다.");
    });
  };

  return (
    <button
      onClick={shareToKakao}
      className="bg-yellow-400 text-black px-4 py-2 text-sm rounded shadow-lg"
    >
      공유하기
    </button>
  );
}
