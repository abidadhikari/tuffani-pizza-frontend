"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Button from "@/components/atom/Button";
import Title from "@/components/atom/Title";
import WavyText from "@/components/atom/WavyText";
import PizzaCard from "@/components/molecule/PizzaCard";
import MenuFilter from "@/components/molecule/MenuFilter";
import CheckboxGroup from "@/components/atom/CheckboxGroup";

import { FOOD_TYPE } from "@/lib/constants";
import menu from "@/data/menu";

export default function MenuPage() {
  /* ---------------------------------- */
  /* Category options                   */
  /* ---------------------------------- */

  const categories = Array.from(
    new Set(menu.map((item) => item.category.toLowerCase())),
  );

  const selectOptions = [
    { label: "All Items", value: "all" },
    ...categories.map((category) => ({
      label: category.charAt(0).toUpperCase() + category.slice(1),
      value: category,
    })),
  ];

  /* ---------------------------------- */
  /* State                              */
  /* ---------------------------------- */

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);
  const [foodType, setFoodType] = useState<string[]>([]);

  /* ---------------------------------- */
  /* Filtering logic                    */
  /* ---------------------------------- */

  let filteredMenu = menu;

  // Category filter (multi-select)
  if (!selectedCategories.includes("all")) {
    filteredMenu = filteredMenu.filter((item) =>
      selectedCategories.includes(item.category.toLowerCase()),
    );
  }

  // Veg / Non-Veg filter
  if (foodType.length > 0) {
    filteredMenu = filteredMenu.filter((item) =>
      foodType.includes(item.isVeg ? "veg" : "nonveg"),
    );
  }

  const reset = () => {
    setSelectedCategories(["all"]);
    setFoodType([]);
  };
  return (
    <main>
      {/* ---------------------------------- */}
      {/* Hero Section                      */}
      {/* ---------------------------------- */}
      <div className="relative">
        <section className="pt-48 pb-37 my-width mx-auto flex flex-col items-center text-center">
          <h1 className="text-[56px] italic">
            Explore
            <WavyText className="inline"> The STORM</WavyText>
          </h1>
          <p className="font-light w-[769px] max-w-full text-xl">
            From light breezes to category 5 cravings, explore our storm-baked
            crusts and signature toppings. Your delicious pizza starts here.
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
          <div className="w-[528px] max-w-full">
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
            imageUrl="/Pizza.png"
            title="Super तुफानी (Large)"
            description="Spicy grilled chicken sandheko, chicken ham, spanish onion, capsicum, green chilli, mozzarella cheese and a smoky flavour."
            price={590}
            crossedPrice={650}
            type={FOOD_TYPE.NON_VEG}
            variant="wide"
          />
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* Menu Section                      */}
      {/* ---------------------------------- */}
      <section>
        <div className="my-width mx-auto py-24 flex flex-col gap-8">
          <Title>The Tufani Menu</Title>

          {/* Filters */}
          <div className="flex flex-col gap-4">
            <MenuFilter
              selectedItems={selectedCategories}
              setSelectedItems={setSelectedCategories}
              selectOptions={selectOptions}
            />

            <div className="flex items-center justify-between">
              <CheckboxGroup
                options={[
                  { id: "veg", label: "Veg" },
                  { id: "nonveg", label: "Non-Veg" },
                ]}
                value={foodType}
                onChange={setFoodType}
              />
              {(!selectedCategories.includes("all") || foodType.length > 0) && (
                <Button variant="ghost" onClick={reset}>
                  Reset Filters
                </Button>
              )}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="flex flex-wrap justify-center lg:grid grid-cols-3 min-[1330px]:grid-cols-4 gap-5">
            {filteredMenu.map((item, index) => (
              <PizzaCard
                key={index}
                imageUrl={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                crossedPrice={item.crossedPrice}
                type={item.isVeg ? FOOD_TYPE.VEG : FOOD_TYPE.NON_VEG}
                percentageOff={
                  item.crossedPrice
                    ? ((item.crossedPrice - item.price) / item.crossedPrice) *
                      100
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
