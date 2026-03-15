"use client";

import TiptapEditor from "../organism/TipTapEditor";
import FormItemWrapper from "./FormInputWrapper";
import { IBaseInput } from "@/types/input.type";

interface IFormItemRichTextEditorProps extends IBaseInput {
  editorClassName?: string;
}

export default function FormRichTextEditor({
  form,
  name,
  label,
  required,
  editorClassName,
}: IFormItemRichTextEditorProps) {
  return (
    <FormItemWrapper form={form} name={name} label={label} required={required}>
      {(field) => (
        <TiptapEditor value={field.value} onChange={field.onChange} />
      )}
    </FormItemWrapper>
  );
}
