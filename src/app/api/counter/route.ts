import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET 요청 – 현재 카운트 조회
export async function GET() {
  const counter = await prisma.counter.findFirst();
  const currentCount = counter ? counter.count : 0;

  return Response.json({ currentCount });
}

// POST 요청 – 카운트 증가
export async function POST() {
  const counter = await prisma.counter.findFirst();

  if (counter) {
    const updatedCounter = await prisma.counter.update({
      where: { id: counter.id },
      data: { count: counter.count + 1 },
    });
    return Response.json({ newCount: updatedCounter.count });
  } else {
    const newCounter = await prisma.counter.create({
      data: { count: 1 },
    });
    return Response.json({ newCount: newCounter.count });
  }
}
