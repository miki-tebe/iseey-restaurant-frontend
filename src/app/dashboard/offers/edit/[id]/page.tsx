"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { getOffer, updateOffer, uploadOfferPhoto } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import Image from "next/image";

export const editOfferFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255)
    .optional(),
  description: z.string().max(500).optional(),
  image: z.string().optional(),
  photo: z.string().optional(), // required for file upload
  code: z.string().max(50).optional(),
  discount: z.union([z.string(), z.number().min(1).max(100)]),
  offer_type: z.enum(["percentage", "fixed"]).optional(),
  start_date: z.union([z.string(), z.number()]),
  end_date: z.union([z.string(), z.number()]),
});

export default function EditOffer({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = params;

  const form = useForm<z.infer<typeof editOfferFormSchema>>({
    resolver: zodResolver(editOfferFormSchema),
  });

  useEffect(() => {
    async function fetchOffer() {
      const offer = await getOffer({ id });
      if (offer) {
        form.reset({
          ...offer,
          start_date: new Date(offer.start_date).toISOString().split("T")[0],
          end_date: new Date(offer.end_date).toISOString().split("T")[0],
        });
        setAvatarSrc(offer.image);
      }
    }
    fetchOffer();
  }, [id, form]);

  async function onSubmit(values: z.infer<typeof editOfferFormSchema>) {
    values.start_date = new Date(values.start_date).getTime();
    values.end_date = new Date(values.end_date).getTime();
    if (values.image == "") delete values.image;
    const result = await updateOffer(values, id);
    toast(result.message);
    if (result.success == true) {
      router.push("/dashboard/offers");
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("picture", file);
      uploadOfferPhoto(formData).then((result) => {
        form.setValue("image", result?.url ?? "");
        setAvatarSrc(result?.url ?? null);
        toast(result ? result.message : "Failed to upload offer file");
      });
    }
  }

  function handleEditClick() {
    fileInputRef.current?.click();
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Offer</CardTitle>
        </CardHeader>
        <CardContent>
          {avatarSrc && (
            <div className="mb-4">
              <Image
                src={avatarSrc}
                alt="Offer Image"
                width={200}
                height={200}
              />
            </div>
          )}
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Offer Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Discount Amount"
                          min={1}
                          max={100}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="offer_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offer Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select offer type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">
                              Percentage
                            </SelectItem>
                            <SelectItem value="fixed">Fixed</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Offer Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...field}
                        onChange={handleFileChange}
                        onClick={handleEditClick}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update Offer</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
