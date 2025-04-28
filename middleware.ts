import { NextRequest, NextResponse } from "next/server";

const ADMIN_PAGE = "/admin";

const privatePaths = [ADMIN_PAGE];

export default async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // TODO: 어드민 페이지 블로킹 로직 추가 해야 함
  if (pathname === ADMIN_PAGE) {
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
