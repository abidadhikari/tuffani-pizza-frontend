import Footer from "@/components/organism/feat/landing/Footer";
import Navbar from "@/components/organism/feat/landing/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
