"use client";
import { ProductResponseDto } from "@/client";
import Button from "@/components/atom/Button";
import CheckboxGroup from "@/components/atom/CheckboxGroup";
import Title from "@/components/atom/Title";
import MenuFilter from "@/components/molecule/MenuFilter";
import PizzaCard from "@/components/molecule/PizzaCard";
import {
  buildCartItemFromProduct,
  useCart,
} from "@/hooks/services/cart/useCart";
import { FOOD_TYPE } from "@/lib/constants";
import { useAppSelector } from "@/store/storeHook";
import { CartItem } from "@/types/order";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface IMenuSectionProps {
  menu: ProductResponseDto[];
}

export default function MenuSection(props: IMenuSectionProps) {
  const { menu } = props;
  let filteredMenu = menu;
  const router = useRouter();
  const { user } = useAppSelector("auth");
  const { addItem } = useCart();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);
  const [foodType, setFoodType] = useState<string[]>([]);
  const [selectedVariantByProduct, setSelectedVariantByProduct] = useState<
    Record<string, NonNullable<CartItem["variantSize"]>>
  >({});

  const sizeLabelMap: Record<NonNullable<CartItem["variantSize"]>, string> = {
    SMALL: "Small",
    MEDIUM: "Medium",
    LARGE: "Large",
  };

  const sizeOrder: Record<NonNullable<CartItem["variantSize"]>, number> = {
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3,
  };

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
        {filteredMenu.map((item: ProductResponseDto) =>
          (() => {
            const validVariants = [...(item.variants ?? [])]
              .filter(
                (variant) =>
                  variant.price !== null &&
                  variant.price !== undefined &&
                  Number(variant.price) > 0,
              )
              .sort((a, b) => sizeOrder[a.size] - sizeOrder[b.size]);

            const variantOptions = validVariants.map((variant) => ({
              value: variant.size,
              label: sizeLabelMap[variant.size],
            }));

            const selectedVariantSize =
              variantOptions.length > 0
                ? (selectedVariantByProduct[item.id] ?? variantOptions[0].value)
                : undefined;

            const selectedVariant = validVariants.find(
              (variant) => variant.size === selectedVariantSize,
            );

            const displayPrice = Number(selectedVariant?.price ?? item.price);
            const displayCrossedPrice = selectedVariant
              ? selectedVariant.crossedPrice
              : item.crossedPrice;

            return (
              <PizzaCard
                key={item.id}
                imageUrl={item.mainImage?.url as string}
                title={item.name}
                description={item.description}
                price={displayPrice}
                crossedPrice={displayCrossedPrice}
                type={item.type as (typeof FOOD_TYPE)[keyof typeof FOOD_TYPE]}
                percentageOff={
                  displayCrossedPrice !== null &&
                  displayCrossedPrice !== undefined &&
                  +displayCrossedPrice !== 0
                    ? ((+displayCrossedPrice - displayPrice) /
                        +displayCrossedPrice) *
                      100
                    : undefined
                }
                sizeOptions={variantOptions}
                selectedSize={selectedVariantSize}
                onSizeChange={(size) => {
                  setSelectedVariantByProduct((prev) => ({
                    ...prev,
                    [item.id]: size,
                  }));
                }}
                onCtaClick={() => {
                  if (!user) {
                    toast.error("Please log in to add items to your cart");
                    router.push("/login");
                    return;
                  }

                  addItem(buildCartItemFromProduct(item, selectedVariantSize));
                  toast.success(
                    `${item.name}${selectedVariantSize ? ` (${sizeLabelMap[selectedVariantSize]})` : ""} added to cart`,
                  );
                }}
              />
            );
          })(),
        )}
      </div>
    </div>
  );
}
