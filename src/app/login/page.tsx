"use client";

import { PackageCheck } from 'lucide-react';
import { login } from '@/lib/utils/supabase/action.supabase';
import { Input } from '@components/UI/input';
import { Button } from '@components/UI/button';
import {useForm} from 'react-hook-form';

export default function Login() {

const {register, formState: { errors } } = useForm<{name: string, email: string, password: string}>({})

    return (
            <div className="font-sans h-screen bg-black flex-center">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/30 to-transparent pointer-events-none z-10 rounded-t-xl"/>
                <div>
                    <div className="flex flex-row justify-center items-center p-2 relative z-20 pt-5">
                        <div className="p-3">
                            <PackageCheck size={45} />
                        </div>
                        <p className="p-3 font-medium text-lg text-white">Sign In</p>
                    </div>
                    <div className="relative w-[350px] rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl overflow-hidden pt-6">

                        <span className="flex justify-center text-[15px] text-gray-300 relative z-20">
                            Welcome Back!
                        </span>

                        {/* Form */}
                        <form className="relative z-20" >
                            <div className="p-6 pt-2 px-10">
                          <div className="grid w-full max-w-sm items-center gap-1">
                              <label htmlFor="email" className="text-sm text-gray-200">Email</label>
                              <Input
                                  id="email"
                                  placeholder="email"
                                  {...register('email', {
                                      required: { value: true, message: "Enter a valid email" },
                                      pattern: {
                                          value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                                          message: "Enter a valid email address"
                                      }
                                  })}
                              />
                              <span className="text-red-500 text-xs p-1">{errors.email?.message as string}</span>
                          </div>

                                <div className="grid w-full max-w-sm items-center gap-1 pt-5">
                                    <div className='flex justify-between'>
                                        <label htmlFor="password" className="text-sm text-gray-200">Password</label>
                                        <a href={'/'} className='text-[10px] flex-center'>Forget Password ?</a>
                                    </div>
                                    <Input type="password" id="password" name="password" placeholder="Password" required />
                                </div>
                            </div>

                            <div className="pb-5 px-10">
                                <Button type="submit" className="text-background w-full bg-foreground" formAction={login}>
                                    Login...
                                </Button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center pb-4 px-10 relative z-20">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="mx-4 text-gray-400 text-sm">or</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>

                        {/* Google Button */}
                        <div className="px-10 relative z-20">
                            <Button variant="outline" className="w-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with Google
                            </Button>
                        </div>

                        {/* Footer */}
                        <div className="relative z-20">
                            <p className="flex justify-center text-[12px] py-6 text-gray-300">
                                This page is only for existing users, so <a href={"/register"} className="text-gray-400 underline ml-1">Register!</a>
                            </p>
                        </div>
                    </div>
                    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 px-10 py-4 w-[350px]">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
    )
};
