import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";

import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FormInputItem from "./FormInputItem";

// ---------------- Schema ----------------
const statItemSchema = z.object({
  value: z.string().min(1, "Value is required"),
  label: z.string().min(1, "Label is required"),
});

const statsFormSchema = z.object({
  value: z.array(statItemSchema).min(1, "At least one stat is required"),
});

// ---------------- Types ----------------
export type StatItem = z.infer<typeof statItemSchema>;

interface StaticValueLabelToolProps {
  sectionKey: string;
  defaultValue?: StatItem[];
  onSave?: (jsonValue: StatItem[]) => void;
}

// ---------------- Component ----------------
export default function StaticValueLabelTool({
  sectionKey,
  defaultValue,
  onSave,
}: StaticValueLabelToolProps) {
  const form = useForm<any>({
    resolver: zodResolver(statsFormSchema),
    shouldUnregister: true,
    defaultValues: {
      value:
        defaultValue && defaultValue.length
          ? defaultValue
          : [{ value: "", label: "" }],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "value",
  });

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
          {fieldArray.fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-2xl border p-4 space-y-4 shadow-sm"
            >
              <h2 className="font-medium">Stat {index + 1}</h2>

              <div className="grid grid-cols-2 gap-4">
                <FormInputItem
                  form={form}
                  name={`value.${index}.value`}
                  label="Value"
                  placeholder="e.g. 10+"
                />

                <FormInputItem
                  form={form}
                  name={`value.${index}.label`}
                  label="Label"
                  placeholder="e.g. Years of Experience"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => fieldArray.remove(index)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => fieldArray.append({ value: "", label: "" })}
            >
              <Plus />
            </Button>

            <Button type="submit">Save Section</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
