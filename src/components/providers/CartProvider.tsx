"use client";

import { useAppSelector } from "@/store/storeHook";
import { CartItem } from "@/types/order";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CART_STORAGE_KEY_PREFIX = "tuffani_cart_v2";

const getCartStorageKey = (userId: string) =>
  `${CART_STORAGE_KEY_PREFIX}:${userId}`;

const buildAddonKey = (addonIds?: string[]) =>
  [...(addonIds ?? [])].sort().join(",");

const getCartItemKey = (
  item: Pick<CartItem, "productId" | "variantSize" | "addonIds">,
) =>
  `${item.productId}:${item.variantSize ?? "DEFAULT"}:${buildAddonKey(item.addonIds)}`;

const safeParseCart = (value: string | null): CartItem[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((entry): entry is CartItem => {
        if (!entry || typeof entry !== "object") return false;
        const raw = entry as Record<string, unknown>;
        return (
          typeof raw.productId === "string" &&
          typeof raw.name === "string" &&
          typeof raw.price === "number" &&
          typeof raw.quantity === "number"
        );
      })
      .map((entry) => ({
        ...entry,
        quantity: Math.max(1, Math.floor(entry.quantity)),
        addonIds: Array.isArray(entry.addonIds)
          ? entry.addonIds.filter((id): id is string => typeof id === "string")
          : undefined,
        selectedAddons: Array.isArray(entry.selectedAddons)
          ? entry.selectedAddons
              .filter(
                (addon): addon is { id: string; name: string; price: number } =>
                  Boolean(
                    addon &&
                    typeof addon.id === "string" &&
                    typeof addon.name === "string" &&
                    typeof addon.price === "number",
                  ),
              )
              .map((addon) => ({
                id: addon.id,
                name: addon.name,
                price: addon.price,
              }))
          : undefined,
      }));
  } catch {
    return [];
  }
};

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => boolean;
  removeItem: (
    productId: string,
    variantSize?: CartItem["variantSize"],
    addonIds?: string[],
  ) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantSize?: CartItem["variantSize"],
    addonIds?: string[],
  ) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
  isAuthenticated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector("auth");
  const userId = user?.id;

  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined" || !userId) return [];
    return safeParseCart(
      window.localStorage.getItem(getCartStorageKey(userId)),
    );
  });

  // Reload cart when user changes (login / logout / switch account)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!userId) {
      setItems([]);
      return;
    }
    setItems(
      safeParseCart(window.localStorage.getItem(getCartStorageKey(userId))),
    );
  }, [userId]);

  // Persist whenever items or user changes
  useEffect(() => {
    if (typeof window === "undefined" || !userId) return;
    window.localStorage.setItem(
      getCartStorageKey(userId),
      JSON.stringify(items),
    );
  }, [items, userId]);

  const addItem = useCallback(
    (nextItem: CartItem): boolean => {
      if (!userId) return false;

      setItems((current) => {
        const nextKey = getCartItemKey(nextItem);
        const existing = current.find(
          (item) => getCartItemKey(item) === nextKey,
        );

        if (!existing) {
          return [
            ...current,
            { ...nextItem, quantity: Math.max(1, nextItem.quantity) },
          ];
        }

        return current.map((item) =>
          getCartItemKey(item) === nextKey
            ? {
                ...item,
                quantity: item.quantity + Math.max(1, nextItem.quantity),
              }
            : item,
        );
      });

      return true;
    },
    [userId],
  );

  const removeItem = useCallback(
    (
      productId: string,
      variantSize?: CartItem["variantSize"],
      addonIds?: string[],
    ) => {
      const targetKey = getCartItemKey({ productId, variantSize, addonIds });
      setItems((current) =>
        current.filter((item) => getCartItemKey(item) !== targetKey),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (
      productId: string,
      quantity: number,
      variantSize?: CartItem["variantSize"],
      addonIds?: string[],
    ) => {
      const targetKey = getCartItemKey({ productId, variantSize, addonIds });
      const safeQuantity = Math.max(1, Math.floor(quantity));

      setItems((current) =>
        current.map((item) =>
          getCartItemKey(item) === targetKey
            ? { ...item, quantity: safeQuantity }
            : item,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalAmount,
        totalItems,
        isAuthenticated: Boolean(userId),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext must be used inside <CartProvider>");
  }
  return ctx;
}
