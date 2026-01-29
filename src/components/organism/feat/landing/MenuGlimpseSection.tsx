import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import PizzaShowcaseCard from "@/components/molecule/PizzaShowcaseCard";
import Link from "next/link";
import React, { forwardRef } from "react";

type Props = {
  targetRef: React.RefObject<HTMLDivElement | null>;
};

const MenuGlimpseSection = forwardRef<HTMLDivElement, Props>(
  ({ targetRef }, ref) => {
    return (
      <div
        className="flex items-center justify-center flex-col py-15 md:pt-40 pb-16"
        ref={ref}
      >
        <div className="flex flex-col w-194.25 max-w-[90%] text-center space-y-5">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            Your <WavyText className="inline">Delicious Pizza Starts</WavyText>{" "}
            Here!
          </h2>
          <p className="font-light text-lg md:text-xl mb-8">
            Subheading that sets up context, shares more info about the website,
            or generally gets people psyched to keep scrolling.{" "}
          </p>
        </div>
        <div className="grid  lg:grid-cols-3 gap-5 w-300 max-w-[90%] mx-auto mb-13">
          <PizzaShowcaseCard
            title="Tufani Veg Pizza"
            description="Fresh seasonal vegetables, rich tomato sauce, and mozzarella cheese on a crispy base."
            imageUrl="/Pizza.png"
            variant="veg"
          />
          <PizzaShowcaseCard
            title="Tufani Non-Veg Pizza"
            description="Loaded with chicken toppings, mozzarella cheese, and our special Tufani sauce."
            targetRef={targetRef}
            variant="non-veg"
          />
          <PizzaShowcaseCard
            title="Chicken Peri Peri Pizza"
            description="Loaded with chicken toppings, mozzarella cheese, and our special Tufani sauce."
            imageUrl="/Pizza.png"
            variant="yellow"
          />
        </div>
        <Link href="/menu">
          <Button>Explore the Full Menu</Button>
        </Link>
      </div>
    );
  },
);

MenuGlimpseSection.displayName = "MenuGlimpseSection";

export default MenuGlimpseSection;
