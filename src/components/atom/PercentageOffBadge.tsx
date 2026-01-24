import React from "react";
import WavyText from "./WavyText";

interface IPercentageOffBadge {
  percentageOff: number;
  className?: string;
}

export default function PercentageOffBadge({
  percentageOff,
  className,
}: IPercentageOffBadge) {
  return (
    <div
      className={className}
      style={{
        textShadow:
          "1.5px 0px #ff383c,0px 1.5px #ff383c,-1.5px 0px #ff383c,0px -1.5px #ff383c",
      }}
    >
      <WavyText className="text-white    text-[22.85px] flex flex-col">
        {percentageOff}% <span className="text-sm -mt-3">OFF</span>
      </WavyText>
    </div>
  );
}
