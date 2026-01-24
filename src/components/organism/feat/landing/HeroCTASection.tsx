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

  // Autoplay logic
  useEffect(() => {
    if (!api || api?.scrollNext === undefined) return;
    const interval = setInterval(() => api?.scrollNext(), 8000); // every 5s
    return () => clearInterval(interval);
  }, [api]);

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
            {[...Array(5)].map((_, index) => {
              return (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-extrabold text-[48px] text-center mb-4">
                      <h1>Hold your crust,</h1>
                      <WavyText>We&apos;re Blowing You Away!</WavyText>
                    </div>
                    <p className="w-195 text-center font-light text-xl mb-8">
                      Subheading that sets up context, shares more info about
                      the website, or generally gets people psyched to keep
                      scrolling.{" "}
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
