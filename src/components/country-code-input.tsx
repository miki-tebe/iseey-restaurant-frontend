"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { countries } from "@/lib/countries-data"
import { Country } from "@/lib/countries-data"
import { Controller, FieldValues, UseFormReturn, Path, ControllerRenderProps } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useStore } from "@/hooks/use-edit-profile-store"


interface CountryCodeInputProps<T extends FieldValues> {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled: boolean;
}

export const CountryCodeInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  min,
  max,
  disabled,
}: CountryCodeInputProps<T>) => {
  const {updateCountryCode, countryCode} = useStore()
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<T, Path<T>>) => {
      const value = e.target.value;
      const filteredValue = value.replace(/[^0-9]/g, '');
      if(filteredValue.length > 9) return;
      field.onChange({
        ...e,
        target: {
          ...e.target,
          value: filteredValue
        }
      });
    };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <FormControl>
          <div className="flex gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[110px] justify-between"
                  disabled={disabled}
                >
                  <div className="flex items-center gap-1 truncate">
                    <span className="mr-1">{countryCode.flag}</span>
                    <span>{countryCode.dial_code}</span>
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                      {countries.map((country: Country) => (
                        <CommandItem
                          key={country.code}
                          value={`${country.name} ${country.dial_code} ${country.code}`}
                          onSelect={() => {
                            updateCountryCode(country)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              country.code === countryCode.code ? "opacity-100" : "opacity-0",
                            )}
                          />
                          <span className="mr-2">{country.flag}</span>
                          <span>{country.name}</span>
                          <span className="ml-auto text-sm text-muted-foreground">{country.dial_code}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            <Input
              type="tel"
              min={min}
              max={max}
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              onChange={(e) => handleInputChange(e, field)}
              value={field.value || ''}

              className="flex-1"
            />
          </div>
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  )
}

