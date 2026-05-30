import { NextResponse } from "next/server";
import { getSessionDatabase, getSessionServer } from "@/app/app-module/server-session";

// This function can be marked `async` if using `await` inside
/**
 * @param {{ cookies: { has: (arg0: string) => any; }; nextUrl: { pathname: string; }; url: string | URL | undefined; }} request
 */
export async function middleware(request) {
  const isUser = await request.cookies.has("USER_SILKA");
  const session = await getSessionServer("USER_SILKA");

  const sessionFromDB = await getSessionDatabase(
    session.access_token
  );

  // jika browser akses bukan halaman /auth, tetapi cookie is tidak samadengan berar atau false maka arahkan ke halaman auth
  if (!request.nextUrl.pathname.startsWith("/auth")) {
    if (!isUser || !sessionFromDB.status) {
      const res = NextResponse.redirect(new URL("/auth", request.url));
      res.cookies.delete('USER_SILKA');
      return res;
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/app-integrasi/:path", "/app-module/:path"],
};
