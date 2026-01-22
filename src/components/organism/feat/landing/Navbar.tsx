import Button from "@/components/atom/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="p-4 fixed top-0 left-0 w-full z-100">
      <section className="flex justify-between items-center w-300 max-w-full mx-auto">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={120} height={40} />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-12 [&>li>a]:font-medium">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
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
