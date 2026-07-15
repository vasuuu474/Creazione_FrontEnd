export default function LeftPanel() {
  return (
    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-12 flex-col justify-between">
      <div>
        <h1 className="text-4xl font-bold">CollabHub</h1>
        <p className="mt-3 text-emerald-100">
          Collaborate. Create. Grow.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img
          src="https://undraw.co/api/illustrations/undraw_secure-login.svg"
          alt="Login Illustration"
          className="w-80"
        />

        <h2 className="text-3xl font-bold mt-8 text-center">
          Welcome Back!
        </h2>

        <p className="text-center mt-4 text-emerald-100 max-w-sm">
          Sign in to continue collaborating with your team and manage your
          projects efficiently.
        </p>
      </div>

      <p className="text-sm text-emerald-200">
        © 2026 CollabHub. All rights reserved.
      </p>
    </div>
  );
}
