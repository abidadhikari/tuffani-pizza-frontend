"use client";
import Button from "@/components/atom/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (headerRef.current) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          headerRef.current?.classList.add(
            "backdrop-blur-sm",
            "bg-white/40",
            "shadow-md",
          );
        } else {
          headerRef.current?.classList.remove(
            "backdrop-blur-sm",
            "bg-white/40",
            "shadow-md",
          );
        }
      });
    }
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <header className="p-4 fixed top-0 left-0 w-full z-1000000" ref={headerRef}>
      <section className="flex justify-between items-center w-300 max-w-full mx-auto">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={120} height={40} />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-12 ">
            <li>
              <Link
                href="/"
                className={
                  pathname === "/" ? " navlink active-navlink" : "navlink"
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className={
                  pathname === "/menu" ? " navlink active-navlink" : "navlink"
                }
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className={
                  pathname === "/about-us"
                    ? " navlink active-navlink"
                    : "navlink"
                }
              >
                About Us
              </Link>
            </li>
            <li>
              <Button>Contact Us</Button>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
