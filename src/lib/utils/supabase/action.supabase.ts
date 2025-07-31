'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/utils/supabase/server.supabase'

export async function signInWithGoogle() {
    const supabase = await createServerSupabaseClient()

    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectUrl,
        },
    })

    if (error) {
        console.error('Google sign-in error:', error)
        redirect('/error')
    }
    if (data?.url) {
        redirect(data.url)
    }
}

export async function login(formData: FormData) {
    const supabase = await createServerSupabaseClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createServerSupabaseClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options : {
            data:{
                displayName: formData.get('username') as string,
            }
        }
    }
    const { error } = await supabase.auth.signUp(data)
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/login')
}