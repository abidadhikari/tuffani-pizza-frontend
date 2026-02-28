import { ProductResponseDto } from "@/client";
import Button from "@/components/atom/Button";
import Title from "@/components/atom/Title";
import WavyText from "@/components/atom/WavyText";
import PizzaCard from "@/components/molecule/PizzaCard";
import MenuSection from "@/components/organism/feat/landing/MenuSection";
import { getMenu, getStaticPageData } from "@/hooks/services/public-services";
import { FOOD_TYPE, STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import Image from "next/image";
import Link from "next/link";

export default async function MenuPage() {
  const menuData: ProductResponseDto[] = await getMenu();
  const staticContent = await getStaticPageData();
  const rawData = fetchStaticContent(
    STATIC_CONTENT_KEYS.MENU_PAGE_HERO_SECTION,
    staticContent,
  );
  const heroSection = rawData?.value;

  return (
    <main>
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
          <p className="font-light w-[769px] max-w-full text-xl">
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

        <div className="my-width mx-auto gap-16 flex flex-col md:flex-row items-center justify-between py-24">
          <div className="w-132 max-w-full">
            <Title variant="h1" className="italic">
              Opening
              <WavyText className="inline"> Offer </WavyText>
            </Title>

            <p className="mt-3.5 mb-7 text-xl font-light">
              Free Coke or Ice Cream on every purchase. First 50 customers get
              to play our Spin & Win game and grab exciting
              <WavyText className="inline"> gifts </WavyText>
              and
              <WavyText className="inline"> special discounts</WavyText>.
            </p>

            <Link href="#">
              <Button>Grab Now</Button>
            </Link>
          </div>

          <PizzaCard
            imageUrl="/images/pizza.jpg"
            title="Super तुफानी (Large)"
            description="Spicy grilled chicken sandheko, chicken ham, spanish onion, capsicum, green chilli, mozzarella cheese and a smoky flavour."
            price={590}
            crossedPrice={650}
            type={FOOD_TYPE.NON_VEG}
            variant="wide"
          />
        </div>
      </section>
      <section>
        <MenuSection menu={menuData} />
      </section>
    </main>
  );
}
