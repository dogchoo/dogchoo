import { MessageService } from "@/features/message/service/server/message-service";
import { handleApiError } from "@/util/handle-api-error";
import { NextRequest, NextResponse } from "next/server";

interface GetMessageParams {
  params: Promise<{ topicId: string }>;
}

export async function GET(_: NextRequest, { params }: GetMessageParams) {
  try {
    const { topicId } = await params;

    if (!topicId) {
      return NextResponse.json({ error: "topicId가 필요합니다" }, { status: 400 });
    }

    const messages = await MessageService.fetchMessage(topicId);
    return NextResponse.json({ messages });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest, { params }: GetMessageParams) {
  try {
    const { topicId } = await params;

    if (!topicId) {
      return NextResponse.json({ error: "topicId가 필요합니다" }, { status: 400 });
    }

    const messageData = await req.json();
    const result = await MessageService.createMessage(messageData, topicId);

    return NextResponse.json({ ok: true, messageId: result.key });
  } catch (err) {
    return handleApiError(err);
  }
}
