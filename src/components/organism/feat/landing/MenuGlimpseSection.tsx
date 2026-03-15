import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import PizzaShowcaseCard from "@/components/molecule/PizzaShowcaseCard";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { IStaticContent } from "@/types/staticContent.type";
import Link from "next/link";
import React, { forwardRef } from "react";

type Props = {
  targetRef: React.RefObject<HTMLDivElement | null>;
  staticContent: IStaticContent;
};

const MenuGlimpseSection = forwardRef<HTMLDivElement, Props>(
  ({ targetRef, staticContent }, ref) => {
    const rawData = fetchStaticContent(
      STATIC_CONTENT_KEYS.MENU_GLIMPSE_SECTION,
      staticContent,
    );

    return (
      <div
        className="flex items-center justify-center flex-col py-15 md:pt-40 pb-16"
        ref={ref}
      >
        <div className="flex flex-col w-194.25 max-w-[90%] text-center space-y-5">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            {rawData?.value?.title?.prefix}{" "}
            <WavyText className="inline">
              {rawData?.value?.title?.highlight}
            </WavyText>{" "}
            {rawData?.value?.title?.suffix}
          </h2>
          <div
            className="font-light text-lg md:text-xl mb-8"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(rawData?.value?.description),
            }}
          ></div>
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
