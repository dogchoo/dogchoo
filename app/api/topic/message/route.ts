import { MessageService } from "@/features/message/service/server/message-service";
import { handleApiError } from "@/util/handle-api-error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topicId = searchParams.get("topicId");

  if (!topicId) {
    return NextResponse.json({ error: "topicId가 필요합니다" }, { status: 400 });
  }

  try {
    const messages = await MessageService.fetchMessage(topicId);
    return NextResponse.json({ messages });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topicId, ...messageData } = body;

    const result = await MessageService.createMessage(messageData, topicId);
    return NextResponse.json({ ok: true, messageId: result.key });
  } catch (err) {
    return handleApiError(err);
  }
}
