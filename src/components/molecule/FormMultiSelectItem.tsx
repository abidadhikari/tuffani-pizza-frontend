"use client";

import AppMultiSelect from "./AppMultiSelect";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";

interface Option {
  label: string;
  value: string;
}

interface IFormMultiSelectItemProps extends IBaseInput {
  data: Option[];
  placeholder?: string;
  lockedValues?: string[];
  showDynamicPlaceholder?: boolean;
  disabled?: boolean;
}

export default function FormMultiSelectItem({
  form,
  name,
  label,
  required,
  data,
  placeholder,
  lockedValues,
  showDynamicPlaceholder,
  disabled,
}: IFormMultiSelectItemProps) {
  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => (
        <AppMultiSelect
          data={data}
          value={field.value || []}
          onChange={field.onChange}
          placeholder={placeholder}
          lockedValues={lockedValues}
          showDynamicPlaceholder={showDynamicPlaceholder}
          disabled={disabled}
        />
      )}
    </FormItemWrapper>
  );
}
