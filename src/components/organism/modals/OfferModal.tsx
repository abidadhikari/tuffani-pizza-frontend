/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BaseModal, { IBaseModal } from "@/components/molecule/BaseModal";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormSwitch from "@/components/molecule/FormSwitch";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";
import FormSelectItem from "@/components/molecule/FormSelectItem";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { extractTime } from "@/lib/date-time";
import FormDaysOfWeekMultiSelect from "@/components/molecule/FormDaysOfWeekMultiSelect";
import { useGetAllProducts } from "@/hooks/services/products/useGetAllProducts";
import { ProductResponseDto } from "@/client";
import FormTimePicker from "@/components/molecule/FormTimePickerItem";

const schema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    discountType: z.enum(["PERCENTAGE", "FIXED"]),
    discountValue: z.coerce.number().min(0),

    validFrom: z.string(),
    validUntil: z.string(),

    startsAt: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),

    endsAt: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),

    daysOfWeek: z.array(z.string()),

    productId: z.string().optional(),
    categoryId: z.string().optional(),

    isVisible: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // -----------------------------
    // Date Range Validation
    // -----------------------------
    if (data.validFrom && data.validUntil) {
      const from = new Date(data.validFrom);
      const until = new Date(data.validUntil);

      if (until < from) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["validUntil"],
          message: "Valid Until must be after Valid From",
        });
      }
    }

    // -----------------------------
    // Time Range Validation
    // -----------------------------
    if (data.startsAt && data.endsAt) {
      const start = new Date(`1970-01-01T${data.startsAt}Z`);
      const end = new Date(`1970-01-01T${data.endsAt}Z`);

      if (end <= start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endsAt"],
          message: "Ends At must be after Starts At",
        });
      }
    }
  });

interface Props extends IBaseModal {
  isEditMode: boolean;
  onConfirm: (data: z.infer<typeof schema>) => void;
  defaultValues?: Partial<z.infer<typeof schema>>;
}

export default function OfferModal(props: Props) {
  const { isEditMode, onConfirm, defaultValues, open } = props;
  const { data: productsDataRaw } = useGetAllProducts({
    page: 1,
    limit: 10000,
    search: "",
    visible: undefined,
  });

  const productsData = productsDataRaw?.data || [];

  const productsOptions = productsData
    ? productsData?.map((product) => ({
        label: `${product.name} (${product.visible ? "Visible" : "Hidden"})`,
        value: product.id,
      }))
    : [];

  const form = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!props.open) form.reset();
  }, [props.open, form]);

  useEffect(() => {
    if (isEditMode && defaultValues) {
      console.log(
        "Setting form values for edit mode with defaultValues:",
        defaultValues,
      );
      Object.entries(defaultValues).forEach(([key, value]) => {
        form.setValue(key as any, value as any);
      });
      form.setValue(
        "validFrom",
        defaultValues.validFrom?.substring(0, 10) || "",
      );
      form.setValue(
        "validUntil",
        defaultValues.validUntil?.substring(0, 10) || "",
      );
      form.setValue("startsAt", extractTime(defaultValues.startsAt || ""));
      form.setValue("endsAt", extractTime(defaultValues.endsAt || ""));
      form.setValue("categoryId", defaultValues.categoryId || undefined);
      form.setValue("productId", defaultValues.productId || undefined);
      form.setValue("daysOfWeek", defaultValues.daysOfWeek || []);
    }
  }, [isEditMode, defaultValues]);

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <BaseModal
      {...props}
      title={isEditMode ? "Edit Offer" : "Create Offer"}
      submitText={isEditMode ? "Update" : "Create"}
      onSubmit={form.handleSubmit(onConfirm, onError)}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormSwitch form={form} name="isVisible" label="Visible" />

          <FormInputItem form={form} name="title" label="Title" />
          <FormTextAreaInputItem
            form={form}
            name="description"
            label="Description"
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelectItem
              form={form}
              name="discountType"
              label="Discount Type"
              data={[
                { label: "Percentage", value: "PERCENTAGE" },
                { label: "Fixed", value: "FIXED" },
              ]}
            />

            <FormInputItem
              form={form}
              name="discountValue"
              label="Discount Value"
              type="number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInputItem
              form={form}
              name="validFrom"
              label="Valid From"
              type="date"
            />

            <FormInputItem
              form={form}
              name="validUntil"
              label="Valid Until"
              type="date"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormTimePicker
              form={form}
              name="startsAt"
              label="Starts At"
              withSeconds
            />
            <FormTimePicker
              form={form}
              name="endsAt"
              label="Ends At"
              withSeconds
            />
          </div>

          <FormSelectItem
            form={form}
            name="productId"
            label="Product"
            data={productsOptions}
          />

          <FormDaysOfWeekMultiSelect
            form={form}
            name="daysOfWeek"
            label="Days of Week"
          />
        </form>
      </Form>
    </BaseModal>
  );
}
