"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function Navbar() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/");
    setIsLoggingOut(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              CareerGraph<span className="text-brand-600">.ai</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {!isLoading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/analyze"
                      className="btn-primary text-sm py-2 px-5"
                    >
                      Get My Career Plan
                    </Link>
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {user.email?.split("@")[0]}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="btn-primary text-sm py-2 px-5"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
