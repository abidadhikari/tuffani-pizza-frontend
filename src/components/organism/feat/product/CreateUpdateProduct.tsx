"use client";

import Button from "@/components/atom/Button";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormSelectItem from "@/components/molecule/FormSelectItem";
import FormSwitch from "@/components/molecule/FormSwitch";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";
import { Form } from "@/components/ui/form";
import { useGetAllCategories } from "@/hooks/services/categories/useGetAllCategories";
import { usePatchProduct } from "@/hooks/services/products/usePatchProduct";
import { FOOD_TYPE } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Product name is required.",
  }),
  description: z.string().optional(),
  price: z.string().min(1, {
    message: "Price must be greater than 0.",
  }),
  crossedPrice: z.string().optional(),
  categoryId: z.string(),
  type: z
    .string()
    .refine((value) => value === FOOD_TYPE.VEG || value === FOOD_TYPE.NON_VEG, {
      message: "Type must be either VEG or NON_VEG.",
    }),
  visible: z.boolean().optional(),
});

export default function CreateUpdateProduct({
  id,
  defaultValues,
  type = "create",
}: {
  id: string;
  defaultValues: any;
  type?: "create" | "update";
}) {
  const { mutate: patchProduct, isPending } = usePatchProduct(id);
  const { data: categories } = useGetAllCategories();
  const categoryOptions = categories?.map(
    (category: { name: string; id: string }) => ({
      label: `${category.name} `,
      value: category.id,
    }),
  );

  const foodTypeOptions = [
    { label: "Veg", value: FOOD_TYPE.VEG },
    { label: "Non-Veg", value: FOOD_TYPE.NON_VEG },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "create") {
      // Call create product API here
      console.log("Creating product with values:", values);
      return;
    } else if (type === "update") {
      // patchProduct({
      //   body: {
      //     name: values.name,
      //     description: values.description,
      //     price: +values.price,
      //     crossedPrice: +values.crossedPrice,
      //     categoryId: values.categoryId,
      //     type: values.type,
      //   },
      // });
    }
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className=" space-y-5" disabled={isPending}>
            <FormSwitch form={form} name="visible" label="Visible" />
            <FormInputItem
              form={form}
              name="name"
              label="Product Name"
              placeholder="Enter product name"
            />

            <FormTextAreaInputItem
              form={form}
              name="description"
              label="Description"
              placeholder="Enter description"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInputItem
                form={form}
                name="price"
                label="Price"
                type="number"
                placeholder=""
              />
              <FormInputItem
                form={form}
                name="crossedPrice"
                label="Crossed Price"
                type="number"
                placeholder=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormSelectItem
                form={form}
                name="categoryId"
                label="Category"
                data={categoryOptions || []}
                placeholder="Select category"
              />

              <FormSelectItem
                form={form}
                name="type"
                label="Type"
                data={foodTypeOptions}
                placeholder="Select type"
              />
            </div>

            <div className="flex justify-end gap-3 py-5  bg-white">
              <Button
                variant={"default"}
                type="submit"
                isLoading={isPending}
                disabled={isPending}
              >
                Update Product
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>

      <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
    </section>
  );
}
