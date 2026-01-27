"use client";

import AppCarousel from "@/components/molecule/AppCarousel";
import Image from "next/image";

export default function AboutUsImageCarouselSection() {
  const reviews = Array.from({ length: 10 });

  return (
    <div className="py-20">
      <div className="my-width mx-auto ">
        <AppCarousel
          items={reviews}
          centerScale
          renderItem={(_, index) => <RestroCard key={index} />}
          className="py-10"
          contentClassName="py-5 -ml-1"
          autoplay
        />
      </div>
    </div>
  );
}

const RestroCard = () => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <Image
        src="/restro.png"
        alt="restro"
        width={370}
        height={270}
        className="scale-110"
      />
    </div>
  );
};
