"use client";

import { ProductResponseDto } from "@/client";
import { useCartContext } from "@/components/providers/CartProvider";
import { CartItem } from "@/types/order";

export const buildCartItemFromProduct = (
  product: ProductResponseDto,
  selectedVariantSize?: CartItem["variantSize"],
): CartItem => {
  const selectedVariant = product.variants?.find(
    (variant) => variant.size === selectedVariantSize,
  );

  return {
    productId: product.id,
    variantSize: selectedVariant?.size,
    name: product.name,
    price: Number(selectedVariant?.price ?? product.price),
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
