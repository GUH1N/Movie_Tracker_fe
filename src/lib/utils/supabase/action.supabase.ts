'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/utils/supabase/server.supabase'

export async function signInWithGoogle() {
    const supabase = await createClient()

    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectUrl,
        },
    })
    console.log(data)

    if (error) {
        console.error('Google sign-in error:', error)
        redirect('/error')
    }
    if (data?.url) {
        redirect(data.url)
    }
}

export async function login(formData: FormData) {
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    console.log('data', data)
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()
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