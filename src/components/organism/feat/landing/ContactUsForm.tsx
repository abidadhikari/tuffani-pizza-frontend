"use client";
import Button from "@/components/atom/Button";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  fullname: z.string().min(1, "Fullname must be at least  characters."),

  email: z
    .email("Invalid email address.")
    .min(1, "Email must be at least 1 characters."),
  phonenumber: z.string().min(10, "Valid Phone Number is required."),
  address: z.string().min(1, "Address must be at least 1 characters."),
  message: z.string().min(1, "Message must be at least 1 characters."),
});

export default function ContactUsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phonenumber: "",
      address: "",
      message: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4">
          <div className="flex flex-col md:grid grid-cols-2 gap-6">
            <FormInputItem
              form={form}
              name="fullname"
              label="Fullname"
              placeholder="Enter your fullname"
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
              name="phonenumber"
              label="Phone Number"
              placeholder="Enter your phone number"
              required
            />
            <FormInputItem
              form={form}
              name="address"
              label="Address"
              placeholder="Enter your address"
              required
            />
            <div className="col-span-2">
              <FormTextAreaInputItem
                form={form}
                name="message"
                label="Message"
                placeholder="Enter your message"
              />
            </div>
          </div>

          <Button type="submit" className="w-full rounded-full ">
            Send a Message
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
