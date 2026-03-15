"use client";

import AppCarousel from "@/components/molecule/AppCarousel";
import Image from "next/image";

interface AboutUsImageCarouselSectionProps {
  images: { url: string; title: string }[];
}

export default function AboutUsImageCarouselSection({
  images,
}: AboutUsImageCarouselSectionProps) {
  const reviews = [
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
  ];
  return (
    <div className="py-20">
      <div className="my-width mx-auto ">
        <AppCarousel
          items={reviews}
          centerScale
          renderItem={(item, index) => (
            <RestroCard
              key={index}
              url={item?.url || ""}
              title={item?.title || ""}
            />
          )}
          className="py-10"
          contentClassName="py-5 -ml-1"
          autoplay
        />
      </div>
    </div>
  );
}

const RestroCard = ({ url, title }: { url: string; title: string }) => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <Image
        src={url}
        alt={title}
        width={370}
        height={270}
        className="scale-110"
      />
    </div>
  );
};
