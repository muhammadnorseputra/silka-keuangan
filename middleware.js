import { NextResponse } from "next/server";
import { getSessionDatabase, getSessionServer } from "@/app/app-module/server-session";


export async function middleware(request) {
  const isUser = await request.cookies.has("USER_SILKA");
  const session = await getSessionServer("USER_SILKA");


  if(!isUser || !session?.access_token) {
    const res = NextResponse.redirect(new URL("/auth", request.url));
    res.cookies.delete('USER_SILKA');
    return res;
  }

  const sessionFromDB = await getSessionDatabase(
    session?.access_token
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
  matcher: ["/app-integrasi/dashboard", "/app-integrasi/cariasn", "/app-integrasi/generative-ai", "/app-module/:path"],
};
