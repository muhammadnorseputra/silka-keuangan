import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  let cookie = cookies().get("USER_SILKA")?.value;
  let check = await request.cookies.has("USER_SILKA");

  // jika browser akses halaman /auth, tetapi cookie is true maka arahkan ke halaman dashboard
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (check && cookie !== "" && cookie !== null) {
      return NextResponse.redirect(
        new URL("/app-integrasi/dashboard", request.url)
      );
    }
  }

  // jika browser akses bukan halaman /auth, tetapi cookie is tidak samadengan berar atau false maka arahkan ke halaman auth
  if (!request.nextUrl.pathname.startsWith("/auth")) {
    if (!cookie || cookie == "" || cookie == null) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/auth", "/app-integrasi/dashboard", "/app-module/pegawai/:path"],
};
