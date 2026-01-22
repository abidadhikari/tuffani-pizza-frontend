import Button from "@/components/atom/Button";
import WavyText from "@/components/atom/WavyText";
import Link from "next/link";
import React from "react";

export default function HeroCTASection() {
  return (
    <div className=" pt-40">
      <div className="flex flex-col items-center justify-center">
        <div className="font-extrabold text-[48px] text-center mb-4">
          <h1>Hold your crust,</h1>
          <WavyText>We&apos;re Blowing You Away!</WavyText>
        </div>
        <p className="w-195 text-center font-light text-xl mb-8">
          Subheading that sets up context, shares more info about the website,
          or generally gets people psyched to keep scrolling.{" "}
        </p>
        <Link href="#">
          <Button>Grab Now</Button>
        </Link>
      </div>
    </div>
  );
}
