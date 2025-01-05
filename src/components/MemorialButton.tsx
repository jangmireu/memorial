"use client";

interface MemorialButtonProps {
  clicked: boolean;
  handleClick: () => void;
}

export default function MemorialButton({
  clicked,
  handleClick,
}: MemorialButtonProps) {
  return (
    <button
  onClick={handleClick}
  className={`text-lg mt-5 w-[340px] h-[70px] mx-auto text-[20px] leading-[70px] rounded-[12px] transition-all duration-300 ease-in-out
    ${
      clicked
        ? "opacity-60 cursor-not-allowed bg-gray-400 text-white dark:bg-gray-600 dark:text-white"
        : "bg-black text-white hover:bg-gray-800 dark:bg-gray-300 dark:text-black"
    }`}
>
  추모 국화 달기
</button>

  );
}
