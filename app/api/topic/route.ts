import { TopicService } from "@/features/topic/service/topic-service";
import { handleApiError } from "@/util/handle-api-error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await TopicService.createTestTopic(body);
    return NextResponse.json({ ok: true, topicId: result.id });
  } catch (err) {
    return handleApiError(err);
  }
}
