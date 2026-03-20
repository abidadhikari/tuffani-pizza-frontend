import Home from "@/components/organism/feat/landing/HomePage";
import {
  getStaticPageData,
  getTestimonials,
} from "@/hooks/services/public-services";
import { Metadata } from "next";
import React from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home - Tufani Pizza",
  description:
    "Discover the story behind Tufani Pizza, where passion meets flavor. Learn about our journey, values, and commitment to delivering the best pizza experience.",
};

export default async function HomePage() {
  const staticContent = await getStaticPageData();
  const testimonials = await getTestimonials();

  return <Home staticContent={staticContent} testimonials={testimonials} />;
}
