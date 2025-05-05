"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Tournaments", href: "/tournaments" },
  { name: "Stages", href: "/stages" },
  { name: "Matches", href: "/matches" },
  { name: "Match Control", href: "/control-match" },
  { name: "Audience Display", href: "/audience-display" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  
  // Only show user-dependent UI after hydration to avoid mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl text-primary">RBA</span>
              <span className="hidden md:block text-lg">Robotics Tournament Manager</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname?.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-accent hover:text-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isMounted && (
                <>
                  {!user ? (
                    <Link
                      href="/login"
                      className="px-3 py-1.5 border border-primary/30 text-primary hover:bg-primary/10 rounded text-sm font-medium transition-colors"
                    >
                      Sign in
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground mr-1">Signed in as</span>
                        <span className="font-medium">{user?.username}</span>
                      </div>
                      <button
                        onClick={() => logout()}
                        className="px-3 py-1.5 border border-destructive/30 text-destructive hover:bg-destructive/10 rounded text-sm font-medium transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </>
              )}
              {!isMounted && (
                <div className="w-[200px] h-[32px]"></div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenu
              navigationItems={navigationItems}
              pathname={pathname}
              user={isMounted ? user : null}
              logout={logout}
              isMounted={isMounted}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ navigationItems, pathname, user, logout, isMounted }: {
  navigationItems: { name: string; href: string }[];
  pathname: string | null;
  user: any;
  logout: () => void;
  isMounted: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-accent focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        {/* Menu icon */}
        <svg
          className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        {/* X icon */}
        <svg
          className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 bg-background border-b shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname?.startsWith(item.href));
                
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-accent hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-4 pb-3 border-t border-accent/20">
              {isMounted && (
                <>
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-base font-medium text-foreground">
                        {user.username}
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign in
                    </Link>
                  )}
                </>
              )}
              {!isMounted && (
                <div className="h-[40px]"></div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}