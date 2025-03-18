import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = getSessionCookie(req);

  if (session) {
    if (["/signin", "/signup"].includes(pathname))
      return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next();
  } else {
    if (
      !session &&
      [
        "/profile/settings",
        "/create-thread",
        "/logout",
        "/profile/liked-threads",
      ].includes(pathname)
    )
      return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
