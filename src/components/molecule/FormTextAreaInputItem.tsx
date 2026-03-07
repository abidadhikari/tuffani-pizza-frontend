import { cn } from "@/lib/utils";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface IFormTextAreaInputItemProps extends IBaseInput {
  maxLength?: number;
  icon?: React.ReactNode;
  className?: string;
}

export default function FormTextAreaInputItem({
  form,
  name,
  label,
  placeholder,
  required,
  maxLength,
  icon,
  className,
}: IFormTextAreaInputItemProps) {
  const [count, setCount] = useState(0);
  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => (
        <div className="relative w-full">
          <div className="h-full w-5  absolute left-0 grid place-items-center">
            {icon}
          </div>
          <Textarea
            {...field}
            placeholder={placeholder}
            maxLength={maxLength}
            className={cn("", className)}
            onChange={(e) => {
              setCount(e.target.value?.trim()?.length);
              field.onChange(e);
            }}
          />
          <div>
            {maxLength && (
              <span
                className={cn(
                  "text-sm text-black/50 absolute right-2 bottom-1",
                  count === maxLength && "text-red-500",
                )}
              >
                {count}/{maxLength}
              </span>
            )}
          </div>
        </div>
      )}
    </FormItemWrapper>
  );
}
