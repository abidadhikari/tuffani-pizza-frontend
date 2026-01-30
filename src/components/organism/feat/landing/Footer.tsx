import MyIcon from "@/components/atom/MyIcon";
import { Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-brand">
      <div className="my-width max-w-full mx-auto  grid  lg:grid-cols-3 gap-10 py-25">
        <div className="flex flex-col gap-2 [&>p]:text-white order-1">
          <h3 className="font-bold text-white text-2xl">Get In Touch</h3>
          <p>+012-345-6789</p>
          <p>Pizzalicious@contact.com</p>
          <p>9889 lorem ipsum street, Pellentesque, CA, USA</p>
        </div>
        <div className="order-3 lg:order-2 px-18.5 border-l border-r border-transparent lg:border-white flex flex-col items-center gap-5">
          <Image
            src="/logonew.png"
            alt="Logo"
            width={200}
            height={117}
            className=""
          />
          <div className="flex items-center gap-5">
            <Link href="#" className="text-white mx-2">
              <Twitter />
            </Link>
            <Link href="#" className="text-white mx-2">
              <Instagram />
            </Link>
            <Link href="#" className="text-white mx-2">
              <MyIcon icon="ic:baseline-tiktok" className="size-7" />
            </Link>
            <Link href="#" className="text-white mx-2">
              <MyIcon icon="mingcute:medium-fill" className="size-7" />
            </Link>
          </div>
        </div>
        <div className="order-2 md:order-3 flex lg:justify-end items-center">
          <div className="flex flex-col gap-2 [&>p]:text-white ">
            <h3 className="font-bold text-white text-2xl">Opening Hours</h3>
            <p>Monday/Friday 9:00-23:00</p>
            <p>Saturday 10:00-21:00</p>
            <p>Weekend Closed</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white py-3 text-center text-white ">
        &copy; {new Date().getFullYear()} Tuffani Pizza. All rights reserved.
      </div>
    </footer>
  );
}
