"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { offerFormSchema, OfferFormType } from "@/schema/offerFormSchema";
import ImageUpload from "@/components/image-upload";
import { useAddOffer } from "@/hooks/use-add-offer";
import { FormFieldComponent } from "@/components/form-field";

export default function AddOffer() {
  const mutation = useAddOffer();

  const form = useForm<z.infer<typeof offerFormSchema>>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      name: "",
      discount: "",
      start_date: "",
      end_date: "",
      currency: "",
      code: "",
      image: "",
      description: "",
    },
  });

  async function onSubmit(values: OfferFormType) {
    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof typeof values;
      if (values[typedKey] === "" || values[typedKey] === undefined) {
        delete values[typedKey];
      }
    });
    values.start_date = new Date(values.start_date).getTime();
    values.end_date = new Date(values.end_date).getTime();
    mutation.mutate(values);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Offer</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <FormFieldComponent<OfferFormType>
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Offer Name"
                  type="text"
                  disabled={mutation.isPending}
                />
                <FormFieldComponent<OfferFormType>
                  control={form.control}
                  name="discount"
                  label="Discount"
                  placeholder="Discount Amount"
                  type="number"
                  disabled={mutation.isPending}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormFieldComponent<OfferFormType>
                  control={form.control}
                  name="start_date"
                  label="Start Date"
                  type="date"
                  disabled={mutation.isPending}
                />

                <FormFieldComponent<OfferFormType>
                  control={form.control}
                  name="end_date"
                  label="End Date"
                  type="date"
                  disabled={mutation.isPending}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="offer_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offer Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        // value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select offer type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="flat">Flat</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormFieldComponent<OfferFormType>
                  control={form.control}
                  name="currency"
                  label="Currency"
                  type="text"
                  disabled={mutation.isPending}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormFieldComponent<OfferFormType>
                  control={form.control}
                  name="code"
                  label="Code"
                  type="text"
                  disabled={mutation.isPending}
                />

                <FormField
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Restaurant Logo</FormLabel>
                      <FormControl>
                        <ImageUpload
                          onUploadComplete={(imageUrl) => {
                            console.log("Image uploaded:", imageUrl);
                            form.setValue("image", imageUrl);
                          }}
                          type="offer"
                          disabled={mutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormFieldComponent<OfferFormType>
                control={form.control}
                name="description"
                label="Description"
                type="text"
                disabled={mutation.isPending}
              />

              <Button disabled={mutation.isPending} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
