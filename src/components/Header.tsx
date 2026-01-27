"use client";

import { Button } from "@/components/ui/button";
import { Mail, User, LogOut, Wallet } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  // const telegramBotUrl = "https://t.me/VoidBouncebot";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#101318cc] backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <Link href="/" className="text-sm md:text-xl font-bold">
              VoidBounce
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="/packages"
              className="text-sm hover:text-primary transition-colors"
            >
              Packages
            </a>
            <a
              href="/validate"
              className="text-sm hover:text-primary transition-colors"
            >
              Validate
            </a>
            <a
              href="/void-mail-manager"
              className="text-sm hover:text-primary transition-colors"
            >
              Void Mail Manager
            </a>
            <a
              href="/apiDocs"
              className="text-sm hover:text-primary transition-colors"
            >
              API Docs
            </a>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/wallet">
                  <Button
                    variant="outline"
                    className="border-border hover:bg-card"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Wallet
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="border-border hover:bg-card"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-border hover:bg-card"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="border-border hover:bg-card"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="glow">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
