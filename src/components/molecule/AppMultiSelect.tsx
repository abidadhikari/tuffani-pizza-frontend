// "use client";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Check, X } from "lucide-react";

// interface Option {
//   label: string;
//   value: string;
// }

// interface AppMultiSelectProps {
//   data: Option[];
//   value?: string[];
//   onChange?: (value: string[]) => void;
//   placeholder?: string;
//   lockedValues?: string[];
//   showDynamicPlaceholder?: boolean;
//   disabled?: boolean;
// }

// export default function AppMultiSelect({
//   data,
//   value = [],
//   onChange,
//   placeholder = "Select options",
//   lockedValues = [],
//   showDynamicPlaceholder = true,
//   disabled = false,
// }: AppMultiSelectProps) {
//   const toggleValue = (val: string) => {
//     if (!onChange) return;
//     if (lockedValues.includes(val)) return;

//     onChange(
//       value.includes(val) ? value.filter((v) => v !== val) : [...value, val],
//     );
//   };

//   const removeValue = (val: string) => {
//     if (lockedValues.includes(val)) return;
//     onChange?.(value.filter((v) => v !== val));
//   };

//   const selectedOptions = data.filter((opt) => value.includes(opt.value));

//   return (
//     <div className="space-y-2">
//       {/* Select */}
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             className="w-full justify-between"
//             type="button"
//             disabled={disabled}
//           >
//             {showDynamicPlaceholder
//               ? selectedOptions.map((opt) => opt.label).join(", ") ||
//                 placeholder
//               : placeholder}
//           </Button>
//         </PopoverTrigger>

//         <PopoverContent
//           className="w-full p-1"
//           align="start"
//           onOpenAutoFocus={(e) => e.preventDefault()}
//         >
//           <div className="max-h-60 overflow-y-auto">
//             {data.map((opt) => {
//               const checked = value.includes(opt.value);
//               const locked = lockedValues.includes(opt.value);

//               return (
//                 <button
//                   key={opt.value}
//                   type="button"
//                   disabled={locked}
//                   onClick={() => toggleValue(opt.value)}
//                   className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent disabled:opacity-50"
//                 >
//                   <span className="flex h-4 w-4 items-center justify-center border rounded-sm">
//                     {checked && <Check className="h-3 w-3" />}
//                   </span>
//                   {opt.label}
//                   {locked && (
//                     <span className="ml-auto text-xs text-muted-foreground">
//                       locked
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </PopoverContent>
//       </Popover>

//       {/* Selected Chips */}
//       {selectedOptions.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           {selectedOptions.map((opt) => {
//             const locked = lockedValues.includes(opt.value);

//             return (
//               <span
//                 key={opt.value}
//                 className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
//               >
//                 {opt.label}
//                 {!locked && (
//                   <button
//                     type="button"
//                     onClick={() => removeValue(opt.value)}
//                     disabled={disabled}
//                     className="hover:text-destructive cursor-pointer disabled:cursor-not-allowed disabled:hover:text-black "
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 )}
//               </span>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

export default function AppMultiSelect() {
  return <div>AppMultiSelect</div>;
}
