import LoginForm from "./components/auth/LoginForm";

export default function Login({ onSignUpClick }) {
  return (
    <div className="min-h-screen w-full flex bg-[var(--app-bg)] overflow-x-hidden font-sans transition-colors duration-300">
      {/* Left Section */}
      <div className="hidden md:flex md:w-[45%] lg:w-1/2 bg-[var(--app-panel)] text-white px-16 flex-col justify-center select-none relative overflow-hidden transition-colors duration-300">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-login" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-login)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[480px]">
          {/* Logo */}
          <div className="text-[42px] font-bold text-white mb-[40px] tracking-tight leading-none">
            Creazione
          </div>

          {/* Heading */}
          <h2 className="text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-6">
            Welcome back to Creazione.
          </h2>

          {/* Paragraph */}
          <p className="text-[18px] text-white/72 font-normal leading-relaxed max-w-[420px]">
            Sign in to continue collaborating with your team and manage your projects efficiently.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[55%] lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-[var(--app-bg)] transition-colors duration-300">
        <LoginForm onSignUpClick={onSignUpClick} />
      </div>
    </div>
  );
}
