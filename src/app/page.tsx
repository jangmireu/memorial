"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import NicknameRoller from "@/components/NicknameRoller";
import MemorialButton from "@/components/MemorialButton";
import KakaoShareButton from "@/components/KakaoShareButton";

export default function HomePage() {
  const [count, setCount] = useState(703055);
  const [clicked, setClicked] = useState(false);
  const [nicknames, setNicknames] = useState<string[]>([
    "kimchi***",
    "seo***",
    "park***",
  ]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const lastClicked = localStorage.getItem("lastClicked");
    const today = new Date().toISOString().split("T")[0];
    if (lastClicked === today) {
      setClicked(true);
    }
  }, []);

  const generateNickname = () => {
    const randomNames = ["abcde", "defgh", "ijklmn", "opqrst", "uvwxyz"];
    const randomName =
      randomNames[Math.floor(Math.random() * randomNames.length)];
    return `${randomName.slice(0, 2)}***`;
  };

  const handleClick = async () => {
    if (clicked) {
      alert("오늘은 이미 추모 국화를 달았습니다.");
      return;
    }

    setCount((prevCount) => prevCount + 1);
    setClicked(true);

    const newNickname = generateNickname();
    setNicknames((prev) => [...prev, newNickname]);

    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("lastClicked", today);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      
      {/* 다크 모드 버튼을 오른쪽 하단에 고정 */}
      <div className="fixed bottom-5 right-5 z-50">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* 공유하기 버튼을 오른쪽 상단에 고정 */}
      <div className="fixed top-5 right-5 z-50">
        <KakaoShareButton />
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
            여객기 참사로 희생된<br />모든 분들을 깊이 추모합니다
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
          href="https://map.kakao.com/?q=%ED%95%A9%EB%8F%99%EB%B6%84%ED%96%A5%EC%86%8C"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gray-300 text-gray-600 mt-5 cursor-pointer w-[240px] h-[50px] mx-auto text-[18px] leading-[50px] rounded-[8px]">
            합동 분향소
          </button>
        </a>
        <br />
        
        <NicknameRoller nicknames={nicknames} />
      </section>
    </div>
  );
}
