"use client";
import Button from "@/components/atom/Button";
import Title from "@/components/atom/Title";
import WavyText from "@/components/atom/WavyText";
import PizzaCard from "@/components/molecule/PizzaCard";
import { FOOD_TYPE } from "@/lib/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

import MenuFilter from "@/components/molecule/MenuFilter";
import CheckboxGroup from "@/components/atom/CheckboxGroup";
import Image from "next/image";
import menu from "@/data/menu";

export default function MenuPage() {
  const categories = Array.from(
    new Set(menu.map((item) => item.category.toLowerCase())),
  );
  const defaultOptions = [
    {
      label: "All Items",
      value: "all",
    },
    ...categories.map((category) => ({
      label: category.charAt(0).toUpperCase() + category.slice(1),
      value: category,
    })),
  ];

  const [selectOptions] = useState(defaultOptions);
  const [foodType, setFoodType] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>(
    defaultOptions[0].value,
  );

  let filteredMenu = menu;
  if (selectedItem !== "all") {
    filteredMenu = filteredMenu.filter(
      (item) => item.category.toLowerCase() === selectedItem,
    );
  }
  if (foodType.length > 0) {
    filteredMenu = filteredMenu.filter((item) =>
      foodType.includes(item.isVeg ? "veg" : "nonveg"),
    );
  }
  return (
    <main>
      <section className="pt-48 pb-37 my-width mx-auto flex items-center justify-center flex-col text-center">
        <h1 className="text-[56px] italic">
          Explore
          <WavyText className="inline"> The STORM</WavyText>
        </h1>
        <p className="font-light w-[769px] max-w-full  text-xl">
          From light breezes to category 5 cravings, explore our storm-baked
          crusts and signature toppings. Your delicious pizza starts here.
        </p>
      </section>
      <section className="bg-tertiary relative">
        <Image
          src={"/tomato.png"}
          alt="tomato"
          width={234}
          height={250}
          className="absolute top-0 left-0 rotate-90 translate-y-[-70%]"
        />
        <Image
          src={"/mushroom.png"}
          alt="tomato"
          width={234}
          height={250}
          className="absolute bottom-0 right-0  translate-y-[50%] translate-x-25 blur-[2px]"
        />
        <div className="my-width mx-auto pt-10   gap-16 flex items-center justify-between py-15 pb-25">
          <div className="w-[528px]">
            <Title variant="h1" className="italic">
              Today’s <WavyText className="inline">Flash Deal</WavyText>
            </Title>
            <div className="mt-3.5 mb-7 text-xl font-light">
              A sudden surge of savings has hit the menu! For the next two hours
              only, we’re blowing{" "}
              <WavyText className="inline">20% off</WavyText> the price of all
              your favorite signature pizzas.
            </div>
            <Link href="#" className="text-blue-600 underline">
              <Button>Grab Now</Button>
            </Link>
          </div>
          <div>
            <PizzaCard
              imageUrl="/Pizza.png"
              title="Vegetable Pizza"
              description="A storm of crispy pepperoni and double mozzarella."
              price={12.99}
              crossedPrice={15.99}
              type={FOOD_TYPE.NON_VEG}
              variant="wide"
            />
          </div>
        </div>
      </section>
      <section className="">
        <div className="my-width mx-auto py-24 flex flex-col gap-8">
          <Title>The Tufani Menu</Title>
          <div className="flex flex-col gap-4">
            <MenuFilter
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              selectOptions={selectOptions}
            />
            <div className="flex items-center justify-start gap-4">
              <CheckboxGroup
                options={[
                  { id: "veg", label: "Veg" },
                  { id: "nonveg", label: "Non-Veg" },
                ]}
                value={foodType}
                onChange={(val) => {
                  setFoodType(val);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMenu.map((item, index) => {
              return (
                <PizzaCard
                  key={index}
                  imageUrl={item.image}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  crossedPrice={item.crossedPrice}
                  type={item.isVeg ? FOOD_TYPE.VEG : FOOD_TYPE.NON_VEG}
                  percentageOff={
                    ((item.crossedPrice - item.price) / item.crossedPrice) * 100
                  }
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
