import Image from 'next/image';

export default function Tribute() {
  return (
    <div className="flex flex-col">

<header className="w-screen bg-gray-200 text-white py-4 px-10 flex justify-between items-center fixed top-0 left-0 z-50">
  </header>
        


      <section className="relative w-screen h-screen bg-stone-600">
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200">
          <Image
            src="/images/flower.png"
            alt="추모 국화"
            width={700}
            height={600}
            objectFit="contain"
          />
          <h1 className="text-3xl font-bold text-black mt-10 text-center leading-relaxed">
            여객기 참사로 희생된<br />모든 분들을 깊이 추모합니다
          </h1>
        </div>

      </section>

      {/* 스크롤 가능한 섹션 */}
      <section className="p-10 text-center w-full bg-white">
        <p className="text-lg">추모 국화로 함께 애도해 주세요</p>
        <h2 className="text-4xl font-bold mt-5">703,055명이 함께 하고 있습니다</h2>

        <button className="bg-black text-white px-10 py-4 text-lg mt-5">
          추모 국화 달기
        </button>

        <button className="bg-gray-300 text-gray-600 px-10 py-4 text-lg mt-5 cursor-not-allowed">
          합동 분향소
        </button>

        <div className="flex space-x-4 mt-10">
          <div>seb***</div>
          <div>seb***</div>
          <div>seb***</div>
        </div>
      </section>
    </div>
  );
}