"use client";
import Button from "@/components/atom/Button";
import FormInputItem from "@/components/molecule/FormInputItem";
import { Form } from "@/components/ui/form";
import { usePostForgotPassword } from "@/hooks/services/auth/usePostForgotPassword";
import { usePostLogin } from "@/hooks/services/auth/usePostLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z
    .email("Invalid email address.")
    .min(1, "Email must be at least 1 characters."),
});

export default function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: forgotPassword, isPending } = usePostForgotPassword();

  function onSubmit(values: z.infer<typeof formSchema>) {
    forgotPassword({
      email: values.email,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4 w-100 max-w-full" disabled={isPending}>
          <h1 className="font-bold text-xl">Forgot Password?</h1>
          <FormInputItem
            form={form}
            name="email"
            label="Email"
            placeholder="Enter your email"
            required
          />

          <Button
            type="submit"
            className="w-full rounded-full "
            disabled={isPending}
            isLoading={isPending}
          >
            Send Reset OTP
          </Button>
          <div className="text-sm text-center w-full pt-5">
            Don&apos;t have and account yet?{" "}
            <Link href="/register" className="text-brand">
              Sign up
            </Link>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
