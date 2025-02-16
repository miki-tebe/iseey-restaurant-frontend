import React from "react";
import { Controller, UseFormReturn, Path, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from "./image-upload";

interface FileInputProps<T extends FieldValues> {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label: string;
  isUrl: boolean;
  type: "food" | "drink" | "restaurant";
}

export const FileInput = <T extends FieldValues>({
  control,
  name,
  label,
  isUrl,
  type,
}: FileInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isUrl ? (
              <Input placeholder={`${label} URL`} {...field} />
            ) : (
              <ImageUpload
                onUploadComplete={(imageUrl) => {
                  console.log("Image uploaded:", imageUrl);
                  field.onChange(imageUrl);
                }}
                type={type}
              />
            )}
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
