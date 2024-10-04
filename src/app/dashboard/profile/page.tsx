"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { PencilIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { getProfile } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileFormSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
});

const passwordFormSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export default function Profile() {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
  });

  useEffect(() => {
    async function fetchProfile() {
      const profileData = await getProfile();
      profileForm.setValue("name", profileData.name);
      profileForm.setValue("email", profileData.email);
      setAvatarSrc(profileData.image);
    }
    fetchProfile();
  }, [profileForm]);

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
  });

  function handleProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    console.log(data);
  }

  function handlePasswordSubmit(data: z.infer<typeof passwordFormSchema>) {
    console.log(data);
  }

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

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-left">
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 lg:pt-32">
            <div className="relative">
              <Avatar className="w-44 h-44">
                <AvatarImage src={avatarSrc ?? ""} alt="Profile picture" />
                <AvatarFallback>KA</AvatarFallback>
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
              {profileForm.getValues("name")}
            </h2>
            <p className="text-zinc-400">Super Admin</p>
          </CardContent>
        </Card>
        <div className="grid gap-4 col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)}>
                  <FormField
                    name="name"
                    control={profileForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button
                onClick={() => profileForm.handleSubmit(handleProfileSubmit)()}
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Update Password</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                >
                  <FormField
                    name="oldPassword"
                    control={passwordForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Old Password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="New Password"
                            type="password"
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
            <CardFooter className="border-t px-6 py-4">
              <Button
                onClick={() =>
                  passwordForm.handleSubmit(handlePasswordSubmit)()
                }
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
