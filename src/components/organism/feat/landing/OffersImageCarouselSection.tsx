"use client";

import { OfferResponseDto } from "@/client";
import Button from "@/components/atom/Button";
import Title from "@/components/atom/Title";
import AppCarousel from "@/components/molecule/AppCarousel";
import PizzaCard from "@/components/molecule/PizzaCard";
import { IFoodType } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

interface OffersCarouselSectionProps {
  offers: OfferResponseDto[];
}

export default function OffersCarouselSection({
  offers,
}: OffersCarouselSectionProps) {
  const reviews = [...offers, ...offers, ...offers];
  return (
    <div className="">
      <div className="my-width mx-auto ">
        <AppCarousel
          items={reviews}
          carouselItemClassName="!basis-3/3"
          renderItem={(offer) => (
            <div
              className="my-width mx-auto gap-16 flex flex-col md:flex-row items-center justify-between py-10"
              key={offer.id}
            >
              <div className="w-132 max-w-full">
                <Title variant="h1" className="italic">
                  {offer.title}
                </Title>
                <p className="mt-3.5 mb-7 text-xl font-light">
                  {offer.description}
                </p>
                <Link href={"#menu"}>
                  <Button>Grab Now</Button>
                </Link>
              </div>
              {offer?.product && (
                <PizzaCard
                  imageUrl={offer.product?.mainImage?.url as string}
                  title={offer.product?.name}
                  description={offer.product?.description}
                  price={offer.product?.price}
                  crossedPrice={offer.product?.crossedPrice}
                  type={offer.product?.type as IFoodType}
                  variant="wide"
                />
              )}
            </div>
          )}
          className="py-10"
          contentClassName="py-5 -ml-1"
          autoplay
          autoplayDelay={10000}
        />
      </div>
    </div>
  );
}
