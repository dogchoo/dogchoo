import { container } from "@/features/container";
import { handleApiError } from "@/util/handle-api-error";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await container.messageService.migrateMessages();

    return NextResponse.json({ ok: true, message: "✅ 메시지 마이그레이션 완료" });
  } catch (error) {
    return handleApiError(error);
  }
}
