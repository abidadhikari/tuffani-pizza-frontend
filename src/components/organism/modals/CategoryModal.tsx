import BaseModal, { IBaseModal } from "@/components/molecule/BaseModal";
import FormInputItem from "@/components/molecule/FormInputItem";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface ICategoryModalProps extends IBaseModal {
  isEditMode: boolean;
  onConfirm: (newCategoryName: string) => void;
  defaultValues?: {
    name: string;
  };
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Category name is required.",
  }),
});

export default function CategoryModal(props: ICategoryModalProps) {
  const { isEditMode, onConfirm, defaultValues } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onConfirm(values.name);
  }

  useEffect(() => {
    if (!props.open) {
      form.reset();
    }
  }, [props.open]);

  useEffect(() => {
    if (isEditMode && defaultValues) {
      form.setValue("name", defaultValues.name);
    } else {
      form.setValue("name", "");
    }
  }, [isEditMode, defaultValues]);

  return (
    <BaseModal
      {...props}
      title={isEditMode ? "Edit Category" : "Add Category"}
      description={
        isEditMode
          ? "Make changes to the category details."
          : "Add a new category to organize your products."
      }
      submitText={isEditMode ? "Update" : "Create"}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className=" space-y-5">
            <FormInputItem
              form={form}
              name="name"
              label="Category Name"
              placeholder="Enter category name"
            />
          </fieldset>
        </form>
      </Form>
    </BaseModal>
  );
}
