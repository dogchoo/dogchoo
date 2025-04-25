import { container } from "@/features/container";
import { handleApiError } from "@/util/handle-api-error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await container.topicService.createTopic(body);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await container.topicService.updateTopic(body);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await container.topicService.deleteTopic(body);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    return handleApiError(err);
  }
}

// http://localhost:3000/api/topic?page=1&limit=1  같은식으로 url
// page와 list요청이 있으면 페이지형식으로 없으면 모든 토픽 가져오기.
export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    let result;

    if (page && limit) {
      // 페이지네이션 요청일 때
      result = await container.topicService.fetchTopicByPage(parseInt(page), parseInt(limit));
    } else {
      // 전체 조회 요청일 때
      result = await container.topicService.fetchAllTopic();
    }

    return NextResponse.json({ ok: true, data: result });
  } catch (err) {
    return handleApiError(err);
  }
}
