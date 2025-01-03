"use client";

interface MemorialButtonProps {
  clicked: boolean;
  handleClick: () => void;
}

export default function MemorialButton({ clicked, handleClick }: MemorialButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={`bg-black text-white text-lg mt-5 ${
        clicked ? "opacity-50 cursor-not-allowed" : ""
      } w-[340px] h-[70px] mx-auto text-[20px] leading-[70px] rounded-[12px]`}
    >
      추모 국화 달기
    </button>
  );
}
