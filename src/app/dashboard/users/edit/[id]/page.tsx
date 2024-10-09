"use client";

import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUser, updateUser } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const editUserFormSchema = z.object({
  first_name: z
    .string()
    .min(3, {
      message: "First Name must be at least 3 characters long",
    })
    .max(255),
  last_name: z
    .string()
    .min(3, {
      message: "Last Name must be at least 3 characters long",
    })
    .max(255),
  description: z.string().min(5),
  address: z.string().max(255),
  dob: z.string(),
  gender: z.string(),
  email: z.string().email(),
  profilePicture: z.string().optional(),
});

export default function EditUser({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [avatarSrc, setAvatarSrc] = useState("/images/logo4.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof editUserFormSchema>>({
    resolver: zodResolver(editUserFormSchema),
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUser({ id: params.id });
        form.reset({
          first_name: data.first_name,
          last_name: data.last_name,
          description: data.description,
          address: data.address,
          email: data.email,
          gender: data.gender,
        });
        form.setValue(
          "dob",
          format(new Date(parseFloat(data.dob)).toISOString(), "yyyy-MM-dd")
        );
        setAvatarSrc(data.image);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, [form, params.id]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleEditClick() {
    fileInputRef.current?.click();
  }

  function onSubmit(values: z.infer<typeof editUserFormSchema>) {
    updateUser(values, params.id).then((result) => {
      toast(result.message);
      if (result.success === 200) {
        router.push("/dashboard/users");
      }
    });
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Edit User</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center space-y-4 lg:pt-32">
            <div className="relative">
              <Avatar className="w-44 h-44">
                <AvatarImage src={avatarSrc} alt="Profile picture" />
                <AvatarFallback>{form.getValues("first_name")}</AvatarFallback>
              </Avatar>
              <div
                onClick={handleEditClick}
                className="absolute bottom-0 right-0 rounded-full bg-primary p-2 cursor-pointer"
              >
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Edit profile picture</span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <h2 className="text-2xl font-bold">
              {form.getValues("first_name")}
            </h2>
          </CardContent>
        </Card>
        <div className="grid gap-4 col-span-2">
          <Card>
            <CardContent className="space-y-5 pt-5">
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="First Name"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Last Name"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
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
                  <FormField
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="w-36" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={form.getValues("gender")}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="M">Male</SelectItem>
                              <SelectItem value="F">Female</SelectItem>
                              <SelectItem value="O">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
