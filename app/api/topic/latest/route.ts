import { TopicService } from "@/features/topic/service/topic-service";
import { handleApiError } from "@/util/handle-api-error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const topic = await TopicService.getLatestTopic();
    return NextResponse.json({ topic });
  } catch (err) {
    return handleApiError(err);
  }
}
