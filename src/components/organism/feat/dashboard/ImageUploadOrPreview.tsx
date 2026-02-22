"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/atom/Button";
import { cn } from "@/lib/utils";

interface ImageUploadOrPreviewProps {
  value?: string; // existing image (presigned URL)
  onUpload: (file: File) => Promise<void>; // API call
  disabled?: boolean;
  className?: string;
}

export default function ImageUploadOrPreview({
  value,
  onUpload,
  disabled,
  className,
}: ImageUploadOrPreviewProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [isUploading, setIsUploading] = useState(false);

  // sync when editing existing product
  useEffect(() => {
    if (!selectedFile) {
      setPreview(value ?? null);
    }
  }, [value, selectedFile]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleUpload() {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      await onUpload(selectedFile);
      setSelectedFile(null); // reset after success
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove() {
    setSelectedFile(null);
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className={cn("flex flex-col gap-3 rounded-lg border p-4", className)}>
      {preview ? (
        <div className="relative aspect-video h-100 overflow-hidden rounded-md border">
          <Image
            src={preview}
            alt="Product image"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          No image selected
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        disabled={disabled || isUploading}
        onChange={handleFileChange}
      />

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={disabled || isUploading}
          onClick={() => inputRef.current?.click()}
        >
          Choose Image
        </Button>

        <Button
          type="button"
          disabled={!selectedFile || isUploading}
          isLoading={isUploading}
          onClick={handleUpload}
        >
          Upload
        </Button>

        {preview && (
          <Button
            type="button"
            variant="destructive"
            disabled={isUploading}
            onClick={handleRemove}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
