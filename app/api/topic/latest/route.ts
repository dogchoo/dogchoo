import { container } from "@/features/container";
import { handleApiError } from "@/util/handle-api-error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const topic = await container.topicService.findLatest();
    return NextResponse.json({ topic });
  } catch (err) {
    return handleApiError(err);
  }
}
