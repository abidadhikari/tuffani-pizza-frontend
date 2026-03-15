"use client";

import Button from "@/components/atom/Button";
import Title from "@/components/atom/Title";
import FormInputItem from "@/components/molecule/FormInputItem";
import { Form } from "@/components/ui/form";
import { useUpdateMe } from "@/hooks/services/users/useUpdateMe";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 characters.")
    .max(10, "Phone number must be at most 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

interface IUserProfileForm {
  defaultValues?: {
    name: string;
    phone: string;
  };
}

function UserProfileForm({ defaultValues }: IUserProfileForm) {
  const { mutate: updateMe, isPending: isUpdating } = useUpdateMe();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: defaultValues?.name ?? "",
      phone: defaultValues?.phone ?? "",
    },
  });

  function onSubmit(values: FormValues) {
    const payload = {
      ...values,
    };

    updateMe({
      name: payload.name,
      phone: payload.phone,
    });
  }

  const isPending = isUpdating;

  return (
    <section className="space-y-5">
      <Title variant="h2">Update User Profile</Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="space-y-5" disabled={isPending}>
            <div className="grid grid-cols-2 gap-5">
              <FormInputItem
                form={form}
                name="name"
                label="Name"
                placeholder=""
              />

              <FormInputItem
                form={form}
                name="phone"
                label="Phone Number"
                type="number"
                placeholder=""
              />
            </div>

            <div className="flex justify-end gap-3 bg-white">
              <Button type="submit" isLoading={isPending}>
                Update
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </section>
  );
}

export default memo(UserProfileForm);
