"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b border-purple-100/50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          BauAI
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/items"
            className="text-gray-600 hover:text-purple-500 transition-colors"
          >
            Items
          </Link>

          {session ? (
            <>
              <Link href="/items/new">
                <Button
                  variant="outline"
                  className="border-purple-200 hover:border-purple-300 bg-white/50 hover:bg-white/60 text-gray-700"
                >
                  New Item
                </Button>
              </Link>

              {session.user.role === "ADMIN" && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    className="border-purple-200 hover:border-purple-300 bg-white/50 hover:bg-white/60 text-gray-700"
                  >
                    Admin
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                onClick={() => signOut()}
                className="text-gray-600 hover:text-purple-500 hover:bg-purple-50"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button className="bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white shadow-sm hover:shadow transition-all">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
