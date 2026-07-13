import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

const GithubIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export default function LoginForm({ onSignUpClick }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[520px] bg-transparent">
      <div className="mb-8">
        <h1 className="text-[38px] font-bold text-[var(--app-heading)] leading-tight tracking-tight font-sans transition-colors duration-300">
          Welcome Back
        </h1>

        <p className="text-[var(--app-muted)] text-[15px] mt-2 font-medium transition-colors duration-300">
          Login to continue to Creazione.
        </p>
      </div>

      <div className="space-y-5">

        <div>
          <Label className="text-[var(--app-heading)] font-semibold text-xs tracking-wide uppercase transition-colors duration-300">Email Address</Label>

          <Input
            type="email"
            placeholder="name@company.com"
            className="mt-2 h-11 rounded-xl border-[var(--app-input-border)] bg-[var(--app-input-bg)] px-3.5 text-base md:text-sm text-[var(--app-heading)] placeholder:text-[var(--app-subtle)]/60 transition-all duration-300 focus:border-[var(--app-accent)] focus:ring-1 focus:ring-[var(--app-accent)] shadow-none"
          />
        </div>

        <div>
          <Label className="text-[var(--app-heading)] font-semibold text-xs tracking-wide uppercase transition-colors duration-300">Password</Label>

          <div className="relative mt-2">

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 rounded-xl border-[var(--app-input-border)] bg-[var(--app-input-bg)] pl-3.5 pr-11 text-base md:text-sm text-[var(--app-heading)] placeholder:text-[var(--app-subtle)]/60 transition-all duration-300 focus:border-[var(--app-accent)] focus:ring-1 focus:ring-[var(--app-accent)] shadow-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--app-muted)] hover:text-[var(--app-heading)] transition-colors focus:outline-none p-1 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>

          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-[var(--app-heading)] transition-colors duration-300">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <button className="text-[var(--app-accent)] hover:text-[var(--app-accent-hover)] hover:underline font-semibold transition-colors duration-300 cursor-pointer">
            Forgot Password?
          </button>

        </div>

        <Button className="w-full h-[52px] rounded-[12px] bg-[var(--app-panel)] hover:bg-[var(--app-panel-hover)] text-white font-semibold text-base transition-all duration-300 shadow-none cursor-pointer">
          Login
        </Button>

        <p className="text-center text-[12px] text-[var(--app-subtle)] mt-2 font-medium transition-colors duration-300">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-[var(--app-accent)] hover:text-[var(--app-accent-hover)] font-semibold transition-colors duration-300 underline underline-offset-4 cursor-pointer bg-transparent border-none p-0 inline"
          >
            Sign Up
          </button>
        </p>

      </div>
    </div>
  );
}