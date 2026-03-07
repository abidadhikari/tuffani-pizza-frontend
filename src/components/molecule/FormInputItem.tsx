import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";
import { Eye, EyeOff } from "lucide-react";

interface IFormInputItemProps extends IBaseInput {
  showEyeHandler?: boolean;
  type?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "date"
    | "datetime-local"
    | "time";
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
  const [showEyeHandler, setShowEyeHandler] = useState(false);
  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => (
        <div className="relative w-full">
          <Input
            {...field}
            placeholder={placeholder}
            type={type === "password" ? (showEyeHandler ? "text" : type) : type}
            maxLength={maxLength}
            className={cn(" ")}
          />
          {type === "password" && (
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => {
                setShowEyeHandler(!showEyeHandler);
              }}
            >
              {showEyeHandler ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </span>
          )}
        </div>
      )}
    </FormItemWrapper>
  );
}
