import { FOOD_TYPE, IFoodType } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import WavyText from "../atom/WavyText";
import PercentageOffBadge from "../atom/PercentageOffBadge";

interface IPizzaCard {
  title: string;
  description: string;
  price: number;
  crossedPrice?: number;
  imageUrl: string;
  type: IFoodType;
  percentageOff?: number;
}

export default function PizzaCard(props: IPizzaCard) {
  const {
    title,
    description,
    price,
    crossedPrice,
    imageUrl,
    type,
    percentageOff = 35,
  } = props;

  const baseStyle = type === FOOD_TYPE.VEG ? "bg-[#EBFFEE]" : "bg-[#FEE9E7]";
  return (
    <div className={cn(`w-74 rounded-2xl`, baseStyle)}>
      <div className="h-53.25 w-full bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center relative">
        <Image src={"/pizza-with-bg.jpg"} className="" alt={title} fill />
        {percentageOff && (
          <PercentageOffBadge
            percentageOff={59}
            className="absolute top-3.5 right-3.5"
          />
        )}
      </div>
      <div className="px-4.5 py-5 space-y-3.5">
        <h3 className="font-semibold text-lg leading-[130%]">{title}</h3>
        <p className="font-light text-sm leading-[150%]">{description}</p>
        <div className="pt-1">
          {crossedPrice && (
            <div className="italic text-sm text-brand line-through">
              Rs.{crossedPrice}
            </div>
          )}
          <div className="font-bold text-xl">Rs.{price}</div>
        </div>
      </div>
    </div>
  );
}
