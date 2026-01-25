import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";

interface IFormInputItemProps extends IBaseInput {
  showEyeHandler?: boolean;
  type?: "text" | "number" | "email" | "password" | "tel";
  maxLength?: number;
  icon?: React.ReactNode;
}

export default function FormInputItem({
  form,
  name,
  label,
  placeholder,
  required,
  type = "text",
  maxLength,
}: IFormInputItemProps) {
  const [showPassword, setShowPassword] = useState(type !== "password");

  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => (
        <div className="relative w-full">
          <Input
            {...field}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            maxLength={maxLength}
            className={cn("rounded-full ")}
          />
        </div>
      )}
    </FormItemWrapper>
  );
}
