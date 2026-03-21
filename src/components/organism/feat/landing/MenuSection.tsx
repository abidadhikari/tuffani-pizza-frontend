"use client";
import { ProductResponseDto } from "@/client";
import Button from "@/components/atom/Button";
import CheckboxGroup from "@/components/atom/CheckboxGroup";
import Title from "@/components/atom/Title";
import MenuFilter from "@/components/molecule/MenuFilter";
import PizzaCard from "@/components/molecule/PizzaCard";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
  const [addonPickerProduct, setAddonPickerProduct] =
    useState<ProductResponseDto | null>(null);
  const [addonPickerVariantSize, setAddonPickerVariantSize] =
    useState<CartItem["variantSize"]>();
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // Ensure menu is a valid array
  const validMenu = Array.isArray(menu) ? menu : [];

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
      validMenu
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

  // Start with valid menu
  filteredMenu = [...validMenu];

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

  const handleAddToCart = (
    product: ProductResponseDto,
    variantSize?: CartItem["variantSize"],
  ) => {
    if (!user) {
      toast.error("Please log in to add items to your cart");
      router.push("/login");
      return;
    }

    const validAddons = (product.addons ?? []).filter(
      (addon) => Number(addon.price) > 0,
    );

    if (validAddons.length === 0) {
      addItem(buildCartItemFromProduct(product, variantSize));
      toast.success(
        `${product.name}${variantSize ? ` (${sizeLabelMap[variantSize]})` : ""} added to cart`,
      );
      return;
    }

    setAddonPickerProduct(product);
    setAddonPickerVariantSize(variantSize);
    setSelectedAddonIds([]);
  };

  const closeAddonPicker = () => {
    setAddonPickerProduct(null);
    setAddonPickerVariantSize(undefined);
    setSelectedAddonIds([]);
  };

  const confirmAddWithAddons = (addonIds: string[]) => {
    if (!addonPickerProduct) return;

    const added = addItem(
      buildCartItemFromProduct(
        addonPickerProduct,
        addonPickerVariantSize,
        addonIds,
      ),
    );

    if (added) {
      toast.success(
        `${addonPickerProduct.name}${addonPickerVariantSize ? ` (${sizeLabelMap[addonPickerVariantSize]})` : ""} added to cart`,
      );
    }

    closeAddonPicker();
  };

  const availablePickerAddons = (addonPickerProduct?.addons ?? []).filter(
    (addon) => Number(addon.price) > 0,
  );
  const pickerBasePrice = addonPickerProduct
    ? Number(
        addonPickerProduct.variants?.find(
          (variant) => variant.size === addonPickerVariantSize,
        )?.price ?? addonPickerProduct.price,
      )
    : 0;
  const pickerAddonTotal = availablePickerAddons
    .filter((addon) => selectedAddonIds.includes(addon.id))
    .reduce((sum, addon) => sum + Number(addon.price), 0);
  const pickerFinalPrice = pickerBasePrice + pickerAddonTotal;

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

      {filteredMenu.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-slate-600">
            {validMenu.length === 0
              ? "The menu is currently unavailable. Please try again later."
              : "No items match your selected filters."}
          </p>
        </div>
      ) : (
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
              const validAddons = (item.addons ?? []).filter(
                (addon) => Number(addon.price) > 0,
              );

              const selectedVariantSize =
                variantOptions.length > 0
                  ? (selectedVariantByProduct[item.id] ??
                    variantOptions[0].value)
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
                  addonCount={validAddons.length}
                  onSizeChange={(size) => {
                    setSelectedVariantByProduct((prev) => ({
                      ...prev,
                      [item.id]: size,
                    }));
                  }}
                  ctaLabel={
                    validAddons.length > 0 ? "Customize & Add" : "Add to Cart"
                  }
                  onCtaClick={() => handleAddToCart(item, selectedVariantSize)}
                />
              );
            })(),
          )}
        </div>
      )}

      <Dialog
        open={Boolean(addonPickerProduct)}
        onOpenChange={(open) => {
          if (!open) closeAddonPicker();
        }}
      >
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>Select add-ons (optional)</DialogTitle>
            <DialogDescription>
              Customize {addonPickerProduct?.name} with extras.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {availablePickerAddons.map((addon) => {
              const checked = selectedAddonIds.includes(addon.id);

              return (
                <div
                  key={addon.id}
                  className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2"
                >
                  <Label
                    htmlFor={`addon-${addon.id}`}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      id={`addon-${addon.id}`}
                      checked={checked}
                      onCheckedChange={(nextChecked) => {
                        const isChecked = Boolean(nextChecked);
                        setSelectedAddonIds((prev) =>
                          isChecked
                            ? [...prev, addon.id]
                            : prev.filter((id) => id !== addon.id),
                        );
                      }}
                    />
                    <span>{addon.name}</span>
                  </Label>
                  <span className="text-sm font-medium text-slate-700">
                    Rs. {Number(addon.price).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Final price</span>
              <span className="font-semibold text-slate-900">
                Rs. {pickerFinalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => confirmAddWithAddons([])}>
              Add Without Add-ons
            </Button>
            <Button onClick={() => confirmAddWithAddons(selectedAddonIds)}>
              Add Selected
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
