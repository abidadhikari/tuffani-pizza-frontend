"use client";
import Button from "@/components/atom/Button";
import InvalidAuthFlow from "@/components/atom/InvalidAuthFlow";
import FormInputItem from "@/components/molecule/FormInputItem";
import { Form } from "@/components/ui/form";
import { useResetPassword } from "@/hooks/services/auth/useResetPassword";
import { usePostRegister } from "@/hooks/services/usePostRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z
  .object({
    email: z.email("Invalid email address."),
    otp: z
      .string()
      .min(6, "OTP must be at least 6 characters.")
      .max(6, "OTP must be at most 6 characters."),
    password: z
      .string("Password is required.")
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string("Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      data.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      path: ["password"],
    },
  );
export default function ResetPasswordForm() {
  const params = useSearchParams();
  const email = params?.get("email") as string;
  const otp = params?.get("otp") as string;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  if (!email || !otp) {
    return <InvalidAuthFlow />;
  }

  form.setValue("email", email);
  form.setValue("otp", otp);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", {
        message: "Passwords do not match.",
      });
      return;
    }
    resetPassword({
      email: values.email,
      otp: values.otp,
      newPassword: values.password,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4 w-100 max-w-full" disabled={isPending}>
          <h1 className="font-bold text-xl">Reset Password</h1>

          <FormInputItem
            form={form}
            name="password"
            label="New Password"
            placeholder="Enter your new password"
            type="password"
            required
          />
          <FormInputItem
            form={form}
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            type="password"
            required
          />
          <Button
            type="submit"
            className="w-full rounded-full "
            disabled={isPending}
            isLoading={isPending}
          >
            Reset Password
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
