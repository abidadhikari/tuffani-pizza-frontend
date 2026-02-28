import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";
import Image from "next/image";

interface FormImageUploaderProps extends IBaseInput {
  aspectRatio?: "1/1" | "16/9" | "4/3";
  accept?: string;
}

const aspectRatioClasses = {
  "1/1": "aspect-square",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
};

export default function FormImageUploader({
  form,
  name,
  label,
  required,
  aspectRatio = "1/1",
  accept = "image/*",
}: FormImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(name, file, {
        shouldDirty: true,
        shouldValidate: true,
      });

      const value = file;

      // If it's already a URL (edit mode)
      if (typeof value === "string") {
        setPreview(value);
        return;
      }

      // If it's a File
      if (value instanceof File) {
        const url = URL.createObjectURL(value);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  };

  const currentValue = form.watch(name);

  useEffect(() => {
    setPreview(currentValue);
  }, [currentValue]);

  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => (
        <div className="space-y-2">
          <label
            className={cn(
              "relative flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer overflow-hidden hover:border-primary transition",
              aspectRatioClasses[aspectRatio],
            )}
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                className="object-cover size-10"
                fill
              />
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                <p>Click to upload image</p>
                <p className="text-xs">(PNG, JPG, WEBP)</p>
              </div>
            )}

            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
          </label>

          {/* {preview && (
            <button
              type="button"
              className="text-xs text-destructive underline"
              onClick={() => {
                form.setValue(name, null, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                setPreview(null);
              }}
            >
              Remove image
            </button>
          )} */}
        </div>
      )}
    </FormItemWrapper>
  );
}
