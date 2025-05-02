import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of protected routes
const protectedRoutes = ['/dashboard'];

export function middleware(request: NextRequest) {
    const user = request.cookies.get('user') || null;
    const pathname = request.nextUrl.pathname;

    if (protectedRoutes.includes(pathname) && !user) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}
