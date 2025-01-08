// src/middleware/authLogin.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');

  if (req.nextUrl.pathname.startsWith('/auth/login') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (req.nextUrl.pathname.startsWith('/auth/register') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Aplica el middleware solo en las rutas especificadas
export const config = {
  matcher: ['/auth/login','/auth/register'],
};
