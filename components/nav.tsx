"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

export function Nav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          BauAI
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/items"
                className={`text-sm ${
                  pathname === "/items"
                    ? "text-purple-600 font-medium"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Items
              </Link>
              {session.user?.email === "admin@bauai.com" && (
                <Link
                  href="/admin"
                  className={`text-sm ${
                    pathname === "/admin"
                      ? "text-purple-600 font-medium"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Admin
                </Link>
              )}
              <span className="text-sm text-gray-600">
                {session.user?.name || session.user?.email}
              </span>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-purple-600"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => router.push("/auth/signin")}
              className="bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
