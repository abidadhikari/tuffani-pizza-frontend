import Image from "next/image";
import React from "react";

interface CustomerReviewCardProps {
  title: string;
  review: string;
  reviewer: string;
  designation: string;
  image: string | undefined | null;
}

export default function CustomerReviewCard({
  title,
  review,
  reviewer,
  designation,
  image,
}: CustomerReviewCardProps) {
  return (
    <div className="bg-brand-yellow rounded-3xl p-10 px-8.5 w-full h-full ">
      <h3 className="font-bold text-2xl mb-3.5 leading-[150%]">{title}</h3>
      <p className="text-light text-[#828282] text-base mb-8.5">{review}</p>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-gray-400 size-15 overflow-hidden">
          <Image
            src={
              image !== undefined && image !== null && image?.length !== 0
                ? image
                : "/images/dummyProfile.png"
            }
            alt=""
            className="size-15 "
            height={60}
            width={60}
          />
        </div>
        <div>
          <div className="font-medium">{reviewer}</div>
          <div className="font-light">{designation}</div>
        </div>
      </div>
    </div>
  );
}
