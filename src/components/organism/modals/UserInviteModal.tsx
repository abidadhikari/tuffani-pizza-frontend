"use client";

import BaseModal, { IBaseModal } from "@/components/molecule/BaseModal";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormSelectItem from "@/components/molecule/FormSelectItem";
import { Form } from "@/components/ui/form";
import { ROLES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface IUserInviteModalProps extends IBaseModal {
  onConfirm: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: "USER" | "ADMIN";
  }) => void;
  isPending?: boolean;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),

  email: z.email({
    message: "Invalid email address.",
  }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),

  phone: z.string().optional(),

  role: z.enum(["USER", "ADMIN"]),
});

export default function UserInviteModal(props: IUserInviteModalProps) {
  const { onConfirm, isPending } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "USER",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onConfirm(values);
  }

  useEffect(() => {
    if (!props.open) {
      form.reset({
        role: "USER",
      });
    }
  }, [props.open]);

  return (
    <BaseModal
      {...props}
      title="Invite User"
      description="Invite a new user to access the admin dashboard."
      submitText="Send Invite"
      onSubmit={form.handleSubmit(onSubmit)}
      loading={isPending}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="space-y-5">
            <FormInputItem
              form={form}
              name="name"
              label="Full Name"
              placeholder="Enter full name"
            />

            <FormInputItem
              form={form}
              name="email"
              label="Email"
              placeholder="Enter email address"
            />

            <FormInputItem
              form={form}
              name="password"
              type="password"
              label="Password"
              placeholder="Enter temporary password"
            />

            <FormInputItem
              form={form}
              name="phone"
              label="Phone (Optional)"
              placeholder="Enter phone number"
            />

            <FormSelectItem
              form={form}
              name="role"
              label="Role"
              data={[
                { label: "User", value: ROLES.USER },
                { label: "Admin", value: ROLES.ADMIN },
              ]}
            />
          </fieldset>
        </form>
      </Form>
    </BaseModal>
  );
}
