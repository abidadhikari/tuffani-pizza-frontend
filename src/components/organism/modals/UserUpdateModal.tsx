"use client";

import { BaseUserResponseDto } from "@/client";
import BaseModal, { IBaseModal } from "@/components/molecule/BaseModal";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormSelectItem from "@/components/molecule/FormSelectItem";
import { Form } from "@/components/ui/form";
import { ROLES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  phone: z.string().optional(),
  role: z.enum([ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN]),
  status: z.enum(["ACTIVE", "INACTIVE", "INVITED", "BANNED"]),
  isVerified: z.enum(["true", "false"]),
});

type FormValues = z.infer<typeof formSchema>;

interface IUserUpdateModalProps extends IBaseModal {
  defaultValues?: BaseUserResponseDto | null;
  onConfirm: (data: {
    name: string;
    phone?: string;
    role: "SUPER_ADMIN" | "ADMIN" | "USER";
    status: "ACTIVE" | "INACTIVE" | "INVITED" | "BANNED";
    isVerified: boolean;
  }) => void;
  isPending?: boolean;
}

const toPhoneString = (phone: BaseUserResponseDto["phone"] | undefined) => {
  if (!phone) return "";
  if (typeof phone === "string") return phone;

  const normalizedPhone = (phone as Record<string, unknown>).phone;
  if (typeof normalizedPhone === "string") return normalizedPhone;

  return "";
};

export default function UserUpdateModal(props: IUserUpdateModalProps) {
  const { onConfirm, isPending, defaultValues } = props;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: ROLES.USER,
      status: "ACTIVE",
      isVerified: "false",
      phone: "",
      name: "",
    },
  });

  useEffect(() => {
    if (!props.open) {
      form.reset({
        role: ROLES.USER,
        status: "ACTIVE",
        isVerified: "false",
        phone: "",
        name: "",
      });
      return;
    }

    if (!defaultValues) return;

    form.reset({
      name: defaultValues.name ?? "",
      phone: toPhoneString(defaultValues.phone),
      role:
        defaultValues.role === ROLES.SUPER_ADMIN
          ? ROLES.SUPER_ADMIN
          : defaultValues.role === ROLES.ADMIN
            ? ROLES.ADMIN
            : ROLES.USER,
      status:
        defaultValues.status === "BANNED"
          ? "BANNED"
          : defaultValues.status === "INACTIVE"
            ? "INACTIVE"
            : defaultValues.status === "INVITED"
              ? "INVITED"
              : "ACTIVE",
      isVerified: defaultValues.isVerified ? "true" : "false",
    });
  }, [props.open, defaultValues, form]);

  const onSubmit = (values: FormValues) => {
    onConfirm({
      name: values.name,
      phone: values.phone,
      role: values.role as "SUPER_ADMIN" | "ADMIN" | "USER",
      status: values.status,
      isVerified: values.isVerified === "true",
    });
  };

  return (
    <BaseModal
      {...props}
      title="Update User"
      description="Update role, status, verification, and profile details."
      submitText="Update User"
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
              name="phone"
              label="Phone"
              placeholder="Enter phone number"
            />

            <FormSelectItem
              form={form}
              name="role"
              label="Role"
              data={[
                { label: "User", value: ROLES.USER },
                { label: "Admin", value: ROLES.ADMIN },
                { label: "Super Admin", value: ROLES.SUPER_ADMIN },
              ]}
            />

            <FormSelectItem
              form={form}
              name="status"
              label="Status"
              data={[
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" },
                { label: "Invited", value: "INVITED" },
                { label: "Banned", value: "BANNED" },
              ]}
            />

            <FormSelectItem
              form={form}
              name="isVerified"
              label="Verification"
              data={[
                { label: "Verified", value: "true" },
                { label: "Not Verified", value: "false" },
              ]}
            />
          </fieldset>
        </form>
      </Form>
    </BaseModal>
  );
}
