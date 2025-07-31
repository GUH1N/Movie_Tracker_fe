import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    if (!code) {
        return NextResponse.redirect('/')
    }

    // Create a NextResponse to set cookies onto the response
    const response = NextResponse.redirect('/')

    // Create Supabase client passing cookie handlers with cookie setting on the response
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

    // Exchange the OAuth code for session, which sets cookies
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect('/error')
    }

    // Return response with cookies set
    return response
}
