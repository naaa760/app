"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Loader } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      } else {
        router.push("/items");
        toast({
          title: "Success",
          description: "Signed in successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-100 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative group max-w-md w-full space-y-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 via-gray-200 to-purple-200 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-1000" />
        <div className="relative p-8 bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-purple-100">
          <div className="flex justify-center">
            <Sparkles className="h-12 w-12 text-purple-400 animate-pulse" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent">
            Sign in to your account
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`bg-white/50 border-purple-100 focus:border-purple-300 ${
                    errors.email ? "border-red-300" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`bg-white/50 border-purple-100 focus:border-purple-300 ${
                    errors.password ? "border-red-300" : ""
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="fixed top-20 left-[20%] w-64 h-64 bg-gradient-to-r from-purple-300/20 to-gray-200/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
      <div className="fixed bottom-20 right-[20%] w-72 h-72 bg-gradient-to-r from-gray-300/20 to-purple-200/20 rounded-full blur-3xl animate-[float-delay_6s_ease-in-out_infinite]" />
    </div>
  );
}
