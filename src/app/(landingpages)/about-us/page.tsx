import WavyText from "@/components/atom/WavyText";
import ChefSection from "@/components/organism/feat/landing/ChefSection";
import HeroSectionWithFoods from "@/components/template/HeroSectionWithFoods";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <section>
      <HeroSectionWithFoods
        title="About Us"
        description=" From light breezes to category 5 cravings, explore our storm-baked crusts and signature toppings. Your delicious pizza starts here."
      >
        <div className="flex gap-5 py-16">
          <Image
            src="/pizzaGroup.png"
            alt="Pizza Group"
            width={580}
            height={507}
            // className="mx-auto py-20"
          />
          <div className="flex flex-1 items-center justify-center flex-col">
            <div className="w-135.75 space-y-5">
              <h2 className="italic text-5xl font-bold leading-[130%]">
                Where Every Slice{" "}
                <WavyText className="">Tells a Story</WavyText>
              </h2>
              <p className="font-light leading-[130%] ">
                From our ovens to your table, every step is inspired by passion,
                care, and a promise to deliver more than just great taste. we
                proudly live up to that name by offering over 50 different
                flavors of pizza with 5 unique crust options.
              </p>
            </div>
          </div>
        </div>
      </HeroSectionWithFoods>

      <section className="pt-36">
        <div className="my-width mx-auto flex justify-center divide-x ">
          {[
            { value: "10+", label: "Years of Experience" },
            { value: "450K+", label: "Happy Customers" },
            { value: "50+", label: "Pizza Varieties" },
            { value: "4.9", label: "Average Rating" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between px-20"
            >
              <WavyText className="text-4xl font-bold ">{item.value}</WavyText>
              <div
                className="text-lg font-medium w-30
              text-black/75 text-center mt-2 leading-[120%]"
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ChefSection className="bg-white" />

      <div className="bg-[#FFFBEB]">
        <div className="my-width">
          <div className="italic w-111">
            Join the <WavyText className="inline">Tufani Pizza</WavyText> Family
          </div>
        </div>
      </div>
    </section>
  );
}
