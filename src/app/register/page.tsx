import { Button } from '@components/UI/button'
import { Input } from '@components/UI/input'
import { signup} from "@lib/utils/supabase/action.supabase";
import { signInWithGoogle} from "@lib/utils/supabase/action.supabase";

export default function Page() {
    return (
        <div className="font-sans h-screen flex flex-col justify-center items-center bg-black px-4">
            <h3 className="text-white text-lg pb-6 font-semibold">CREATE YOUR ACCOUNT</h3>

            <div className="relative w-[350px] rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl overflow-hidden px-6 py-4">
                {/* Fading overlay optional here if you want glassy fade */}
                <p className="text-center text-[13px] text-gray-300 pb-4">
                    Welcome to AI Powered Todo System
                </p>

                <form className="relative z-20 space-y-3">
                    <div className="space-y-1">
                        <label htmlFor="username" className="text-sm text-gray-200">Username</label>
                        <Input type="text" className='mt-1' id="username" placeholder="Username" name='username' required />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm text-gray-200">Email</label>
                        <Input type="email" id="email" className='mt-1' placeholder="Email" name='email' required />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm text-gray-200">Password</label>
                        <Input type="password" id="password" className='mt-1' placeholder="Password" name='password' required />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="confirmPassword" className="text-sm text-gray-200">Confirm Password</label>
                        <Input type="password" id="confirmPassword" className='mt-1' placeholder="Confirm Password" name='confirm password' required />
                    </div>

                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4 mt-1 text-foreground bg-white/10 border-gray-300 rounded focus:ring-foreground"
                            required
                        />
                        <label htmlFor="terms" className="text-sm text-gray-300">
                            I agree to the <a href="#" className="underline text-gray-400 hover:text-gray-200">Terms and Conditions</a>
                        </label>
                    </div>

                    <Button type="submit" className="w-full bg-foreground text-background mt-2" formAction={signup}>
                        Register...
                    </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center py-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-400 text-sm">or</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                {/* Google Page */}
                <form>
                    <Button variant="outline" className="w-full flex items-center justify-center" formAction={signInWithGoogle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Continue with Google
                    </Button>
                </form>
            </div>

            {/* Footer */}
            <p className="text-[12px] text-gray-300 pt-6">
                This page is for new users, so
                <a href={"/login"} className="text-gray-400 underline ml-1">Login!</a>
            </p>
        </div>
    )
}
