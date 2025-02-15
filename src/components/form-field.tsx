"use client";

import React from "react";
import { Controller, FieldValues, UseFormReturn, Path } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label: string;
  type: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (field: any) => React.ReactNode;
  min?: number;
  max?: number;
}

export const FormFieldComponent = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  render,
  min,
  max,
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {render ? (
              render(field)
            ) : (
              <Input
                type={type}
                min={min}
                max={max}
                placeholder={placeholder}
                {...field}
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
