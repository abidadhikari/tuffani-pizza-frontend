import WavyText from "@/components/atom/WavyText";
import CustomerReviewCard from "@/components/molecule/CustomerReviewCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

export default function CustomerReviewSection() {
  return (
    <div className="py-20">
      <h2 className="font-bold text-3xl mb-4 text-center">
        What our <WavyText className="inline">Customers are Saying</WavyText>
      </h2>

      <p className="text-light text-[#828282] text-lg mb-16 text-center w-194.25 mx-auto">
        Subheading that sets up context, shares more info about the website, or
        generally gets people psyched to keep scrolling.
      </p>

      <div className="my-width mx-auto relative overflow-visible">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-[30px]">
            {[...Array(10)].map((_, index) => (
              <CarouselItem
                key={index}
                className="
                  pl-[30px]
                  basis-full        /* small: 1 */
                  md:basis-1/2      /* medium: 2 */
                  lg:basis-1/3      /* large: 3 */
                "
              >
                <CustomerReviewCard />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
