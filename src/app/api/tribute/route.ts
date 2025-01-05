import prisma from '@/lib/prisma';  // 절대 경로 사용

export async function POST(req: Request) {
  const { userId, nickname } = await req.json();

  if (!userId || !nickname) {
    return new Response(JSON.stringify({ error: "필수 정보가 누락되었습니다." }), {
      status: 400,
    });
  }

  try {
    const tribute = await prisma.tribute.create({
      data: {
        userId,
        nickname,
      },
    });

    return new Response(JSON.stringify(tribute), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "서버 에러 발생" }), {
      status: 500,
    });
  }
}
