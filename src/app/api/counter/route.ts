// src/app/api/counter/route.ts

let globalCount = 703055;  // 초기값 설정 (서버 메모리)

export async function POST() {
  globalCount += 1;
  return Response.json({ newCount: globalCount });
}

export async function GET() {
  return Response.json({ currentCount: globalCount });
}
