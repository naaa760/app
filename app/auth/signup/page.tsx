"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, User, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      router.push("/auth/signin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-100 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative group max-w-md w-full space-y-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-300 via-gray-200 to-purple-200 rounded-xl blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative p-8 bg-white/60 backdrop-blur-lg rounded-xl shadow-xl border border-purple-100">
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-gray-300 to-purple-400 rounded-lg blur opacity-40"></div>
              <div className="relative px-4 py-2 bg-white/50 rounded-lg border border-purple-100/50">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-gray-600 bg-clip-text text-transparent">
                  Bau
                </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-purple-600 bg-clip-text text-transparent">
                  AI
                </span>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-purple-400 animate-pulse" />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-700">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us and explore the future of AI
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignUp} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="pl-10 border-purple-100 focus:border-purple-300 bg-white/50"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="pl-10 border-purple-100 focus:border-purple-300 bg-white/50"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-10 border-purple-100 focus:border-purple-300 bg-white/50"
                  required
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10">
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="absolute top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-300/20 to-gray-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-gray-300/20 to-purple-200/20 rounded-full blur-3xl animate-float-delay" />
      </div>
    </div>
  );
}
