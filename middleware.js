import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { getCurrentUser } from "./lib/session";

export default async function middleware(req)
{

    // const { nextUrl } = req;
    // const user = await getCurrentUser();
    // // // const privateRoute = protetctedRoutes.some(route =>  pathname.startsWith(route));

    // // // console.log(privateRoute);
    // console.log(user)

    // console.log(nextUrl.pathname.startsWith('/admin'))

    // if(user.role === 'visitor')
    //     return NextResponse.redirect(new URL('/api/auth/signin', nextUrl))

    // if(nextUrl.pathname === '/admin')
    //     return NextResponse.redirect(new URL('/admin/dashboard', nextUrl))

    // if(user.role !== 'admin' && nextUrl.pathname.startsWith('/admin'))
    //     return NextResponse.redirect(new URL('/', nextUrl))

    // if(user.role === 'admin' && nextUrl.pathname.startsWith('/dashboard'))
    //     return NextResponse.redirect(new URL('/admin/dashboard', nextUrl))

    return null
    
}

export const config = {
    matcher: ['/((?! .+\\. [\\w]+$ |_next).*)', '/', '/(api|trpc) (.*)']
} 


// matcher: ['/((?! .+\\. [\\w]+$ |_next).*)', '/', '/(api|trpc) (.*)']