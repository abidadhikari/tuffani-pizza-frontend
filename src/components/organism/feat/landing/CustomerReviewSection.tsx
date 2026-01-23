import WavyText from "@/components/atom/WavyText";
import CustomerReviewCard from "@/components/molecule/CustomerReviewCard";
import React from "react";

export default function CustomerReviewSection() {
  return (
    <div className="py-20">
      <h2 className="font-bold text-3xl mb-4 text-center">
        What our{" "}
        <WavyText className="inline">Customers are Saying</WavyText>{" "}
      </h2>
      <p className="text-light text-[#828282] text-lg mb-16 text-center w-194.25 mx-auto">
        Subheading that sets up context, shares more info about the website, or
        generally gets people psyched to keep scrolling.{" "}
      </p>
      <div className="my-width mx-auto grid-cols-3 grid gap-10">
        {[...Array(3)].map((_, index) => (
          <CustomerReviewCard key={index} />
        ))}
      </div>
    </div>
  );
}
