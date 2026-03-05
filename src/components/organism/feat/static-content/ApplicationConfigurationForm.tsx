"use client";

import Button from "@/components/atom/Button";
import FormInputItem from "@/components/molecule/FormInputItem";
import FormTextAreaInputItem from "@/components/molecule/FormTextAreaInputItem";
import { Form } from "@/components/ui/form";
import { useUpdateStaticContent } from "@/hooks/services/static-content/useUpdateStaticContent";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone number required"),
  address: z.string().min(1, "Address required"),
  openingHours: z.string().min(1, "Opening hours required"),

  socialMediaLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    tiktok: z.string().optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface IApplicationConfigForm {
  defaultValues?: FormValues;
}

function ApplicationConfigForm({ defaultValues }: IApplicationConfigForm) {
  const { mutate, isPending } = useUpdateStaticContent();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      email: defaultValues?.email ?? "",
      phoneNumber: defaultValues?.phoneNumber ?? "",
      address: defaultValues?.address ?? "",
      openingHours: defaultValues?.openingHours ?? "",
      socialMediaLinks: {
        facebook: defaultValues?.socialMediaLinks?.facebook ?? "",
        twitter: defaultValues?.socialMediaLinks?.twitter ?? "",
        instagram: defaultValues?.socialMediaLinks?.instagram ?? "",
        linkedin: defaultValues?.socialMediaLinks?.linkedin ?? "",
        tiktok: defaultValues?.socialMediaLinks?.tiktok ?? "",
      },
    },
  });

  function onSubmit(values: FormValues) {
    mutate({
      key: STATIC_CONTENT_KEYS.APPLICATION_CONFIG,
      body: {
        value: values as unknown as JSON,
      },
    });
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="space-y-6 " disabled={isPending}>
            <div className="grid grid-cols-2 gap-5">
              <FormInputItem
                form={form}
                name="email"
                label="Email"
                placeholder="support@example.com"
              />

              <FormInputItem
                form={form}
                name="phoneNumber"
                label="Phone Number"
                placeholder="+977-XXXXXXXXXX"
              />
            </div>

            <FormTextAreaInputItem form={form} name="address" label="Address" />

            <FormInputItem
              form={form}
              name="openingHours"
              label="Opening Hours"
              placeholder="Mon - Fri : 9AM - 6PM"
            />

            <div className="space-y-4">
              <h3 className="font-semibold">Social Media Links</h3>

              <FormInputItem
                form={form}
                name="socialMediaLinks.facebook"
                label="Facebook"
                placeholder="https://facebook.com/..."
              />

              {/* <FormInputItem
                form={form}
                name="socialMediaLinks.twitter"
                label="Twitter"
              /> */}

              <FormInputItem
                form={form}
                name="socialMediaLinks.instagram"
                label="Instagram"
              />

              {/* <FormInputItem
                form={form}
                name="socialMediaLinks.linkedin"
                label="LinkedIn"
              /> */}

              <FormInputItem
                form={form}
                name="socialMediaLinks.tiktok"
                label="TikTok"
              />
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" isLoading={isPending}>
                Update Configuration
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </section>
  );
}

export default memo(ApplicationConfigForm);
