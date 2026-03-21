import BaseModal, { IBaseModal } from "@/components/molecule/BaseModal";
import FormInputItem from "@/components/molecule/FormInputItem";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface AddonModalProps extends IBaseModal {
  isEditMode: boolean;
  onConfirm: (payload: { name: string; price: number }) => void;
  defaultValues?: {
    name: string;
    price: number;
  };
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Addon name is required.",
  }),
  price: z
    .string()
    .trim()
    .min(1, { message: "Addon price is required." })
    .refine((value) => Number(value) >= 0, {
      message: "Addon price must be a positive number.",
    }),
});

export default function AddonModal(props: AddonModalProps) {
  const { isEditMode, onConfirm, defaultValues } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onConfirm({
      name: values.name,
      price: Number(values.price),
    });
  }

  useEffect(() => {
    if (!props.open) {
      form.reset();
    }
  }, [props.open, form]);

  useEffect(() => {
    if (isEditMode && defaultValues) {
      form.setValue("name", defaultValues.name);
      form.setValue("price", String(defaultValues.price));
      return;
    }

    form.setValue("name", "");
    form.setValue("price", "");
  }, [isEditMode, defaultValues, form]);

  return (
    <BaseModal
      {...props}
      title={isEditMode ? "Edit Addon" : "Create Addon"}
      description={
        isEditMode
          ? "Update addon name and price."
          : "Create an addon that can be attached to menu products."
      }
      submitText={isEditMode ? "Update" : "Create"}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="space-y-5">
            <FormInputItem
              form={form}
              name="name"
              label="Addon Name"
              placeholder="e.g. Extra Cheese"
            />
            <FormInputItem
              form={form}
              name="price"
              label="Addon Price"
              type="number"
              placeholder="0"
            />
          </fieldset>
        </form>
      </Form>
    </BaseModal>
  );
}
