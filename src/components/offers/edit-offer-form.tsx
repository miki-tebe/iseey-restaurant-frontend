"use client";

import React from "react";
import Image from "next/image";
import { Offer } from "@/types/type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editOfferFormSchema,
  EditOfferFormType,
} from "@/schema/offerEditSchema";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FormFieldComponent } from "@/components/form-field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { useEditOffer } from "@/hooks/use-edit-offer";

export default function EditOfferForm({ offer }: { offer: Offer }) {
  const form = useForm<EditOfferFormType>({
    resolver: zodResolver(editOfferFormSchema),
    defaultValues: {
      name: offer.name,
      discount: offer.discount,
      description: offer.description,
      image: offer.image,
      start_date: new Date(offer.start_date).toISOString().split("T")[0],
      end_date: new Date(offer.end_date).toISOString().split("T")[0],
      code: offer.code,
      offer_type:
        offer.offer_type === "percentage" || offer.offer_type === "flat"
          ? offer.offer_type
          : undefined,
    },
  });

  const mutation = useEditOffer();

  const onSubmit = (data: EditOfferFormType) => {
    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof typeof data;
      if (data[typedKey] === "" || data[typedKey] === undefined) {
        delete data[typedKey];
      }
    });
    data.start_date = new Date(data.start_date).getTime();
    data.end_date = new Date(data.end_date).getTime();
    mutation.mutate({ values: data, id: offer._id });
  };

  return (
    <CardContent>
      {offer.image && (
        <div className="mb-4">
          <Image src={offer.image} alt="Offer Image" width={200} height={200} />
        </div>
      )}
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <FormFieldComponent<EditOfferFormType>
              control={form.control}
              name="name"
              label="Name"
              placeholder="Offer Name"
              type="text"
              disabled={mutation.isPending}
            />
            <FormFieldComponent<EditOfferFormType>
              control={form.control}
              name="discount"
              label="Discount"
              placeholder="Discount Amount"
              type="number"
              disabled={mutation.isPending}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormFieldComponent<EditOfferFormType>
              control={form.control}
              name="start_date"
              label="Start Date"
              type="date"
              disabled={mutation.isPending}
            />

            <FormFieldComponent<EditOfferFormType>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
            <FormFieldComponent<EditOfferFormType>
              control={form.control}
              name="code"
              label="Code"
              type="text"
              disabled={mutation.isPending}
            />
          </div>
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
          <FormFieldComponent<EditOfferFormType>
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
  );
}
