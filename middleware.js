import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if user is trying to access protected routes
  if (pathname.startsWith('/account')) {
    // Check if user is logged in (check localStorage on client side)
    // This is a basic check - in production you'd use proper session management
    const user = request.cookies.get('user')
    
    if (!user) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*']
}
