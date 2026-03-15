import BaseModal, { IBaseModal } from "@/components/molecule/BaseModal";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormSwitch from "@/components/molecule/FormSwitch";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import FormImageUploader from "@/components/molecule/FormImageUploader";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";

const schema = z.object({
  name: z.string().min(1),
  designation: z.string().min(1),
  title: z.string().min(1),
  testimonial: z.string().min(1),
  image: z.any().optional(),
  isVisible: z.boolean().optional(),
});

interface Props extends IBaseModal {
  isEditMode: boolean;
  onConfirm: (data: z.infer<typeof schema>) => void;
  defaultValues?: Partial<z.infer<typeof schema>>;
}

export default function TestimonialModal(props: Props) {
  const { isEditMode, onConfirm, defaultValues } = props;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    if (!props.open) form.reset();
  }, [props.open]);

  useEffect(() => {
    if (isEditMode && defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        form.setValue(key as any, value as any);
      });
    }
  }, [isEditMode, defaultValues]);

  return (
    <BaseModal
      {...props}
      title={isEditMode ? "Edit Testimonial" : "Add Testimonial"}
      submitText={isEditMode ? "Update" : "Create"}
      onSubmit={form.handleSubmit(onConfirm)}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormSwitch form={form} name="isVisible" label="Visible on site" />
          <FormInputItem form={form} name="name" label="Name" />
          <FormInputItem form={form} name="designation" label="Designation" />
          <FormInputItem form={form} name="title" label="Title" />
          <FormTextAreaInputItem
            form={form}
            name="testimonial"
            label="Testimonial"
          />
          <FormImageUploader
            form={form}
            name="image"
            label="User Image"
            aspectRatio="1/1"
            required={false}
          />
        </form>
      </Form>
    </BaseModal>
  );
}
