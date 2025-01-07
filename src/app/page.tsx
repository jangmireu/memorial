"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import KakaoShareButton from "@/components/KakaoShareButton";
import MemorialButton from "@/components/MemorialButton";
import NicknameRoller from "@/components/NicknameRoller";
import { useRouter } from "next/navigation";

const REST_API_KEY = "e1bc3c4db3a86b3b347d08cef1f2a65c";
const LOGOUT_REDIRECT_URI = "https://jpmemorial-project.vercel.app/login";

export default function HomePage() {
  const [count, setCount] = useState(0); // 참여 카운트 초기화
  const [clicked, setClicked] = useState(false); // 추모 버튼 클릭 여부
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부
  const [nicknames, setNicknames] = useState<string[]>([]); // 닉네임 리스트
  const [darkMode, setDarkMode] = useState(false); // 다크 모드 상태
  const [user, setUser] = useState<any>(null); // 현재 로그인 사용자 정보
  const router = useRouter();

  // 초기 데이터 불러오기: 참여 카운트와 닉네임 리스트
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 참여 카운트 가져오기
        const countResponse = await fetch("/api/counter");
        const countData = await countResponse.json();
        setCount(countData.currentCount);

        // 닉네임 리스트 가져오기
        const nicknameResponse = await fetch("/api/memorial");
        const nicknameData = await nicknameResponse.json();
        setNicknames(nicknameData);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };
    fetchInitialData();
  }, []);

  // 사용자 상태 초기화
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login?message=login_required");
    }

    const lastClicked = localStorage.getItem("lastClicked");
    const today = new Date().toISOString().split("T")[0];
    if (lastClicked === today) {
      setClicked(true);
    }
  }, [router]);

  // 추모 버튼 클릭 핸들러
  const handleClick = async () => {
    if (clicked) {
      alert("오늘은 이미 추모 국화를 달았습니다.");
      return;
    }

    try {
      const response = await fetch("/api/memorial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setCount(data.newCount); // DB에서 받아온 참여 카운트
        setClicked(true);
        setShowPopup(true);

        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("lastClicked", today);

        setNicknames((prevNicknames) => [user.nickname, ...prevNicknames]);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "서버 에러가 발생했습니다.");
      }
    } catch (error) {
      console.error("네트워크 오류 발생:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  // 다크 모드 토글
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("user");
    const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
    window.location.href = kakaoLogoutURL;
  };

  return (
    <div
      className={`flex flex-col ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* 다크 모드 토글 버튼 */}
      <div className="fixed bottom-5 right-5 z-50">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* 공유 및 로그아웃 버튼 */}
      <div className="fixed top-5 right-5 z-50 flex space-x-4">
        <KakaoShareButton />
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-black px-4 py-2 text-sm rounded shadow-lg"
        >
          로그아웃
        </button>
      </div>

      {/* 메인 이미지 및 추모 메시지 */}
      <section className="relative w-screen h-screen bg-stone-600">
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200">
          <Image
            src="/images/flower.png"
            alt="추모 국화"
            width={700}
            height={600}
            objectFit="contain"
          />
          <h1 className="text-3xl font-bold mt-10 text-center">
            여객기 참사로 희생된 모든 분들을 깊이 추모합니다
          </h1>
        </div>
      </section>

      {/* 추모 카운트와 버튼 */}
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
          <button className="bg-gray-300 mt-5 w-[240px] h-[50px] rounded">
            합동 분향소
          </button>
        </a>

        {/* 닉네임 롤러 */}
        <div className="pt-16 pb-16">
          <NicknameRoller nicknames={nicknames} />
        </div>
      </section>

      {/* 추모 참여 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-lg">
            <Image
              src="/images/flower.png"
              alt="국화 이미지"
              width={250}
              height={250}
            />
            <h2 className="text-3xl font-bold mt-8">
              추모에 참여해주셔서 감사합니다
            </h2>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed">
              *참여 숫자는 카카오톡 ID 기준으로 1회만 집계됩니다.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-black text-white px-8 py-3 mt-8 rounded-lg"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
