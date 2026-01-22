import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import PizzaShowcaseCard from "@/components/molecule/PizzaShowcaseCard";
import React, { forwardRef } from "react";

type Props = {
  targetRef: React.RefObject<HTMLDivElement | null>;
};

const MenuGlimpseSection = forwardRef<HTMLDivElement, Props>(
  ({ targetRef }, ref) => {
    return (
      <div
        className="flex items-center justify-center flex-col  pt-40 pb-16"
        ref={ref}
      >
        <div className="flex flex-col w-194.25 text-center space-y-5">
          <h2 className="text-4xl font-extrabold">
            Your <WavyText className="inline">Delicious Pizza Starts</WavyText>{" "}
            Here!
          </h2>
          <p className="font-light text-xl mb-8">
            Subheading that sets up context, shares more info about the website,
            or generally gets people psyched to keep scrolling.{" "}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5 w-300 max-w-full mx-auto mb-13">
          <PizzaShowcaseCard
            title="Vegetable Pizza"
            description="A storm of crispy pepperoni and double mozzarella."
            imageUrl="/Pizza.png"
          />
          <PizzaShowcaseCard
            title="Vegetable Pizza"
            description="A storm of crispy pepperoni and double mozzarella."
            targetRef={targetRef}
          />
          <PizzaShowcaseCard
            title="Vegetable Pizza"
            description="A storm of crispy pepperoni and double mozzarella."
            imageUrl="/Pizza.png"
          />
        </div>
        <div>
          <Button>Explore the Full Menu</Button>
        </div>
      </div>
    );
  },
);

MenuGlimpseSection.displayName = "MenuGlimpseSection";

export default MenuGlimpseSection;
