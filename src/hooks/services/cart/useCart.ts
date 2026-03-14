"use client";

import { ProductResponseDto } from "@/client";
import { useCartContext } from "@/components/providers/CartProvider";
import { CartItem } from "@/types/order";

export const buildCartItemFromProduct = (
  product: ProductResponseDto,
): CartItem => ({
  productId: product.id,
  name: product.name,
  price: Number(product.price),
  crossedPrice:
    product.crossedPrice === null || product.crossedPrice === undefined
      ? null
      : Number(product.crossedPrice),
  imageUrl:
    typeof product.mainImage?.url === "string"
      ? product.mainImage.url
      : undefined,
  quantity: 1,
  type: product.type,
});

export const useCart = () => useCartContext();
