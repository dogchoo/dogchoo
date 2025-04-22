import { container } from "@/features/container";
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

    const messages = await container.messageService.fetchMessage(topicId);
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
    const messageDataInput = { ...messageData, topicId: topicId };

    const result = await container.messageService.create(messageDataInput);

    return NextResponse.json({ ok: true, messageId: result });
  } catch (err) {
    return handleApiError(err);
  }
}
