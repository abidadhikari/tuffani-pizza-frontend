"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface AppCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  centerScale?: boolean;
  contentClassName?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
}

const LOOP_MULTIPLIER = 5;

export default function AppCarousel<T>({
  items,
  renderItem,
  className,
  centerScale = false,
  contentClassName,
  autoplay = false,
  autoplayDelay = 3000,
}: AppCarouselProps<T>) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Duplicate items for fake infinity
  const loopedItems = React.useMemo(
    () => Array.from({ length: LOOP_MULTIPLIER }).flatMap(() => items),
    [items],
  );

  const middleIndex = Math.floor(loopedItems.length / 2);

  /** ---------------------------
   * Center the carousel initially
   ----------------------------*/
  React.useEffect(() => {
    if (!api) return;
    api.scrollTo(middleIndex, false);
  }, [api, middleIndex]);

  /** ---------------------------
   * Track active (real) index
   ----------------------------*/
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap() % items.length);
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, items.length]);

  /** ---------------------------
   * Autoplay
   ----------------------------*/
  React.useEffect(() => {
    if (!api || !autoplay) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [api, autoplay, autoplayDelay]);

  return (
    <div className={cn("relative overflow-visible", className)}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
          containScroll: false,
        }}
      >
        <CarouselContent className={cn("-ml-7.5", contentClassName)}>
          {loopedItems.map((item, index) => {
            const realIndex = index % items.length;
            const isActive = realIndex === selectedIndex;

            return (
              <CarouselItem
                key={index}
                className={cn(
                  `
                  pl-7.5
                  basis-full
                  md:basis-1/2
                  lg:basis-1/3
                  transition-all duration-500 ease-out
                  `,
                  centerScale &&
                    (isActive
                      ? "scale-110 z-20 opacity-100"
                      : "scale-90 opacity-60"),
                )}
              >
                {renderItem(item, realIndex)}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
