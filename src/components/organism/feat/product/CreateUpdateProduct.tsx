"use client";

import Button from "@/components/atom/Button";
import FormImageUploader from "@/components/molecule/FormImageUploader";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormSelectItem from "@/components/molecule/FormSelectItem";
import FormSwitch from "@/components/molecule/FormSwitch";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";
import { Form } from "@/components/ui/form";
import { useGetAllCategories } from "@/hooks/services/categories/useGetAllCategories";
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
    description: z.string().trim().min(1, "Description is required."),
    price: z.string().min(1, "Price is required."),
    crossedPrice: z.string().optional(),
    categoryId: z.string().min(1, "Category is required."),
    hasDiscount: z.boolean().optional(),
    type: z
      .string()
      .refine((val) => val === FOOD_TYPE.VEG || val === FOOD_TYPE.NON_VEG, {
        message: "Invalid type.",
      }),
    visible: z.boolean().optional(),
    image: z.any().optional(),
  })
  .refine(
    (data) => {
      // If crossedPrice is empty or not provided, it's valid
      if (
        !data.crossedPrice ||
        data.crossedPrice === "" ||
        data.crossedPrice === "0"
      )
        return true;

      // Convert to numbers for comparison
      const priceNum = parseFloat(data.price);
      const crossedPriceNum = parseFloat(data.crossedPrice);

      // Validation: Crossed Price must be > Original Price
      return crossedPriceNum > priceNum;
    },
    {
      message: "Crossed price must be greater than the original price",
      path: ["crossedPrice"], // This sets the error specifically on the crossedPrice field
    },
  );

type FormValues = z.infer<typeof formSchema>;

interface ICreateUpdateProduct {
  id: string;
  type?: "create" | "update";
  defaultValues?: {
    name: string;
    description: string;
    price: number;
    crossedPrice?: number;
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

  // 1. Reactive values: This handles the "sometimes selected" issue.
  // When categories load or defaultValues arrive, useForm will automatically re-sync.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      price: defaultValues?.price ? String(defaultValues.price) : "",
      hasDiscount: !!(
        defaultValues?.crossedPrice && defaultValues.crossedPrice > 0
      ),
      crossedPrice: defaultValues?.crossedPrice
        ? String(defaultValues.crossedPrice)
        : "",
      categoryId: defaultValues?.categoryId ?? "",
      type: defaultValues?.type ?? "",
      visible: defaultValues?.visible ?? false,
      image: defaultValues?.image ?? undefined,
    },
  });

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

  function onSubmit(values: FormValues) {
    const payload = {
      ...values,
      price: +values.price,
      crossedPrice: values.crossedPrice ? +values.crossedPrice : undefined,
    };

    if (type === "create") {
      createProduct({ body: payload });
    } else {
      patchProduct({ id, body: payload });
    }
  }

  const isPending = isCreating || isUpdating;

  const hasDiscount = form.watch("hasDiscount");

  useEffect(() => {
    // If user unchecks "Apply Discount", clear the crossedPrice field
    if (!hasDiscount) {
      form.setValue("crossedPrice", "0");
    }
  }, [hasDiscount, form]);

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
              <FormInputItem
                form={form}
                name="price"
                label="Selling Price"
                type="number"
              />

              <div className="space-y-2">
                <FormSwitch
                  form={form}
                  name="hasDiscount"
                  label="Apply Discount/Crossed Price"
                />
              </div>
            </div>

            {/* Conditionally reveal the Crossed Price input */}
            {hasDiscount && (
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
