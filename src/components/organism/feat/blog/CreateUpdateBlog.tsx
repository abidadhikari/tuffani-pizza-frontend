"use client";

import Button from "@/components/atom/Button";
import FormImageUploader from "@/components/molecule/FormImageUploader";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormRichTextEditor from "@/components/molecule/FormRichTextInputItem";
import FormSwitch from "@/components/molecule/FormSwitch";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";
import { Form } from "@/components/ui/form";
import { useCreateBlog } from "@/hooks/services/blogs/useCreateBlog";
import { usePatchBlog } from "@/hooks/services/blogs/usePatchBlog";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  title: z.string().trim().min(1, "Blog title is required."),
  slug: z.string().trim().min(1, "Slug is required."),
  description: z.string().trim().min(1, "Description is required."),
  content: z.string().min(1, "Content is required."),
  isVisible: z.boolean().optional(),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ICreateUpdateProduct {
  id?: string;
  type?: "create" | "update";
  defaultValues?: {
    title: string;
    description: string;
    content: string;
    slug: string;
    isVisible?: boolean;
    image?: string;
  };
}

function CreateUpdateProduct({
  id,
  type = "create",
  defaultValues,
}: ICreateUpdateProduct) {
  const { mutate: patchBlog, isPending: isUpdating } = usePatchBlog();
  const { mutate: createBlog, isPending: isCreating } = useCreateBlog(() => {});

  // 1. Reactive values: This handles the "sometimes selected" issue.
  // When categories load or defaultValues arrive, useForm will automatically re-sync.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      description: defaultValues?.description ?? "",
      content: defaultValues?.content ?? "",
      isVisible: defaultValues?.isVisible ?? false,
      image: defaultValues?.image ?? "",
    },
  });

  function onSubmit(values: FormValues) {
    const payload = {
      ...values,
    };

    if (type === "create") {
      createBlog({
        body: {
          title: payload.title,
          slug: payload.slug,
          description: payload.description,
          content: payload.content,
          isVisible: !!payload.isVisible,
          image: payload.image,
        },
      });
    } else {
      if (!id) {
        alert("Blog ID is required for update operation.");
        return;
      }

      patchBlog({ id, body: payload });
    }
  }

  const isPending = isCreating || isUpdating;

  return (
    <section>
      {/* <pre>{JSON.stringify(form.getValues(), null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(defaultValues, null, 2)}</pre> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="space-y-5" disabled={isPending}>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-5">
                <FormSwitch form={form} name="isVisible" label="Visible" />

                <FormInputItem
                  form={form}
                  name="title"
                  label="Blog Title"
                  placeholder="Title should be catchy and descriptive"
                />

                <FormInputItem
                  form={form}
                  name="slug"
                  label="Slug"
                  placeholder="Unique URL-friendly identifier"
                />
                <FormTextAreaInputItem
                  form={form}
                  name="description"
                  label="Description"
                />
              </div>
              <FormImageUploader
                form={form}
                name="image"
                label="Blog Image"
                aspectRatio="16/9"
              />
            </div>

            <FormRichTextEditor form={form} name="content" label="Content" />

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
