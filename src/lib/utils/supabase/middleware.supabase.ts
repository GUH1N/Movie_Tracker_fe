import { NextResponse } from 'next/server'
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req) {
    const res = NextResponse.next()
    const supabase = createMiddlewareSupabaseClient({ req, res })

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/login'
        return NextResponse.redirect(redirectUrl)
    }

    return res
}

export const config = {
    matcher: ['/protected-path/:path*'],
}
