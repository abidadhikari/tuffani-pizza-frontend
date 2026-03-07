"use client";

import Button from "@/components/atom/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/storeHook";
import { useGetMe } from "@/hooks/services/users/useGetMe";
import { UserCircle2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/services/auth/useLogout";

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const {} = useGetMe();
  const { mutate: logout } = useLogout();
  const { user } = useAppSelector("auth");

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [, startTransition] = useTransition();

  const lastScrollY = useRef(0);

  /* ------------------ Scroll Logic (UP = show, DOWN = hide) ------------------ */
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at top
      if (currentScrollY <= 0) {
        setIsVisible(true);
      }
      // Scrolling down → hide
      else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }
      // Scrolling up → show
      else {
        setIsVisible(true);
      }

      // Blur effect
      if (headerRef.current) {
        if (currentScrollY > 50) {
          headerRef.current.classList.add(
            "backdrop-blur-sm",
            "bg-white/40",
            "shadow-md",
          );
        } else {
          headerRef.current.classList.remove(
            "backdrop-blur-sm",
            "bg-white/40",
            "shadow-md",
          );
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ------------------ Close menu on route change ------------------ */
  useEffect(() => {
    startTransition(() => {
      setIsOpen(false);
    });
  }, [pathname]);

  /* ------------------ Lock body scroll when menu open ------------------ */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        `
        fixed top-0 left-0 w-full z-[1000000]
        transition-all duration-300 ease-in-out
        `,
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full",
      )}
    >
      <section className="flex justify-between items-center px-4 py-4 w-300 max-w-full mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image src="/logonew.png" alt="Logo" width={120} height={40} />
        </Link>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden relative z-[1000001] flex flex-col gap-1.5"
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-black transition",
              isOpen && "rotate-45 translate-y-2",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-black transition",
              isOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-black transition",
              isOpen && "-rotate-45 -translate-y-2",
            )}
          />
        </button>

        {/* Navigation */}
        <nav
          className={cn(
            `
            fixed sm:static top-0 left-0
            h-screen sm:h-auto
            w-screen sm:w-auto
            bg-white sm:bg-transparent
            flex items-center justify-center
            transition-transform duration-300
            `,
            isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0",
          )}
        >
          <ul className="flex flex-col sm:flex-row items-center gap-12">
            <li>
              <Link
                href="/"
                className={cn("navlink", pathname === "/" && "active-navlink")}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/menu"
                className={cn(
                  "navlink",
                  pathname === "/menu" && "active-navlink",
                )}
              >
                Menu
              </Link>
            </li>

            <li>
              <Link
                href="/about-us"
                className={cn(
                  "navlink",
                  pathname === "/about-us" && "active-navlink",
                )}
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/blog"
                className={cn(
                  "navlink",
                  pathname.startsWith("/blog") && "active-navlink",
                )}
              >
                Blogs
              </Link>
            </li>

            <li>
              <Link
                href="/contact-us"
                className={cn(
                  "navlink",
                  pathname.startsWith("/contact-us") && "active-navlink",
                )}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="flex flex-col sm:flex-row items-center gap-12">
          <li>
            {user ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-0 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 font-semibold">
                      <UserCircle2 /> {user.name}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/profile">Cart</Link>
              </div>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </li>
        </ul>
      </section>
    </header>
  );
}
