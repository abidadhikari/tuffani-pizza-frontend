import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { forwardRef } from "react";

interface PizzaShowcaseCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  targetRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

const PizzaShowcaseCard = forwardRef<HTMLDivElement, PizzaShowcaseCardProps>(
  ({ title, description, imageUrl, targetRef, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center flex-col", className)}>
        <div className="z-2">
          <div className="size-70 rounded-full z-100" ref={targetRef}>
            {imageUrl && (
              <Image src={imageUrl} alt="Pizza" width={280} height={280} />
            )}
          </div>
        </div>

        <div className="bg-brand-green rounded-4xl pt-36 -mt-36 z-1 px-5 pb-5">
          <div className="flex flex-col items-center justify-center text-center pt-2 space-y-4">
            <h3 className="text-2xl font-extrabold">{title}</h3>
            <p className="text-xl text-[#404040]">{description}</p>
          </div>
        </div>
      </div>
    );
  },
);

PizzaShowcaseCard.displayName = "PizzaShowcaseCard";

export default PizzaShowcaseCard;
