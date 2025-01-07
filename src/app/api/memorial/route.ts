import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId || typeof userId !== "number") {
      return NextResponse.json(
        { error: "유효하지 않은 userId 입니다." },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingMemorial = await prisma.memorial.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
    });

    if (existingMemorial) {
      return NextResponse.json(
        { error: "오늘 이미 추모에 참여했습니다." },
        { status: 400 }
      );
    }

    const memorial = await prisma.memorial.create({
      data: {
        userId: Number(userId),
        date: new Date(),
      },
    });

    const totalCount = await prisma.memorial.count();

    return NextResponse.json({ newCount: totalCount, memorial }, { status: 200 });
  } catch (error) {
    console.error("추모 데이터 저장 실패:", error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { nickname: true },
    });

    const nicknames = users.map((user) => user.nickname);
    return NextResponse.json(nicknames, { status: 200 });
  } catch (error) {
    console.error("닉네임 로드 실패:", error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
