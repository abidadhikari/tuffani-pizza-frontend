import MyIcon from "@/components/atom/MyIcon";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-brand">
      <div className="my-width max-w-full mx-auto  grid  lg:grid-cols-3 gap-10 py-25">
        <div className="flex flex-col gap-2 [&>p]:text-white order-1">
          <h3 className="font-bold text-white text-2xl">Get In Touch</h3>
          <p>+977 9744411211 , 01-5312904</p>
          <p>tufanipizza@gmail.com</p>
          <p>चक्कु बक्कु गल्लि, Kathmandu oppostite to K&K college</p>
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
            {/* <Link href="#" className="text-white mx-2">
              <Twitter />
            </Link> */}
            <Link
              href="https://www.instagram.com/tufanipizza"
              target="_blank"
              className="text-white mx-2"
            >
              <Instagram />
            </Link>
            <Link
              href="https://www.tiktok.com/@tufani.pizza"
              target="_blank"
              className="text-white mx-2"
            >
              <MyIcon icon="ic:baseline-tiktok" className="size-7" />
            </Link>
            <Link
              href="https://www.facebook.com/share/1Gyu2kBFgF/?mibextid=wwXIfr"
              target="_blank"
              className="text-white mx-2"
            >
              {/* <MyIcon icon="mingcute:medium-fill" className="size-7" /> */}
              <Facebook />
            </Link>
          </div>
        </div>
        <div className="order-2 md:order-3 flex lg:justify-end items-center">
          <div className="flex flex-col gap-2 [&>p]:text-white ">
            <h3 className="font-bold text-white text-2xl">Opening Hours</h3>
            <p>Open 7 days a week</p>
            <p>9:00 am to 9:00 pm</p>
            <p className="h-10"></p>
          </div>
        </div>
      </div>
      <div className="border-t border-white py-3 text-center text-white ">
        &copy; {new Date().getFullYear()} Tufani Pizza. All rights reserved.
      </div>
    </footer>
  );
}
