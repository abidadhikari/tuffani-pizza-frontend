import WavyText from "@/components/atom/WavyText";
import AboutUsImageCarouselSection from "@/components/organism/feat/landing/AboutUsImageCarouselSection";
import ChefSection from "@/components/organism/feat/landing/ChefSection";
import HeroSectionWithFoods from "@/components/template/HeroSectionWithFoods";
import { Metadata } from "next";

import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us - Tufani Pizza",
  description:
    "Discover the story behind Tufani Pizza, where passion meets flavor. Learn about our journey, values, and commitment to delivering the best pizza experience.",
};

export default function AboutUsPage() {
  return (
    <section>
      <HeroSectionWithFoods
        title="About Us"
        description={
          "Welcome to Tuffani, one of the most loved fast food and pizza cafes in Baneshwor, Kathmandu. We created Tuffani with one simple goal to bring people together over fresh, flavorful food and a comfortable place to hang out"
        }
      >
        <div className="flex flex-wrap items-center justify-center lg:items-center  gap-5 py-16">
          <Image
            src="/pizzaGroup.png"
            alt="Pizza Group"
            width={580}
            height={507}
            // className="mx-auto py-20"
          />
          <div className="flex flex-1 items-center justify-center flex-col">
            <div className="w-full text-center lg:text-left lg:w-135.75 space-y-5">
              <h2 className="italic text-5xl font-bold leading-[130%]">
                Where Every Slice{" "}
                <WavyText className="">Tells a Story</WavyText>
              </h2>
              <p className="font-light leading-[130%] ">
                Proudly serving Baneshwor and Kathmandu, Tufani blends 15+ years
                of experience with fresh ingredients, bold recipes, and expert
                cooking techniques to deliver delicious pizzas, crunchy fried
                chicken, juicy burgers, and flavorful wraps that customers love
                coming back for. Known as a go-to fast food and hangout spot, we
                prepare every dish fresh daily, offering quality taste, generous
                portions, and unforgettable flavors for families, friends, and
                food lovers searching for the best pizza and fried chicken near
                them.
              </p>
            </div>
          </div>
        </div>
      </HeroSectionWithFoods>

      <section className="pt-36">
        <div className="my-width mx-auto flex flex-wrap   justify-center md:divide-x ">
          {[
            { value: "10+", label: "Years of Experience" },
            { value: "450K+", label: "Happy Customers" },
            { value: "10+", label: "Pizza Varieties" },
            { value: "4.9", label: "Average Rating" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between py-5 md:py-0 px-20"
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

      <ChefSection className="bg-white" showPizza />

      <div className="bg-[#FFFBEB]">
        <div className="my-width mx-auto pt-18 text-center">
          <h2 className="text-5xl italic font-bold  mb-6">
            Inside the <WavyText className="inline">Storm</WavyText>
          </h2>
          <p className="w-[777px] max-w-full mx-auto">
            Explore the Tufani store in Baneshwor — a perfect hangout spot for
            pizza, fried chicken, burgers, and wraps lovers in Kathmandu.
          </p>
        </div>
        <AboutUsImageCarouselSection />
      </div>

      <div className="bg-[#FFE8A3]">
        <div className="my-width max-w-[90%] mx-auto py-20 flex flex-col lg:flex-row gap-10 items-center   justify-center lg:justify-between ">
          <div className="italic w-111 text-5xl text-center lg:text-left ">
            Join the <WavyText className="inline">Tufani Pizza</WavyText> Family
          </div>

          <div className="font-light w-full md:w-[619px] text-center lg:text-left">
            Experience the difference that passion, quality, and tradition make.
            Visit us today and taste why we&apos;ve been bringing families
            together for nearly three decades. <br />
            <br />
            Contact{" "}
            <a
              href="mailto:tufanipizza@gmail.com"
              className="font-bold text-brand"
            >
              tufanipizza@gmail.com
            </a>{" "}
            for more info.
          </div>
        </div>
      </div>
    </section>
  );
}
