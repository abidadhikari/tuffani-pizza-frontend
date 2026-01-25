import { cn } from "@/lib/utils";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";
import { Textarea } from "../ui/textarea";

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
            className={cn("rounded-3xl", className)}
          />
        </div>
      )}
    </FormItemWrapper>
  );
}
