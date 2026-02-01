import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function HeroFoods() {
  const heroFoodImage = [
    {
      src: "/mushroom.png",
      alt: "mushroom",
      className: "bottom-[-80px] left-[-40px] scale-120 blur-[1px] size-40",
    },
    {
      src: "/sausage.png",
      alt: "sausage",
      className: "bottom-[-80px] right-[-40px] scale-150 blur-[1px]  size-50",
    },
    {
      src: "/ham.png",
      alt: "ham",
      className: "top-1/2 right-0 translate-y-[-60%] translate-x-1/2 size-60 ",
    },
    {
      src: "/basil1.png",
      alt: "basil",
      className: "bottom-[10vh] left-[10vw] scale-75 size-40",
    },
    {
      src: "/basil2.png",
      alt: "basil",
      className: "bottom-[10vh] right-[10vw] scale-75 w-[322px] rotate-30 ",
    },
    {
      src: "/mushroom.png",
      alt: "mushroom",
      className: "bottom-[30vh] right-[10vw] scale-120",
    },
    {
      src: "/tomato.png",
      alt: "tomato",
      className: "top-[30vh] left-[10vw] scale-120",
    },
    {
      src: "/pork.png",
      alt: "pork",
      className: "top-[45vh] left-[12vw] scale-60 blur-[4px]",
    },
  ];
  return (
    <>
      {heroFoodImage.map((item, index) => (
        <Image
          src={item.src}
          alt={item.alt}
          width={100}
          height={100}
          key={index}
          priority
          className={cn(
            "absolute hidden z-100 mdlg:z-1 lg:block  animate-bounce-slow",
            item.className,
          )}
        />
      ))}
    </>
  );
}
