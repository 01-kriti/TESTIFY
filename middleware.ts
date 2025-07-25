import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Paths that don't require authentication
const publicPaths = ["/", "/register", "/admin/login"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is public
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // Check if it's an admin path
  const isAdminPath = path.startsWith("/admin")

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1]

  // If there's no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL(isAdminPath ? "/admin/login" : "/", request.url))
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")
    const { payload } = await jwtVerify(token, secret)

    // For admin paths, check if the user is an admin
    if (isAdminPath && !payload.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Continue to the protected route
    return NextResponse.next()
  } catch (error) {
    // If the token is invalid, redirect to login
    return NextResponse.redirect(new URL(isAdminPath ? "/admin/login" : "/", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
