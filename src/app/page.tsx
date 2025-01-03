"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import KakaoShareButton from "@/components/KakaoShareButton";
import MemorialButton from "@/components/MemorialButton";
import NicknameRoller from "@/components/NicknameRoller";
import { useRouter } from "next/navigation";

const REST_API_KEY = "e1bc3c4db3a86b3b347d08cef1f2a65c";
const LOGOUT_REDIRECT_URI = "http://localhost:3000/login";

export default function HomePage() {
  const [count, setCount] = useState(703055);
  const [clicked, setClicked] = useState(false);
  const [nicknames, setNicknames] = useState<string[]>([
    "kimchi***",
    "seo***",
    "park***",
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      console.log("사용자 정보 없음.");
      setUser(null);  // 게스트 처리
    }

    const lastClicked = localStorage.getItem("lastClicked");
    const today = new Date().toISOString().split("T")[0];
    if (lastClicked === today) {
      setClicked(true);
    }
  }, []);

  const handleClick = () => {
    if (clicked) {
      alert("오늘은 이미 추모 국화를 달았습니다.");
      return;
    }

    setCount((prevCount) => prevCount + 1);
    setClicked(true);

    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("lastClicked", today);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 카카오 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("user");  // 로컬 상태 초기화
    const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
    window.location.href = kakaoLogoutURL;  // 카카오 서버 세션 초기화 후 리디렉트
  };

  return (
    <div
      className={`flex flex-col ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* 다크 모드 버튼 */}
      <div className="fixed bottom-5 right-5 z-50">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* 공유하기 버튼과 로그아웃 버튼 컨테이너 */}
      <div className="fixed top-5 right-5 z-50 flex space-x-4">
        <KakaoShareButton />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          로그아웃
        </button>
      </div>

      <section className="relative w-screen h-screen bg-stone-600">
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200">
          <Image
            src="/images/flower.png"
            alt="추모 국화"
            width={700}
            height={600}
            objectFit="contain"
          />
          <h1 className="text-3xl font-bold mt-10 text-center leading-relaxed">
            여객기 참사로 희생된 모든 분들을 깊이 추모합니다
          </h1>
        </div>
      </section>

      <section className="p-10 text-center w-full">
        <p className="text-lg">추모 국화로 함께 애도해 주세요</p>
        <h2 className="text-4xl font-bold mt-5">
          {count.toLocaleString()}명이 함께 하고 있습니다
        </h2>
        

        <MemorialButton clicked={clicked} handleClick={handleClick} />
       <br />
        <a
          href="https://map.kakao.com/?q=합동분향소"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gray-300 text-gray-600 mt-5 cursor-pointer w-[240px] h-[50px] mx-auto text-[18px] leading-[50px] rounded-[8px]">
            합동 분향소
          </button>
        </a>
        <NicknameRoller nicknames={nicknames} />
      </section>
    </div>
  );
}
