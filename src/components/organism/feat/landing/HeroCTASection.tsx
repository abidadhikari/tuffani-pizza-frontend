"use client";
import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetStaticContent } from "@/hooks/services/static-content/useGetStaticContent";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { IStaticContent } from "@/types/staticContent.type";
import { UseEmblaCarouselType } from "embla-carousel-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HeroCTASection(props: {
  staticContent: IStaticContent;
}) {
  const { staticContent } = props;
  const [api, setApi] = useState<UseEmblaCarouselType[1]>();

  useEffect(() => {
    if (!api || api?.scrollNext === undefined) return;
    const interval = setInterval(() => api?.scrollNext(), 8000);
    return () => clearInterval(interval);
  }, [api]);

  const rawData = fetchStaticContent(
    STATIC_CONTENT_KEYS.HERO_SECTION,
    staticContent,
  );

  const heroSectionList = rawData?.value?.map((item: any) => ({
    title: item?.title?.prefix,
    wavyText: item?.title?.highlight,
    description: item.description,
  }));

  return (
    <div className=" pt-40">
      <div className="flex flex-col items-center justify-center">
        <Carousel
          opts={{
            loop: true,
            active: true,
          }}
          setApi={(emblaApi: UseEmblaCarouselType[1]) => setApi(emblaApi)}
        >
          <CarouselContent>
            {heroSectionList?.map(
              (
                item: {
                  title: string;
                  wavyText: string;
                  description: string;
                },
                index: number,
              ) => {
                return (
                  <CarouselItem key={index}>
                    <div className="flex flex-col items-center justify-center">
                      <div className="font-extrabold max-w-[95vw] text-2xl md:text-[48px] text-center mb-4">
                        <h1 className="italic">{item.title}</h1>
                        <WavyText>{item.wavyText}</WavyText>
                      </div>
                      <p className="w-[95vw] md:w-195 text-center font-light text-xl mb-8">
                        {item.description}
                      </p>
                    </div>
                  </CarouselItem>
                );
              },
            )}
          </CarouselContent>
        </Carousel>

        <Link href="/menu" className="z-100">
          <Button>Grab Now</Button>
        </Link>
      </div>
    </div>
  );
}
