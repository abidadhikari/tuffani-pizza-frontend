import React from "react";
import WavyText from "../atom/WavyText";

interface HeroSectionWithFoodsProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function HeroSectionWithFoods(props: HeroSectionWithFoodsProps) {
  const { title, description, children } = props;
  return (
    <section>
      <div className="">
        <div className="my-width mx-auto flex flex-col items-center gap-4 py-40">
          <h1 className="text-5xl">
            <WavyText>{title}</WavyText>
          </h1>
          <p className="w-199 max-w-full text-center text-xl text-[#000000BF]">
            {description}
          </p>
        </div>
      </div>
      <div className="bg-tertiary">
        <div className="my-width mx-auto">{children}</div>
      </div>
    </section>
  );
}
