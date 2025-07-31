'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/utils/supabase/supabaseClient'

export default function Home() {
 const [user, setUser] = useState<null | {
     email?: string
     user_metadata?: { displayName?: string }
 }>(null)

 useEffect(() => {
     supabase.auth.getUser().then(({ data, error }) => {
         if (error) {
             console.error('Error fetching user:', error.message)
         } else {
             setUser(data.user)
         }
     })
 }, [])

    return (
        <div className='font-sans h-screen flex-center bg-black'>
            <div className='m-4 p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-center text-gray-300'>
                Let Rock 🔥..........., {user ? `Welcome ${user.user_metadata?.displayName || user.email}` : 'Guest'}!
                {!user &&
                    <div className='mt-4'>
                        <p className='text-gray-300 text-sm'>Please <a href='/login' className='underline text-gray-400 hover:text-gray-200'>Login</a> or <a href='/register' className='underline text-gray-400 hover:text-gray-200'>Register</a> to continue.</p>
                    </div>
                }
            </div>
        </div>
    )
}