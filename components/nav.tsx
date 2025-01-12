"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export function Nav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"
  }`;

  const linkClasses = (isActive: boolean) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
    } after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-400 after:transition-transform hover:after:scale-x-100`;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="w-6 h-6 text-purple-500 group-hover:animate-pulse" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-gray-600 bg-clip-text text-transparent">
            BauAI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {session ? (
            <>
              <Link
                href="/items"
                className={linkClasses(pathname === "/items")}
              >
                Items
              </Link>
              {session.user?.email === "admin@bauai.com" && (
                <Link
                  href="/admin"
                  className={linkClasses(pathname === "/admin")}
                >
                  Admin
                </Link>
              )}
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => router.push("/auth/signin")}
              className="relative group px-6 py-2 overflow-hidden rounded-lg bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Sign In
                <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              </span>
            </Button>
          )}
        </div>

        <button
          className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-purple-100 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {session ? (
              <>
                <Link
                  href="/items"
                  className={linkClasses(pathname === "/items")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Items
                </Link>
                {session.user?.email === "admin@bauai.com" && (
                  <Link
                    href="/admin"
                    className={linkClasses(pathname === "/admin")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  router.push("/auth/signin");
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
