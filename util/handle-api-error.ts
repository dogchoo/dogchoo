import { NextResponse } from "next/server";
import { CustomError } from "./custom-error";

export function handleApiError(err: unknown) {
  const error = CustomError.wrap(err);

  return NextResponse.json(
    {
      ok: false,
      error: error.message,
      code: error.errorCode,
    },
    { status: error.statusCode },
  );
}
