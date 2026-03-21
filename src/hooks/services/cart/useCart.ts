"use client";

import { ProductResponseDto } from "@/client";
import { useCartContext } from "@/components/providers/CartProvider";
import { CartItem } from "@/types/order";

export const buildCartItemFromProduct = (
  product: ProductResponseDto,
  selectedVariantSize?: CartItem["variantSize"],
  selectedAddonIds: string[] = [],
): CartItem => {
  const selectedVariant = product.variants?.find(
    (variant) => variant.size === selectedVariantSize,
  );
  const selectedAddons = (product.addons ?? []).filter((addon) =>
    selectedAddonIds.includes(addon.id),
  );
  const addonsTotal = selectedAddons.reduce(
    (sum, addon) => sum + Number(addon.price ?? 0),
    0,
  );
  const basePrice = Number(selectedVariant?.price ?? product.price);

  return {
    productId: product.id,
    variantSize: selectedVariant?.size,
    addonIds: selectedAddons.map((addon) => addon.id),
    selectedAddons: selectedAddons.map((addon) => ({
      id: addon.id,
      name: addon.name,
      price: Number(addon.price),
    })),
    name: product.name,
    price: basePrice + addonsTotal,
    crossedPrice:
      selectedVariant?.crossedPrice === null ||
      selectedVariant?.crossedPrice === undefined
        ? product.crossedPrice === null || product.crossedPrice === undefined
          ? null
          : Number(product.crossedPrice)
        : Number(selectedVariant.crossedPrice),
    imageUrl:
      typeof product.mainImage?.url === "string"
        ? product.mainImage.url
        : undefined,
    quantity: 1,
    type: product.type,
  };
};

export const useCart = () => useCartContext();
