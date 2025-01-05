import Image from "next/image";

interface NicknameRollerProps {
  nicknames: string[];
}

export default function NicknameRoller({ nicknames }: NicknameRollerProps) {
  const duplicatedNicknames = [...nicknames, ...nicknames]; // 닉네임 2배로 복제

  return (
    <div className="overflow-hidden w-full h-[150px] relative">
      <div className="flex space-x-16 animate-scroll-horizontal">
        {duplicatedNicknames.map((nickname, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center pt-24"
          >
            <div className="absolute top-0 w-[100px] h-[100px]">
              <Image
                src="/images/flower.png"
                alt="국화 이미지"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="text-xl font-semibold whitespace-nowrap mt-4">
              {nickname}
            </span>
          </div>
        ))}
      </div>

      {/* 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite; /* 40초로 속도 조절 */
        }
      `}</style>
    </div>
  );
}
