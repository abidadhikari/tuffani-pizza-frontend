import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import FormInputItem from "./FormInputItem";
import { Button } from "../ui/button";
import FormTextAreaInputItem from "./FormTextAreaInputItem";
import { Plus, Trash2 } from "lucide-react";
import FormRichTextEditor from "./FormRichTextInputItem";

// ---------------- Schema ----------------
const titleSchema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  highlight: z.string().min(1, "Highlight is required"),
  suffix: z.string().optional(),
});

const itemSchema = z.object({
  title: titleSchema,
  description: z.string().min(1, "Description is required"),
});

const arrayFormSchema = z.object({
  value: z.array(itemSchema),
});

const singleFormSchema = z.object({
  value: itemSchema,
});

// ---------------- Types ----------------
export type StaticItem = z.infer<typeof itemSchema>;

interface StaticTitleDescriptionToolProps {
  sectionKey: string;
  isArray?: boolean;
  defaultValue?: StaticItem | StaticItem[];
  onSave?: (jsonValue: StaticItem | StaticItem[]) => void;
}

// ---------------- Component ----------------
export default function StaticTitleDescriptionTool({
  sectionKey,
  isArray = true,
  defaultValue,
  onSave,
}: StaticTitleDescriptionToolProps) {
  const form = useForm<any>({
    resolver: zodResolver(isArray ? arrayFormSchema : singleFormSchema),
    shouldUnregister: true,
    defaultValues: {
      value: isArray
        ? Array.isArray(defaultValue) && defaultValue.length
          ? defaultValue
          : [
              {
                title: { prefix: "", highlight: "", suffix: "" },
                description: "",
              },
            ]
        : !Array.isArray(defaultValue) && defaultValue
          ? defaultValue
          : {
              title: { prefix: "", highlight: "", suffix: "" },
              description: "",
            },
    },
  });

  const fieldArray = isArray
    ? useFieldArray({
        control: form.control,
        name: "value",
      })
    : null;

  function onSubmit(values: any) {
    onSave?.(values.value);
    console.log("FINAL JSON VALUE", values.value);
  }

  return (
    <div className="space-y-6 shadow-md rounded-lg border p-4">
      <h1 className="text-lg font-semibold bg-gray-200 rounded-sm p-4">
        {sectionKey}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {isArray && fieldArray ? (
            fieldArray.fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-2xl border p-4 space-y-4 shadow-sm"
              >
                <h2 className="font-medium">Item {index + 1}</h2>

                <div className="grid grid-cols-3 gap-4">
                  <FormInputItem
                    form={form}
                    name={`value.${index}.title.prefix`}
                    label="Title Prefix"
                  />

                  <FormInputItem
                    form={form}
                    name={`value.${index}.title.highlight`}
                    label="Title Highlight"
                  />

                  <FormInputItem
                    form={form}
                    name={`value.${index}.title.suffix`}
                    label="Title Suffix (optional)"
                  />
                </div>

                <FormTextAreaInputItem
                  form={form}
                  name={`value.${index}.description`}
                  label="Description"
                />

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size={"sm"}
                    onClick={() => fieldArray.remove(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border p-4 space-y-4 shadow-sm">
              <div className="grid grid-cols-3 gap-4">
                <FormInputItem
                  form={form}
                  name="value.title.prefix"
                  label="Title Prefix"
                />

                <FormInputItem
                  form={form}
                  name="value.title.highlight"
                  label="Title Highlight"
                />

                <FormInputItem
                  form={form}
                  name="value.title.suffix"
                  label="Title Suffix (optional)"
                />
              </div>
              <FormRichTextEditor
                form={form}
                name="value.description"
                label="Description (Rich Text)"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-4">
            {isArray && (
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  fieldArray?.append({
                    title: { prefix: "", highlight: "", suffix: "" },
                    description: "",
                  })
                }
              >
                <Plus />
              </Button>
            )}

            <Button type="submit">Save Section</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
