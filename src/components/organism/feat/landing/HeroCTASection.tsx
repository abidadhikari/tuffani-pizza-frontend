"use client";
import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { UseEmblaCarouselType } from "embla-carousel-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HeroCTASection() {
  const [api, setApi] = useState<UseEmblaCarouselType[1]>();

  useEffect(() => {
    if (!api || api?.scrollNext === undefined) return;
    const interval = setInterval(() => api?.scrollNext(), 8000); // every 5s
    return () => clearInterval(interval);
  }, [api]);

  const heroSectionList = [
    {
      title: <>Hold your crust,</>,
      wavyText: <>We&apos;re Blowing You Away!</>,
      description:
        "Subheading that sets up context, shares more info about the website, or generally gets people psyched to keep scrolling. ",
    },
    {
      title: <>Two Pizzas For</>,
      wavyText: <>The Price Of One!!</>,
      description:
        "Subheading that sets up context, shares more info about the website, or generally gets people psyched to keep scrolling. ",
    },
    {
      title: <>Order on Happy Hours</>,
      wavyText: <>To Get 25% Off on All Pizzas</>,
      description:
        "Subheading that sets up context, shares more info about the website, or generally gets people psyched to keep scrolling. ",
    },
  ];

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
            {heroSectionList.map((item, index) => {
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
            })}
          </CarouselContent>
        </Carousel>

        <Link href="#" className="z-100">
          <Button>Grab Now</Button>
        </Link>
      </div>
    </div>
  );
}
