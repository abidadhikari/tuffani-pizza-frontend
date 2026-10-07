import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "New Baneshwor Menu | Tufani Pizza",
  description: "View the official menu for Tufani Pizza New Baneshwor branch.",
};

const MENU_IMAGES = [
  "/images/new-baneshwor/1.jpg",
  "/images/new-baneshwor/2.jpg",
  "/images/new-baneshwor/3.jpg",
  "/images/new-baneshwor/4.jpg",
  "/images/new-baneshwor/5.jpg",
  "/images/new-baneshwor/6.jpg",
  "/images/new-baneshwor/7.jpg",
  "/images/new-baneshwor/8.jpg",
];

export default function NewBaneshworMenuPage() {
  return (
    <div className="bg-[#E22825] flex items-center flex-col min-h-screen relative">
      {/* Floating button to view / download PDF */}
      {/* <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <a
          href="/pdf/menu.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/85 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Open or download official menu PDF"
        >
          <FileText className="w-4 h-4 text-[#ff383c]" />
          <span>View PDF Menu</span>
          <Download className="w-3.5 h-3.5 text-neutral-400" />
        </a>
      </div> */}

      {/* Stacked Menu Images matching external page layout */}
      {MENU_IMAGES.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Tufani Pizza New Baneshwor Menu page ${index + 1}`}
          width={1000}
          height={1000}
          priority={index < 2}
        />
      ))}
    </div>
  );
}
