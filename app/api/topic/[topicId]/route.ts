import { container } from "@/features/container";
import { handleApiError } from "@/util/handle-api-error";
import { NextRequest, NextResponse } from "next/server";

interface GetTopicParams {
  params: Promise<{ topicId: string }>;
}

export async function GET(_: NextRequest, { params }: GetTopicParams) {
  try {
    const { topicId } = await params;

    if (!topicId) {
      return NextResponse.json({ error: "id가 필요합니다" }, { status: 400 });
    }

    const topic = await container.topicService.fetchTopic(topicId);
    return NextResponse.json({ topic });
  } catch (err) {
    return handleApiError(err);
  }
}
