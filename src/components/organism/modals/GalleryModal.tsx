import BaseModal, { IBaseModal } from "@/components/molecule/BaseModal";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormSwitch from "@/components/molecule/FormSwitch";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import FormImageUploader from "@/components/molecule/FormImageUploader";

const schema = z.object({
  title: z.string().min(1),
  image: z.any().optional(),
  isVisible: z.boolean().optional(),
});

interface Props extends IBaseModal {
  onConfirm: (data: z.infer<typeof schema>) => void;
  defaultValues?: Partial<z.infer<typeof schema>>;
}

export default function GalleryModal(props: Props) {
  const { onConfirm } = props;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!props.open) form.reset();
  }, [props.open]);

  return (
    <BaseModal
      {...props}
      title={"Add Gallery Item"}
      submitText={"Create"}
      onSubmit={form.handleSubmit(onConfirm)}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormSwitch form={form} name="isVisible" label="Visible on site" />
          <FormInputItem form={form} name="title" label="Title" />

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
