"use client";
import Button from "@/components/atom/Button";
import InvalidAuthFlow from "@/components/atom/InvalidAuthFlow";
import FormInputItem from "@/components/molecule/FormInputItem";
import { Form } from "@/components/ui/form";
import { usePostForgotPassword } from "@/hooks/services/auth/usePostForgotPassword";
import { useVerifyAccount } from "@/hooks/services/auth/useVerifyAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z
    .email("Invalid email address.")
    .min(1, "Email must be at least 1 characters."),
  otp: z
    .string()
    .min(6, "OTP must be at least 6 characters.")
    .max(6, "OTP must be at most 6 characters."),
});

export default function VerifyOTPForm() {
  const params = useSearchParams();
  const email = params?.get("email") as string;
  const type = params?.get("type") as string;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: verifyAccount, isPending } = useVerifyAccount();

  if (!email) {
    return <InvalidAuthFlow />;
  }

  form.setValue("email", email);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "reset") {
      router.push(
        "/reset-password?email=" + values.email + "&otp=" + values.otp,
      );
    } else {
      verifyAccount({
        email: values.email,
        otp: values.otp,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4 w-100 max-w-full" disabled={isPending}>
          <h1 className="font-bold text-xl">OTP Verification</h1>
          <FormInputItem
            form={form}
            name="otp"
            type="text"
            label="OTP"
            placeholder="Enter your OTP"
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
