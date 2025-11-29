import { useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";

import Logo from "@/assets/images/logo-icon.svg?react";
import Google from "@/assets/images/google.svg?react";
import Apple from "@/assets/images/apple.svg?react";

export function SignUp() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
    return () => setTheme("system");
  }, [setTheme]);

  return (
    <main className="w-full flex justify-center items-center">
      <img
        src="/assets/signup.png"
        alt="Hero background"
        className="absolute select-none -top-2.5 left-0 w-full h-full object-cover z-[-1] animate-fade-in transition-transform duration-[2000ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]"
      />
      <section className="flex flex-col gap-6 justify-center items-center bg-transparent backdrop-blur-2xl p-8 rounded-xl border md:px-16">
        <Logo className="h-8 w-8" />
        <h1 className="text-lg text-center">Ready to start?</h1>

        <form onSubmit={() => {}} className="space-y-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Mail className="absolute w-4 h-4 left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email"
                onChange={() => {}}
                className="w-full bg-input/30 text-sm px-12 py-2 rounded-xl transition duration-300 hover:ring-1 hover:ring-foreground focus:ring-2 focus:ring-foreground outline-none"
              />
            </div>
            <div className="relative">
              <Lock className="absolute w-4 h-4 left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                placeholder="Password"
                onChange={() => {}}
                className="w-full bg-input/30 text-sm px-12 py-2 rounded-xl transition duration-300 hover:ring-foreground hover:ring-1 focus:ring-2 focus:ring-foreground outline-none"
              />
            </div>
            <div className="flex flex-row gap-1 justify-center items-center text-xs text-muted-foreground">
              <span>Already have an account?</span>
              <Link to="/login" className="text-accent hover:underline">Log in</Link>
            </div>
          </div>
          <Button className="!w-full select-none text-sm text-foreground border rounded-xl duration-300 bg-origin-border bg-gradient-to-r from-transparent to-white/5 hover:bg-input/20 sm:w-auto">
            <Link to="/signup">Create account</Link>
          </Button> 
        </form>
        <div className="w-full flex items-center gap-2 my-2">
          <hr className="flex-grow border-t border-border" />
          <span className="text-xs text-muted-foreground">or sign in with</span>
          <hr className="flex-grow border-t border-border" />
        </div>
        <div className="w-full flex justify-center gap-3">
          <button className="flex-grow flex items-center justify-center gap-2 py-3 rounded-xl border">
            <Google className="w-5 h-5" />
          </button>
          <button className="flex-grow flex items-center justify-center gap-2 py-3 rounded-xl border">
            <Apple className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
