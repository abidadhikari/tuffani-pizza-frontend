import React from "react";

export default function CustomerReviewCard() {
  return (
    <div className="bg-brand-yellow rounded-3xl p-10 px-8.5 w-100">
      <h3 className="font-bold text-2xl mb-3.5 leading-[150%]">
        Best pizza in town 😋{" "}
      </h3>
      <p className="text-light text-[#828282] text-base mb-8.5">
        Subheading that sets up context, shares more info about the website, or
        generally gets people psyched to keep scrolling.{" "}
      </p>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-gray-400 size-15"></div>
        <div>
          <div className="font-medium">Olivia Wilson</div>
          <div className="font-light">Regular Customer</div>
        </div>
      </div>
    </div>
  );
}
