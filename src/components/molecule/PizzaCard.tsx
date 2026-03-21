import { FOOD_TYPE, IFoodType } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Button from "../atom/Button";
import PercentageOffBadge from "../atom/PercentageOffBadge";
import ImagePlaceholder from "../atom/ImagePlaceholder";
import { Plus } from "lucide-react";

interface IPizzaCard {
  title: string;
  description: string;
  price: number;
  crossedPrice?: number | null;
  imageUrl: string;
  type: IFoodType;
  addonCount?: number;
  percentageOff?: number;
  variant?: "default" | "wide";
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
  sizeOptions?: Array<{ value: "SMALL" | "MEDIUM" | "LARGE"; label: string }>;
  selectedSize?: "SMALL" | "MEDIUM" | "LARGE";
  onSizeChange?: (size: "SMALL" | "MEDIUM" | "LARGE") => void;
}

export default function PizzaCard(props: IPizzaCard) {
  const {
    title,
    description,
    price,
    crossedPrice,
    imageUrl,
    type,
    addonCount = 0,
    percentageOff,
    variant = "default",
    ctaLabel = "Add to Cart",
    onCtaClick,
    ctaDisabled,
    sizeOptions,
    selectedSize,
    onSizeChange,
  } = props;

  const baseStyle = cn({
    "bg-[#EBFFEE]": type === FOOD_TYPE.VEG,
    "bg-[#FEE9E7]": type === FOOD_TYPE.NON_VEG,
    "w-74": variant === "default",
    "w-96": variant === "wide",
  });

  return (
    <div className={cn(` rounded-2xl h-full group`, baseStyle)}>
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

          {addonCount > 0 ? (
            <div className="inline-flex items-center rounded-full border border-brand/20 bg-white/70 px-2.5 py-1 text-xs font-semibold text-brand">
              {addonCount} add-on{addonCount > 1 ? "s" : ""} available
            </div>
          ) : null}

          {sizeOptions && sizeOptions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((option) => {
                const isActive = selectedSize === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onSizeChange?.(option.value)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold transition",
                      isActive
                        ? "border-brand bg-brand text-white"
                        : "border-slate-300 bg-white/70 text-slate-700 hover:border-brand",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        <div
          className={cn("pt-1 flex items-center justify-between", {
            "text-right": variant === "wide",
          })}
        >
          <div>
            {crossedPrice && crossedPrice > 0 ? (
              <div className="italic text-sm text-brand line-through">
                Rs.{crossedPrice}
              </div>
            ) : null}
            <div className="font-bold text-xl">Rs.{price}</div>
          </div>
          {onCtaClick ? (
            <Button
              className="w-fit group-hover:opacity-100 opacity-0 items-center gap-1"
              onClick={onCtaClick}
              disabled={ctaDisabled}
              variant={"outline"}
            >
              <Plus /> {ctaLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
