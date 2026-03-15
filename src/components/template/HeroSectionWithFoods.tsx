import React from "react";
import WavyText from "../atom/WavyText";
import { sanitizeHtml } from "@/lib/sanitize-html";

interface HeroSectionWithFoodsProps {
  title: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
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
            {title.prefix}{" "}
            <WavyText className="inline">{title.highlight}</WavyText>{" "}
            {title.suffix}
          </h1>
          <div
            className="w-199 max-w-full text-center text-xl text-[#000000BF]"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
          ></div>
        </div>
      </div>
      <div className="bg-tertiary">
        <div className="my-width mx-auto">{children}</div>
      </div>
    </section>
  );
}
