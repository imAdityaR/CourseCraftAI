import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main
      className="w-full flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      {/* Left side overlay content (hidden on mobile, shown on lg+) */}
      <div className="relative flex-1 hidden items-center justify-center h-screen lg:flex bg-black/40">
        <div className="relative z-10 w-full max-w-md text-white">
          {/* your left content */}
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:px-20 lg:py-24 bg-white/80 backdrop-blur-sm">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <a
                href="/sign-up"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                start your 14-day free trial
              </a>
            </p>
          </div>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </div>
    </main>
  );
}
