import NextAuth from "next-auth"
import { cookies } from "next/headers"
import { encode, decode } from 'next-auth/jwt'
import { NextResponse } from "next/server";
import { adminRoutes, authRoutes, userRoutes } from "./routes";
import { auth } from "./auth";

export default async function middleware(req)
{

    // const session = await auth();
    // const user =  session?.user
    const { nextUrl } = req
    // const cookie = cookies()?.get('authjs.session-token');
    
    // let user=null;
    // if(cookie)
    // {
    //     user = await decode({
    //         token: cookie.value,
    //         salt: cookie.name,
    //         secret: process.env.AUTH_SECRET
    //     })
    // } 

    const userRoute = userRoutes.some((route)=> nextUrl.pathname.startsWith(route));
    const adminRoute = adminRoutes.some((route)=> nextUrl.pathname.startsWith(route));
    const authRoute = authRoutes.some((route)=> nextUrl.pathname.startsWith(route));

    if(userRoute || adminRoute || authRoute)
        return NextResponse.redirect(new URL('/', nextUrl))
       
    // if(user?.role === 'visitor' && authRoute )
    //     return NextResponse.redirect(new URL('/', nextUrl))

    // if(user)
    // {
    //     if(user.role === 'user' && authRoute)
    //         return NextResponse.redirect(new URL('/dashboard', nextUrl))
    
    //     if(user.role !== 'admin' && nextUrl.pathname.startsWith('/admin'))
    //         return NextResponse.redirect(new URL('/', nextUrl))
    
    //     if(user.role === 'admin' && nextUrl.pathname.startsWith('/dashboard'))
    //         return NextResponse.redirect(new URL('/admin/dashboard', nextUrl))

    //     // if(nextUrl.pathname.startsWith('/admin'))
    //     //     return NextResponse.redirect(new URL('/admin/dashboard', nextUrl))
    // }
    // else
    // {
    //     if(userRoute || adminRoute)
    //         return NextResponse.redirect(new URL('/login', nextUrl))
    // }

    return null
    
}

export const config = {
    matcher: ['/((?! .+\\. [\\w]+$ |_next).*)', '/', '/(api|trpc) (.*)']
} 

// if(user?.role === 'user' && authRoute)
//     return NextResponse.redirect(new URL('/dashboard', nextUrl))

// if(user?.role !== 'user' && userRoute)
//     return NextResponse.redirect(new URL('/login', nextUrl))

// if(user?.role !== 'admin' && adminRoute)
//     return NextResponse.redirect(new URL('/', nextUrl))

// if(user?.role === 'admin' && adminRoute)
//     return NextResponse.redirect(new URL('/admin/dashboard', nextUrl))