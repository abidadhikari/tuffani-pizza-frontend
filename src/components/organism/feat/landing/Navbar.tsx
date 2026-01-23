"use client";
import Button from "@/components/atom/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  console.log("Current Path:", pathname);

  return (
    <header className="p-4 fixed top-0 left-0 w-full z-100">
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
              <Button size={"lg"}>Contact Us</Button>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
