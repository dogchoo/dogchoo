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

export async function GET(_: NextRequest) {
  try {
    const result = await container.topicService.fetchAllTopic();
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    return handleApiError(err);
  }
}
