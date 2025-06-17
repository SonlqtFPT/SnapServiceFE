import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Định nghĩa các route cần quyền admin
export type UserPayload = {
    UserId: string;
    FullName: string;
    Role: string;
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // Lấy token từ cookie
    const token = request.cookies.get('token')?.value;

    // Nếu không có token => chuyển hướng về trang login
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // Giải mã token để lấy role 
        const payload: UserPayload = jwtDecode(token); // bạn tự viết hàm này hoặc dùng thư viện
        const userRole = payload.Role;
        if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        if (pathname.startsWith('/supplier') && userRole !== 'SUPPLIER') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        return NextResponse.next();
    } catch (err) {
        console.log(err)
        return NextResponse.redirect(new URL('/login', request.url));
    }

}
export const config = {
    matcher: [
        '/admin/:path*',
        '/supplier/:path*',
    ],
};  
