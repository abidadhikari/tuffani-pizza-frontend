import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";

interface Props extends IBaseInput {
  withSeconds?: boolean;
}

export default function FormTimePicker({
  form,
  name,
  label,
  required,
  withSeconds = true,
}: Props) {
  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => {
        const normalizeValue = (value?: string) => {
          if (!value) return "";

          if (value.includes("T")) {
            return new Date(value).toISOString().substring(11, 19);
          }

          return value;
        };

        return (
          <Input
            type="time"
            step={withSeconds ? 1 : 60}
            value={normalizeValue(field.value)}
            onChange={(e) => {
              const value = e.target.value;

              // Ensure HH:mm:ss format
              if (withSeconds && value.length === 5) {
                field.onChange(`${value}:00`);
              } else {
                field.onChange(value);
              }
            }}
            className={cn("w-full")}
          />
        );
      }}
    </FormItemWrapper>
  );
}
