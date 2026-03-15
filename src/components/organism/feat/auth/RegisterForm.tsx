"use client";
import Button from "@/components/atom/Button";
import FormInputItem from "@/components/molecule/FormInputItem";
import { Form } from "@/components/ui/form";
import { usePostRegister } from "@/hooks/services/usePostRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z
  .object({
    email: z.email("Invalid email address."),
    phone: z.string().min(10, "Phone number must be at least 10 characters."),
    name: z.string().min(1, "Name must be at least 1 characters."),
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
export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: register, isPending } = usePostRegister();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", {
        message: "Passwords do not match.",
      });
      return;
    }
    register({
      email: values.email,
      name: values.name,
      password: values.password,
      phone: values.phone,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4 w-100 max-w-full" disabled={isPending}>
          <h1 className="font-bold text-xl">Register New Account</h1>
          <FormInputItem
            form={form}
            name="name"
            label="Name"
            placeholder="Enter your name"
            required
          />
          <FormInputItem
            form={form}
            name="email"
            label="Email"
            placeholder="Enter your email"
            required
          />
          <FormInputItem
            form={form}
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
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
          <FormInputItem
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
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
            Register
          </Button>
          <div className="text-sm text-center w-full pt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-brand">
              Login now
            </Link>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
