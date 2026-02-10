"use client";
import Button from "@/components/atom/Button";
import FormInputItem from "@/components/molecule/FormInputItem";
import HeroSectionWithFoods from "@/components/template/HeroSectionWithFoods";

import { Hourglass, Mail, Map, Phone, PhoneIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";
import MapSection from "@/components/organism/feat/landing/MapSection";

const formSchema = z.object({
  fullname: z.string().min(1, "Fullname must be at least  characters."),

  email: z
    .email("Invalid email address.")
    .min(1, "Email must be at least 1 characters."),
  phonenumber: z.string().min(10, "Valid Phone Number is required."),
  address: z.string().min(1, "Address must be at least 1 characters."),
  message: z.string().min(1, "Message must be at least 1 characters."),
});

const contactInfo = [
  {
    title: "Phone Number",
    value: "+977 9744411211 , 01-5312904",
    description: "Available during opening times for orders",
    icon: Phone,
  },
  {
    title: "Email",
    value: "tufanipizza@gmail.com",
    description:
      "Email us for general inquiries, feedback, or partnership opportunities",
    icon: Mail,
  },
  {
    title: "Location",
    value: "Kathmandu",
    description: "चक्कु बक्कु गल्लि, Kathmandu oppostite to K&K college",
    icon: Map,
  },
  // {
  //   title: "Opening Hours",
  //   value: "",
  //   description: "Available during opening times for orders",
  //   icon: Hourglass,
  // },
];

export default function ContactUsPage() {
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
    <section>
      <HeroSectionWithFoods
        title="Contact Us"
        description="Our team is dedicated to providing the best Tufani experience. Whether you have feedback, an inquiry, or an order question, we are here to help. 
Send us a message, and we will respond as quickly as possible."
      >
        <div className="flex gap-5 py-20 flex-wrap">
          <div className="bg-white p-8 rounded-2xl flex-1">
            <h2 className="font-bold text-3xl mb-11.5">Send a Message</h2>
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
          </div>
          <div className="bg-white p-8 rounded-2xl space-y-[46px] w-[500px] max-w-full">
            {contactInfo.map((item: (typeof contactInfo)[0], index: number) => {
              return (
                <div key={index} className="space-y-2.5">
                  <div className="text-sm text-black/75">{item.title}</div>
                  <div className="flex gap-2">
                    <div className="size-6 grid place-items-center">
                      <item.icon className="text-brand size-4" />
                    </div>
                    <div className="flex flex-col gap-1.75">
                      <div className="font-bold text-base">{item.value}</div>
                      <div className="text-sm text-black/75">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </HeroSectionWithFoods>
      <div>
        <div className="my-width mx-auto py-10 space-y-5">
          {/* <MapSection lat={48.8583736} lng={2.2919064} />
          <MapSection searchText="Tufani Pizza Skywalk Tower Kathmandu" /> */}
          <MapSection searchText="चक्कु बक्कु गल्लि, Kathmandu oppostite to K&K college" />
        </div>
      </div>
    </section>
  );
}
