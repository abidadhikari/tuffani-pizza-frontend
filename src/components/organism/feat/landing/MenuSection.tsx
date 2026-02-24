"use client";
import { ProductResponseDto } from "@/client";
import Button from "@/components/atom/Button";
import CheckboxGroup from "@/components/atom/CheckboxGroup";
import Title from "@/components/atom/Title";
import MenuFilter from "@/components/molecule/MenuFilter";
import PizzaCard from "@/components/molecule/PizzaCard";
import { FOOD_TYPE } from "@/lib/constants";
import React, { useState } from "react";

interface IMenuSectionProps {
  menu: ProductResponseDto[];
}

export default function MenuSection(props: IMenuSectionProps) {
  const { menu } = props;
  let filteredMenu = menu;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);
  const [foodType, setFoodType] = useState<string[]>([]);

  const categories = Array.from(
    new Set(
      menu
        ?.map((item) => item?.category?.name)
        .filter((cat) => cat !== undefined),
    ),
  );
  const selectOptions = [
    { label: "All Items", value: "all" },
    ...categories.map((category) => ({
      label: category,
      value: category,
    })),
  ];

  /* ---------------------------------- */
  /* Filtering logic                    */
  /* ---------------------------------- */

  // Category filter (multi-select)
  if (!selectedCategories.includes("all")) {
    filteredMenu = filteredMenu.filter((item: ProductResponseDto) =>
      selectedCategories.includes(item.category?.name || ""),
    );
  }

  // Veg / Non-Veg filter
  if (foodType.length > 0) {
    filteredMenu = filteredMenu.filter((item) => foodType.includes(item.type));
  }

  const reset = () => {
    setSelectedCategories(["all"]);
    setFoodType([]);
  };

  return (
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
              { id: FOOD_TYPE.VEG, label: "Veg" },
              { id: FOOD_TYPE.NON_VEG, label: "Non-Veg" },
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
        {filteredMenu.map((item: ProductResponseDto, index) => (
          <PizzaCard
            key={index}
            imageUrl={item.mainImageId?.url as string}
            title={item.name}
            description={item.description}
            price={+item.price}
            crossedPrice={item.crossedPrice ? +item.crossedPrice : undefined}
            type={item.type as (typeof FOOD_TYPE)[keyof typeof FOOD_TYPE]}
            percentageOff={
              item.crossedPrice !== null &&
              item.crossedPrice !== undefined &&
              +item.crossedPrice !== 0
                ? ((+item.crossedPrice - +item.price) / +item.crossedPrice) *
                  100
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
