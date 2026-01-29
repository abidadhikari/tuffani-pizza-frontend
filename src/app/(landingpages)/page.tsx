import Home from "@/components/organism/feat/landing/HomePage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home - Tufani Pizza",
  description:
    "Discover the story behind Tufani Pizza, where passion meets flavor. Learn about our journey, values, and commitment to delivering the best pizza experience.",
};

export default function HomePage() {
  return <Home />;
}
