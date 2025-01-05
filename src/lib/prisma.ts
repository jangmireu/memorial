// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Prisma 클라이언트 초기화
const prisma = new PrismaClient();

// Prisma 클라이언트 내보내기 (API 라우트에서 사용)
export default prisma;
