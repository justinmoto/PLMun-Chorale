import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  
  // Protect /Profile route
  if (request.nextUrl.pathname.startsWith('/Profile')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Prevent authenticated users from accessing login/signup pages
  if (token && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/Profile/:path*', '/login', '/signup']
} 