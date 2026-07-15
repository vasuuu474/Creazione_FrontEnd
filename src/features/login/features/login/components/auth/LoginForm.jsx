import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";


import { useNavigate } from "react-router-dom";

export default function LoginForm({ onSignUpClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logged in with:", email);
    navigate("/home");
  };

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

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <Label className="text-[var(--app-heading)] font-semibold text-xs tracking-wide uppercase transition-colors duration-300">Email Address</Label>

          <Input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 h-11 rounded-xl border-[var(--app-input-border)] bg-[var(--app-input-bg)] px-3.5 text-base md:text-sm text-[var(--app-heading)] placeholder:text-[var(--app-subtle)]/60 transition-all duration-300 focus:border-[var(--app-accent)] focus:ring-1 focus:ring-[var(--app-accent)] shadow-none"
          />
        </div>

        <div>
          <Label className="text-[var(--app-heading)] font-semibold text-xs tracking-wide uppercase transition-colors duration-300">Password</Label>

          <div className="relative mt-2">

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          <button type="button" className="text-[var(--app-accent)] hover:text-[var(--app-accent-hover)] hover:underline font-semibold transition-colors duration-300 cursor-pointer">
            Forgot Password?
          </button>

        </div>

        <Button type="submit" className="w-full h-[52px] rounded-[12px] bg-[var(--app-panel)] hover:bg-[var(--app-panel-hover)] text-white font-semibold text-base transition-all duration-300 shadow-none cursor-pointer">
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

      </form>
    </div>
  );
}