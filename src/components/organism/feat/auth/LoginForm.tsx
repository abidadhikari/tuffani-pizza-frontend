"use client";
import Button from "@/components/atom/Button";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";
import { Form } from "@/components/ui/form";
import { useCreateContact } from "@/hooks/services/contacts/useCreateContact";
import { usePostLogin } from "@/hooks/services/auth/usePostLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z
    .email("Invalid email address.")
    .min(1, "Email must be at least 1 characters."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: login, isPending } = usePostLogin();

  function onSubmit(values: z.infer<typeof formSchema>) {
    login({
      email: values.email,
      password: values.password,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4 w-100 max-w-full" disabled={isPending}>
          <h1 className="font-bold text-xl">Login to your account</h1>
          <FormInputItem
            form={form}
            name="email"
            label="Email"
            placeholder="Enter your email"
            required
          />
          <FormInputItem
            form={form}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
          />
          <div className="-mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-right w-full block font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full "
            disabled={isPending}
            isLoading={isPending}
          >
            Login
          </Button>
          <div className="text-sm text-center w-full pt-5">
            Don’t have and account yet?{" "}
            <Link href="/register" className="text-brand">
              Sign up
            </Link>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
