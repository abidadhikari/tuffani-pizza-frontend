import { cn } from "@/lib/utils";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";

const DAYS = [
  { label: "Sun", value: "SUNDAY" },
  { label: "Mon", value: "MONDAY" },
  { label: "Tue", value: "TUESDAY" },
  { label: "Wed", value: "WEDNESDAY" },
  { label: "Thu", value: "THURSDAY" },
  { label: "Fri", value: "FRIDAY" },
  { label: "Sat", value: "SATURDAY" },
];

// interface Props extends IBaseInput {}
type Props = IBaseInput;

export default function FormDaysOfWeekMultiSelect({
  form,
  name,
  label,
  required,
}: Props) {
  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => {
        const selected: string[] = field.value || [];

        const toggleDay = (day: string) => {
          if (selected.includes(day)) {
            field.onChange(selected.filter((d) => d !== day));
          } else {
            field.onChange([...selected, day]);
          }
        };

        return (
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => {
              const isActive = selected.includes(day.value);

              return (
                <button
                  type="button"
                  key={day.value}
                  onClick={() => toggleDay(day.value)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md border transition-all",
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "bg-muted text-muted-foreground hover:bg-accent",
                  )}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        );
      }}
    </FormItemWrapper>
  );
}
