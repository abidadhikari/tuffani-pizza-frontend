"use client";

import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";
import AppSelect from "./AppSelect";

interface Option {
  label: string;
  value: string;
}

interface IFormSelectItemProps extends IBaseInput {
  data: Option[];
  placeholder?: string;
}

export default function FormSelectItem({
  form,
  name,
  label,
  required,
  data,
  placeholder = "Select option",
}: IFormSelectItemProps) {
  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => (
        <AppSelect
          data={data}
          placeholder={placeholder}
          value={field.value}
          onChange={field.onChange}
          className="w-full"
        />
      )}
    </FormItemWrapper>
  );
}
