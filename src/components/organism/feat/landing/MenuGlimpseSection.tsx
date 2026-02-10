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
            Serving the best pizzas in Baneshwor and Kathmandu, made with juicy
            chicken, fresh veggies, melted cheese, and irresistible flavors
            every day.
          </p>
        </div>
        <div className="grid  lg:grid-cols-3 gap-5 w-300 max-w-[90%] mx-auto mb-13">
          <PizzaShowcaseCard
            title="तुफानी Veg Pizza"
            description="Paneer and seasoned mixed vegetable,rich tomato sauce, and mozzarella cheese on a crispy base, topped with capsicum and onion."
            imageUrl="/Pizza.png"
            variant="veg"
          />
          <PizzaShowcaseCard
            title="तुफानी Non-Veg Pizza"
            description="Grilled smoked chicken and sausage toppings with mozzarella cheese, onion, capsium and our special तुफानी sauce.
"
            targetRef={targetRef}
            variant="non-veg"
          />
          <PizzaShowcaseCard
            title="Super तुफानी"
            description="Spicy grilled chicken sandheko, chicken ham, spanish, onion, capsium, green chilli, mozzarella cheese and a smoky flavour."
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
