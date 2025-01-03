interface NicknameRollerProps {
    nicknames: string[];
  }
  
  export default function NicknameRoller({ nicknames }: NicknameRollerProps) {
    return (
      <div className="overflow-hidden mt-10 h-[40px]">
        <div className="flex flex-col space-y-4 animate-scroll">
          {nicknames.map((nickname, index) => (
            <div key={index} className="text-lg font-semibold">
              {nickname}
            </div>
          ))}
        </div>
  
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateY(0%);
            }
            100% {
              transform: translateY(-100%);
            }
          }
          .animate-scroll {
            animation: scroll 10s linear infinite;
          }
        `}</style>
      </div>
    );
  }
  