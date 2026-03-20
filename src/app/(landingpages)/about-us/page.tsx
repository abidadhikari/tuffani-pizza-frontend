import WavyText from "@/components/atom/WavyText";
import AboutUsImageCarouselSection from "@/components/organism/feat/landing/AboutUsImageCarouselSection";
import ChefSection from "@/components/organism/feat/landing/ChefSection";
import HeroSectionWithFoods from "@/components/template/HeroSectionWithFoods";
import {
  getAllPublicGallery,
  getStaticPageData,
} from "@/hooks/services/public-services";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { ApplicationConfig } from "@/types/staticContent.type";
import { Metadata } from "next";

import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us - Tufani Pizza",
  description:
    "Discover the story behind Tufani Pizza, where passion meets flavor. Learn about our journey, values, and commitment to delivering the best pizza experience.",
};

export default async function AboutUsPage() {
  const staticContents = await getStaticPageData();
  const galleryContent = await getAllPublicGallery();

  const heroSectionContent = fetchStaticContent(
    STATIC_CONTENT_KEYS.ABOUT_PAGE_HERO_SECTION,
    staticContents,
  )?.value;

  const pizzaSectionContent = fetchStaticContent(
    STATIC_CONTENT_KEYS.ABOUT_PAGE_PIZZA_SECTION,
    staticContents,
  )?.value;

  const statsSectionContent = fetchStaticContent(
    STATIC_CONTENT_KEYS.ABOUT_PAGE_STATS_SECTION,
    staticContents,
  )?.value;

  const carouselSectionContent = fetchStaticContent(
    STATIC_CONTENT_KEYS.ABOUT_PAGE_CAROUSEL_SECTION,
    staticContents,
  )?.value;

  const applicationConfig: ApplicationConfig = fetchStaticContent(
    STATIC_CONTENT_KEYS.APPLICATION_CONFIG,
    staticContents,
  )?.value;

  return (
    <section>
      <HeroSectionWithFoods
        title={{
          prefix: heroSectionContent.title?.prefix || "",
          highlight: heroSectionContent.title?.highlight || "",
          suffix: heroSectionContent.title?.suffix || "",
        }}
        description={heroSectionContent.description || ""}
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
                {pizzaSectionContent?.title?.prefix}{" "}
                <WavyText className="inline">
                  {pizzaSectionContent?.title?.highlight}
                </WavyText>{" "}
                {pizzaSectionContent?.title?.suffix}
              </h2>
              <div
                className="font-light leading-[130%] "
                dangerouslySetInnerHTML={{
                  __html: pizzaSectionContent?.description || "",
                }}
              ></div>
            </div>
          </div>
        </div>
      </HeroSectionWithFoods>

      <section className="pt-36">
        <div className="my-width mx-auto flex flex-wrap   justify-center md:divide-x ">
          {statsSectionContent?.map(
            (
              item: {
                value: string;
                label: string;
              },
              index: number,
            ) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between py-5 md:py-0 px-20"
              >
                <WavyText className="text-4xl font-bold ">
                  {item.value}
                </WavyText>
                <div
                  className="text-lg font-medium w-30
              text-black/75 text-center mt-2 leading-[120%]"
                >
                  {item.label}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <ChefSection
        className="bg-white"
        showPizza
        staticContent={staticContents}
      />

      <div className="bg-[#FFFBEB]">
        <div className="my-width mx-auto pt-18 text-center">
          <h2 className="text-5xl italic font-bold  mb-6">
            {carouselSectionContent?.title?.prefix}{" "}
            <WavyText className="inline">
              {carouselSectionContent?.title?.highlight}
            </WavyText>{" "}
            {carouselSectionContent?.title?.suffix}
          </h2>
          <div
            className="w-194.25 max-w-full mx-auto"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(carouselSectionContent?.description),
            }}
          ></div>
        </div>

        <AboutUsImageCarouselSection
          images={galleryContent?.map(
            (item: {
              title: string;
              Asset: {
                url: string;
              };
            }) => {
              return {
                title: item?.title,
                url: item?.Asset?.url,
              };
            },
          )}
        />
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
              href={`mailto:${applicationConfig?.email}`}
              className="font-bold text-brand"
            >
              {applicationConfig?.email}
            </a>{" "}
            for more info.
          </div>
        </div>
      </div>
    </section>
  );
}
