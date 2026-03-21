"use client";

import Button from "@/components/atom/Button";
import AppMultiSelect from "@/components/molecule/AppMultiSelect";
import FormImageUploader from "@/components/molecule/FormImageUploader";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormSelectItem from "@/components/molecule/FormSelectItem";
import FormSwitch from "@/components/molecule/FormSwitch";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";
import { Form } from "@/components/ui/form";
import { useGetAllCategories } from "@/hooks/services/categories/useGetAllCategories";
import { useGetAllAddons } from "@/hooks/services/addons/useGetAllAddons";
import { useCreateProduct } from "@/hooks/services/products/useCreateProduct";
import { usePatchProduct } from "@/hooks/services/products/usePatchProduct";
import { FOOD_TYPE } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z
  .object({
    name: z.string().trim().min(1, "Product name is required."),
    description: z.string().optional(),
    price: z.string().optional(),
    crossedPrice: z.string().optional(),
    categoryId: z.string().min(1, "Category is required."),
    hasDiscount: z.boolean().optional(),
    hasVariants: z.boolean().optional(),
    variantSmallPrice: z.string().optional(),
    variantSmallCrossedPrice: z.string().optional(),
    variantMediumPrice: z.string().optional(),
    variantMediumCrossedPrice: z.string().optional(),
    variantLargePrice: z.string().optional(),
    variantLargeCrossedPrice: z.string().optional(),
    addonIds: z.array(z.string()).optional(),
    type: z
      .string()
      .refine((val) => val === FOOD_TYPE.VEG || val === FOOD_TYPE.NON_VEG, {
        message: "Invalid type.",
      }),
    visible: z.boolean().optional(),
    image: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.hasVariants) {
      if (!data.price || data.price.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selling price is required.",
          path: ["price"],
        });
      }

      if (
        data.crossedPrice &&
        data.crossedPrice !== "" &&
        data.crossedPrice !== "0"
      ) {
        const priceNum = parseFloat(data.price || "0");
        const crossedPriceNum = parseFloat(data.crossedPrice);

        if (crossedPriceNum <= priceNum) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Crossed price must be greater than the original price",
            path: ["crossedPrice"],
          });
        }
      }

      return;
    }

    const variantPriceFields = [
      data.variantSmallPrice,
      data.variantMediumPrice,
      data.variantLargePrice,
    ];

    const hasAtLeastOneVariantPrice = variantPriceFields.some(
      (value) => !!value && value.trim() !== "",
    );

    if (!hasAtLeastOneVariantPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide at least one variant price.",
        path: ["variantSmallPrice"],
      });
    }

    const variantPairs = [
      {
        price: data.variantSmallPrice,
        crossedPrice: data.variantSmallCrossedPrice,
        crossedPricePath: "variantSmallCrossedPrice",
      },
      {
        price: data.variantMediumPrice,
        crossedPrice: data.variantMediumCrossedPrice,
        crossedPricePath: "variantMediumCrossedPrice",
      },
      {
        price: data.variantLargePrice,
        crossedPrice: data.variantLargeCrossedPrice,
        crossedPricePath: "variantLargeCrossedPrice",
      },
    ] as const;

    variantPairs.forEach((pair) => {
      if (
        !pair.crossedPrice ||
        pair.crossedPrice === "" ||
        pair.crossedPrice === "0"
      ) {
        return;
      }

      if (!pair.price || pair.price.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Set variant price before crossed price.",
          path: [pair.crossedPricePath],
        });
        return;
      }

      if (parseFloat(pair.crossedPrice) <= parseFloat(pair.price)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Variant crossed price must be greater than variant price.",
          path: [pair.crossedPricePath],
        });
      }
    });
  });

type FormValues = z.infer<typeof formSchema>;

interface ICreateUpdateProduct {
  id: string;
  type?: "create" | "update";
  defaultValues?: {
    name: string;
    description: string;
    price: number;
    crossedPrice?: number;
    variants?: Array<{
      size: "SMALL" | "MEDIUM" | "LARGE";
      price: number;
      crossedPrice?: number | null;
    }>;
    addonIds?: string[];
    categoryId: string;
    type: string;
    visible?: boolean;
    image?: string;
  };
}

function CreateUpdateProduct({
  id,
  type = "create",
  defaultValues,
}: ICreateUpdateProduct) {
  const { mutate: patchProduct, isPending: isUpdating } = usePatchProduct();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategories();
  const { data: addons } = useGetAllAddons();

  const sizeVariantMap = useMemo(() => {
    const variants = defaultValues?.variants ?? [];
    return {
      SMALL: variants.find((variant) => variant.size === "SMALL"),
      MEDIUM: variants.find((variant) => variant.size === "MEDIUM"),
      LARGE: variants.find((variant) => variant.size === "LARGE"),
    };
  }, [defaultValues?.variants]);

  // 1. Reactive values: This handles the "sometimes selected" issue.
  // When categories load or defaultValues arrive, useForm will automatically re-sync.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      hasVariants: (defaultValues?.variants?.length ?? 0) > 0,
      price:
        (defaultValues?.variants?.length ?? 0) > 0
          ? ""
          : defaultValues?.price
            ? String(defaultValues.price)
            : "",
      hasDiscount: !!(
        defaultValues?.crossedPrice && defaultValues.crossedPrice > 0
      ),
      crossedPrice: defaultValues?.crossedPrice
        ? String(defaultValues.crossedPrice)
        : "",
      variantSmallPrice: sizeVariantMap.SMALL?.price
        ? String(sizeVariantMap.SMALL.price)
        : "",
      variantSmallCrossedPrice: sizeVariantMap.SMALL?.crossedPrice
        ? String(sizeVariantMap.SMALL.crossedPrice)
        : "",
      variantMediumPrice: sizeVariantMap.MEDIUM?.price
        ? String(sizeVariantMap.MEDIUM.price)
        : "",
      variantMediumCrossedPrice: sizeVariantMap.MEDIUM?.crossedPrice
        ? String(sizeVariantMap.MEDIUM.crossedPrice)
        : "",
      variantLargePrice: sizeVariantMap.LARGE?.price
        ? String(sizeVariantMap.LARGE.price)
        : "",
      variantLargeCrossedPrice: sizeVariantMap.LARGE?.crossedPrice
        ? String(sizeVariantMap.LARGE.crossedPrice)
        : "",
      addonIds: defaultValues?.addonIds ?? [],
      categoryId: defaultValues?.categoryId ?? "",
      type: defaultValues?.type ?? "",
      visible: defaultValues?.visible ?? false,
      image: defaultValues?.image ?? undefined,
    },
  });

  // Ensure addon IDs stay in sync when product or addon data changes
  useEffect(() => {
    if (defaultValues?.addonIds && defaultValues.addonIds.length > 0) {
      form.setValue("addonIds", defaultValues.addonIds);
    }
  }, [defaultValues?.addonIds, form]);

  const categoryOptions = useMemo(() => {
    return (
      categories?.map((cat) => ({
        label: cat.name,
        value: cat.id,
      })) || []
    );
  }, [categories]);

  const foodTypeOptions = [
    { label: "Veg", value: FOOD_TYPE.VEG },
    { label: "Non-Veg", value: FOOD_TYPE.NON_VEG },
  ];

  const addonOptions = useMemo(
    () =>
      (addons ?? []).map((addon) => ({
        label: `${addon.name} (Rs. ${addon.price.toFixed(2)})`,
        value: addon.id,
      })),
    [addons],
  );

  function onSubmit(values: FormValues) {
    const variantDraft = [
      {
        size: "SMALL" as const,
        price: values.variantSmallPrice,
        crossedPrice: values.variantSmallCrossedPrice,
      },
      {
        size: "MEDIUM" as const,
        price: values.variantMediumPrice,
        crossedPrice: values.variantMediumCrossedPrice,
      },
      {
        size: "LARGE" as const,
        price: values.variantLargePrice,
        crossedPrice: values.variantLargeCrossedPrice,
      },
    ];

    const variants = values.hasVariants
      ? variantDraft.reduce<
          Array<{
            size: "SMALL" | "MEDIUM" | "LARGE";
            price: number;
            crossedPrice?: number;
          }>
        >((acc, variant) => {
          const price = variant.price?.trim();
          if (!price) return acc;

          acc.push({
            size: variant.size,
            price: +price,
            crossedPrice:
              variant.crossedPrice && variant.crossedPrice.trim() !== ""
                ? +variant.crossedPrice
                : undefined,
          });

          return acc;
        }, [])
      : undefined;

    const payload = {
      name: values.name,
      description: values.description ?? "",
      categoryId: values.categoryId,
      type: values.type,
      visible: values.visible,
      image: values.image,
      price: values.hasVariants ? undefined : +(values.price || "0"),
      crossedPrice:
        values.hasVariants || !values.hasDiscount
          ? undefined
          : values.crossedPrice
            ? +values.crossedPrice
            : undefined,
      variants,
      addonIds: values.addonIds ?? [],
    };

    if (type === "create") {
      createProduct({ body: payload });
    } else {
      patchProduct({ id, body: payload });
    }
  }

  const isPending = isCreating || isUpdating;

  const hasDiscount = form.watch("hasDiscount");
  const hasVariants = form.watch("hasVariants");

  useEffect(() => {
    // If user unchecks "Apply Discount", clear the crossedPrice field
    if (!hasDiscount) {
      form.setValue("crossedPrice", "0");
    }
  }, [hasDiscount, form]);

  useEffect(() => {
    if (hasVariants) {
      form.setValue("hasDiscount", false);
      form.clearErrors(["price", "crossedPrice"]);
    }
  }, [hasVariants, form]);

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="space-y-5" disabled={isPending}>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <FormSwitch form={form} name="visible" label="Visible" />

                <FormInputItem
                  form={form}
                  name="name"
                  label="Product Name"
                  placeholder="Name"
                />
                <FormTextAreaInputItem
                  form={form}
                  name="description"
                  label="Description"
                />
              </div>
              <div>
                <FormImageUploader
                  form={form}
                  name="image"
                  label="Product Image"
                  aspectRatio="4/3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              {!hasVariants ? (
                <FormInputItem
                  form={form}
                  name="price"
                  label="Selling Price"
                  type="number"
                />
              ) : (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Base price is optional when size variants are enabled.
                </div>
              )}

              <div className="space-y-2">
                <FormSwitch
                  form={form}
                  name="hasVariants"
                  label="Enable Size Variants (Small, Medium, Large)"
                />
              </div>
            </div>

            {!hasVariants && (
              <div className="space-y-2">
                <FormSwitch
                  form={form}
                  name="hasDiscount"
                  label="Apply Discount/Crossed Price"
                />
              </div>
            )}

            {hasVariants && (
              <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  Variant Pricing
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-3 rounded-md border border-slate-200 bg-white p-3">
                    <p className="text-sm font-medium text-slate-800">Small</p>
                    <FormInputItem
                      form={form}
                      name="variantSmallPrice"
                      label="Price"
                      type="number"
                    />
                    <FormInputItem
                      form={form}
                      name="variantSmallCrossedPrice"
                      label="Crossed Price"
                      type="number"
                      placeholder="Optional"
                    />
                  </div>

                  <div className="space-y-3 rounded-md border border-slate-200 bg-white p-3">
                    <p className="text-sm font-medium text-slate-800">Medium</p>
                    <FormInputItem
                      form={form}
                      name="variantMediumPrice"
                      label="Price"
                      type="number"
                    />
                    <FormInputItem
                      form={form}
                      name="variantMediumCrossedPrice"
                      label="Crossed Price"
                      type="number"
                      placeholder="Optional"
                    />
                  </div>

                  <div className="space-y-3 rounded-md border border-slate-200 bg-white p-3">
                    <p className="text-sm font-medium text-slate-800">Large</p>
                    <FormInputItem
                      form={form}
                      name="variantLargePrice"
                      label="Price"
                      type="number"
                    />
                    <FormInputItem
                      form={form}
                      name="variantLargeCrossedPrice"
                      label="Crossed Price"
                      type="number"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Conditionally reveal the Crossed Price input */}
            {!hasVariants && hasDiscount && (
              <div className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-200 animate-in fade-in slide-in-from-top-2">
                <FormInputItem
                  form={form}
                  name="crossedPrice"
                  label="Crossed Price (Original Price)"
                  type="number"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This price will appear with a strike-through next to the
                  selling price.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormSelectItem
                form={form}
                name="categoryId"
                label="Category"
                data={categoryOptions}
                // Important: Show loading state so user knows why it's empty
                placeholder={
                  isCategoriesLoading ? "Loading..." : "Select category"
                }
              />

              <FormSelectItem
                form={form}
                name="type"
                label="Type"
                data={foodTypeOptions}
                placeholder="Select type"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm">Available Addons (Optional)</label>
              <AppMultiSelect
                data={addonOptions}
                value={form.watch("addonIds") ?? []}
                onChange={(nextValue) => form.setValue("addonIds", nextValue)}
                placeholder="Select add-ons for this product"
              />
              <p className="text-xs text-slate-500">
                Customers can choose from these add-ons while ordering.
              </p>
            </div>

            <div className="flex justify-end gap-3 py-5 bg-white">
              <Button type="submit" isLoading={isPending}>
                {type === "create" ? "Create Product" : "Update Product"}
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </section>
  );
}

export default memo(CreateUpdateProduct);
