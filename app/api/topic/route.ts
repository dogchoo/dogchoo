import { createTopic } from "@/features/topic/service/server/create-topic";
import { handleApiError } from "@/util/handle-api-error";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const messages = await fetchMessage();
//     return NextResponse.json({ messages });
//   } catch (err) {
//     return handleApiError(err);
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createTopic(body);
    return NextResponse.json({ ok: true, topicId: result.key });
  } catch (err) {
    return handleApiError(err);
  }
}
