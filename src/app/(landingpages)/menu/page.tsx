import { ProductResponseDto } from "@/client";
import WavyText from "@/components/atom/WavyText";
import FloatingCartCta from "@/components/organism/feat/landing/FloatingCartCta";
import MenuSection from "@/components/organism/feat/landing/MenuSection";
import OffersCarouselSection from "@/components/organism/feat/landing/OffersImageCarouselSection";
import {
  getMenu,
  getPublicOffers,
  getStaticPageData,
} from "@/hooks/services/public-services";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const menuData: ProductResponseDto[] = await getMenu();
  const staticContent = await getStaticPageData();
  const offers = await getPublicOffers();
  const rawData = fetchStaticContent(
    STATIC_CONTENT_KEYS.MENU_PAGE_HERO_SECTION,
    staticContent,
  );
  const heroSection = rawData?.value;

  return (
    <main>
      <FloatingCartCta />

      {/* ---------------------------------- */}
      {/* Hero Section                      */}
      {/* ---------------------------------- */}
      <div className="relative">
        <section className="pt-48 pb-37 my-width mx-auto flex flex-col items-center text-center">
          <h1 className="text-[56px] italic">
            {heroSection?.title?.prefix}
            <WavyText className="inline">
              {" "}
              {heroSection?.title?.highlight}
            </WavyText>
          </h1>
          <p className="font-light w-192.25 max-w-full text-xl">
            {heroSection?.description}
          </p>
        </section>

        <Image
          src="/ham.png"
          alt="ham"
          width={183}
          height={250}
          className="absolute right-0 top-0 translate-x-[50%] translate-y-[50%]"
        />
        <Image
          src="/basil1.png"
          alt="basil"
          width={80}
          height={250}
          className="absolute left-1/5 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* ---------------------------------- */}
      {/* Offer Section                     */}
      {/* ---------------------------------- */}
      {offers?.length > 0 && (
        <section className="bg-tertiary relative">
          <Image
            src="/tomato.png"
            alt="tomato"
            width={234}
            height={250}
            className="absolute top-0 left-0 rotate-90 -translate-y-[70%]"
          />
          <Image
            src="/mushroom.png"
            alt="mushroom"
            width={234}
            height={250}
            className="absolute bottom-0 right-0 translate-y-1/2 translate-x-25 blur-[2px]"
          />
          <OffersCarouselSection offers={offers} />
        </section>
      )}

      {/* <pre>{JSON.stringify(menuData, null, 2)}</pre> */}

      <section id="menu">
        <MenuSection menu={menuData} />
      </section>
    </main>
  );
}
