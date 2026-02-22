import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";

interface IFormInputItemProps extends IBaseInput {
  showEyeHandler?: boolean;
  type?: "text" | "number" | "email" | "password" | "tel";
  maxLength?: number;
  icon?: React.ReactNode;
}

export default function FormAuthInputItem({
  form,
  name,
  label,
  placeholder,
  required,
  showEyeHandler = true,
  type = "text",
  maxLength,
  icon,
}: IFormInputItemProps) {
  const [showPassword, setShowPassword] = useState(type !== "password");

  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => (
        <div className="relative w-full">
          <div className="h-full w-5  absolute left-0 grid place-items-center">
            {icon}
          </div>
          <Input
            {...field}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            maxLength={maxLength}
            className={cn(
              "border-0 border-b-2 border-black outline-0 ring-0 shadow-none focus:border-black! focus:outline-0! focus:ring-0!  rounded-none  pl-8"
            )}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      )}
    </FormItemWrapper>
  );
}
