import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../ui/form";

interface IFormItemWrapperProps {
  form: any;
  name: string;
  label?: string;
  required?: boolean;
  children: (field: any) => React.ReactNode;
}

export default function FormItemWrapper({
  form,
  name,
  label,
  required,

  children,
}: IFormItemWrapperProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col gap-1 ", {})}>
          <div className={cn("flex flex-col gap-2  justify-between w-full")}>
            {label && (
              <FormLabel className="">
                {label}
                {required && <span className="text-secondary3"> *</span>}
              </FormLabel>
            )}

            <FormControl>{children(field)}</FormControl>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
