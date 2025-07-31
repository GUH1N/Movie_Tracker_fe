import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    if (!code) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Create a NextResponse so we can set cookies
    const response = NextResponse.redirect(new URL('/', request.url))

    // Use the response object for setting cookies
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookies().then((cookieStore) => cookieStore.getAll())
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                }
            }
        }
    )

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/error', request.url))
    }

    // Return response with any cookies set
    return response
}