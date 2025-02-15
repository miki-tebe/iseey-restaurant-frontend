"use client";

import React from "react";
import { Controller, UseFormReturn, Path, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Autocomplete from "react-google-autocomplete";

interface AutocompleteFieldProps<T extends FieldValues> {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label: string;
  apiKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPlaceSelected: (place: any) => void;
}

export const AutocompleteField = <T extends FieldValues>({
  control,
  name,
  label,
  apiKey,
  onPlaceSelected,
}: AutocompleteFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Autocomplete
              apiKey={apiKey}
              onPlaceSelected={(place) => {
                if (place && place.geometry) {
                  // const { lat, lng } = place.geometry.location;
                  // field.onChange(place.formatted_address);
                  onPlaceSelected(place);
                }
              }}
              options={{
                types: ["establishment"],
              }}
              value={field.value || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
