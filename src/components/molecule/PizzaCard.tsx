import { FOOD_TYPE, IFoodType } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PercentageOffBadge from "../atom/PercentageOffBadge";
import ImagePlaceholder from "../atom/ImagePlaceholder";

interface IPizzaCard {
  title: string;
  description: string;
  price: number;
  crossedPrice?: number | null;
  imageUrl: string;
  type: IFoodType;
  percentageOff?: number;
  variant?: "default" | "wide";
}

export default function PizzaCard(props: IPizzaCard) {
  const {
    title,
    description,
    price,
    crossedPrice,
    imageUrl,
    type,
    percentageOff,
    variant = "default",
  } = props;

  const baseStyle = cn({
    "bg-[#EBFFEE]": type === FOOD_TYPE.VEG,
    "bg-[#FEE9E7]": type === FOOD_TYPE.NON_VEG,
    "w-74": variant === "default",
    "w-96": variant === "wide",
  });

  return (
    <div className={cn(` rounded-2xl h-full`, baseStyle)}>
      <div className="h-53.25 w-full bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center relative">
        {imageUrl ? (
          <Image src={imageUrl} className="object-cover" alt={title} fill />
        ) : (
          <ImagePlaceholder className="h-53.25 w-full" />
        )}

        {percentageOff && (
          <PercentageOffBadge
            percentageOff={Math.round(percentageOff)}
            className="absolute top-3.5 right-3.5"
          />
        )}
      </div>
      <div
        className={cn("px-4.5 py-5 space-y-3.5", {
          "max-w-full w-74": variant === "default",
          "flex flex-row": variant === "wide",
        })}
      >
        <div className="space-y-3.5">
          <h3 className="font-semibold text-lg leading-[130%]">{title}</h3>
          <p className="font-light text-sm leading-[150%]">{description}</p>
        </div>
        <div className={cn("pt-1", { "text-right": variant === "wide" })}>
          {crossedPrice && crossedPrice > 0 ? (
            <div className="italic text-sm text-brand line-through">
              Rs.{crossedPrice}
            </div>
          ) : null}
          <div className="font-bold text-xl">Rs.{price}</div>
        </div>
      </div>
    </div>
  );
}
