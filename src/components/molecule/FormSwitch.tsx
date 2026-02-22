"use client";

import FormItemWrapper from "./FormInputWrapper";
import { MySwitch } from "../atom/MySwitch";
import { IBaseInput } from "@/types/input.type";

interface FormSwitchProps extends IBaseInput {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export default function FormSwitch({
  form,
  name,
  label,
  description,
  disabled,
}: FormSwitchProps) {
  return (
    <FormItemWrapper form={form} name={name} label={label}>
      {(field) => (
        <div className="">
          <MySwitch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
        </div>
      )}
    </FormItemWrapper>
  );
}
