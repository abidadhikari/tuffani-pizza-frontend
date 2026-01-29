import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";

export interface CheckboxOption {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  orientation?: "horizontal" | "vertical";
}

export default function CheckboxGroup({
  options,
  value,
  onChange,
  orientation = "horizontal",
}: CheckboxGroupProps) {
  const toggleValue = (id: string, checked: boolean) => {
    if (checked) {
      onChange([...value, id]);
    } else {
      onChange(value.filter((v) => v !== id));
    }
  };

  return (
    <div
      className={`flex flex-wrap ${orientation === "horizontal" ? "gap-4" : "flex-col gap-2"}`}
    >
      {options.map((option) => (
        <Field
          key={option.id}
          orientation={orientation}
          className="whitespace-nowrap "
        >
          <Checkbox
            id={option.id}
            checked={value.includes(option.id)}
            onCheckedChange={(checked) =>
              toggleValue(option.id, Boolean(checked))
            }
          />
          <FieldLabel htmlFor={option.id}>{option.label}</FieldLabel>
        </Field>
      ))}
    </div>
  );
}
