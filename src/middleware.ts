import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  
  if (
    user &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname === "/")
  ) {
    console.log("Redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !user &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/signup") &&
    !pathname.startsWith("/")
  ) {
    console.log("Redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */

    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
