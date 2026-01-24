import Button from "@/components/atom/Button";
import Title from "@/components/atom/Title";
import WavyText from "@/components/atom/WavyText";
import PizzaCard from "@/components/molecule/PizzaCard";
import PizzaShowcaseCard from "@/components/molecule/PizzaShowcaseCard";
import { FOOD_TYPE } from "@/lib/constants";
import Link from "next/link";
import React from "react";

export default function MenuPage() {
  return (
    <main>
      <section className="pt-48 pb-10 my-width mx-auto flex items-center justify-center flex-col text-center">
        <h1 className="text-[56px]">
          <WavyText>The Tufani Menu</WavyText>
        </h1>
        <p className="font-light w-[769px] max-w-full  text-xl">
          From light breezes to category 5 cravings, explore our storm-baked
          crusts and signature toppings. Your delicious pizza starts here.
        </p>
      </section>
      <section>
        <div className="my-width mx-auto py-24  gap-16 flex items-center justify-between">
          <div className="w-[528px]">
            <Title variant="h1">Today’s Flash Deal</Title>
            <p className="mt-3.5 mb-7 text-xl font-light">
              A sudden surge of savings has hit the menu! For the next two hours
              only, we’re blowing 20% off the price of all your favorite
              signature pizzas.
            </p>
            <Link href="#" className="text-blue-600 underline">
              <Button>Grab Now</Button>
            </Link>
          </div>
          <div>
            <PizzaShowcaseCard
              imageUrl="/Pizza.png"
              title="Vegetable Pizza"
              description="A storm of crispy pepperoni and double mozzarella."
              className="w-100"
            />
          </div>
        </div>
      </section>
      <section className="">
        <div className="my-width mx-auto py-24 flex flex-col gap-16">
          <Title>The Tufani Menu</Title>
          <div className="flex gap-4">
            <Button>All Items</Button>
            <Button variant={"outline"}>All Items</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(10)].map((_, index) => {
              return (
                <PizzaCard
                  key={index}
                  imageUrl="/Pizza.png"
                  title="Vegetable Pizza"
                  description="A storm of crispy pepperoni and double mozzarella."
                  price={12.99}
                  crossedPrice={15.99}
                  type={index % 2 === 0 ? FOOD_TYPE.VEG : FOOD_TYPE.NON_VEG}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
