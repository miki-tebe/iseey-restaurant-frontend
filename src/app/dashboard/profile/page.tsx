"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getProfile, updateProfile } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  defaultValues,
  profileFormSchema,
  ProfileFormValues,
} from "@/schema/profileSchema";
import ImageUpload from "@/components/image-upload";
import { FormFieldComponent } from "@/components/form-field";
import { AutocompleteField } from "@/components/auto-complete-field";
import { SwitchField } from "@/components/switch-field";
import { FileInput } from "@/components/file-input";

export default function Profile() {
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const [menuType, setMenuType] = React.useState(false);
  const [drinkType, setDrinkType] = React.useState(false);

  React.useLayoutEffect(() => {
    async function fetchProfile() {
      const profileData = await getProfile();
      profileForm.reset(profileData);
    }
    fetchProfile();
  }, [profileForm]);

  function onSubmit(data: z.infer<typeof profileFormSchema>) {
    console.log("data", profileForm.getValues());
    // delete object property if empty
    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof typeof data;
      if (data[typedKey] === "" || data[typedKey] === undefined) {
        delete data[typedKey];
      }
    });

    updateProfile(data).then((result) => {
      toast(result.message);
    });
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Restaurantprofil</h1>
      </div>
      <div className="grid gap-4 col-span-2">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  className="space-y-4"
                  onSubmit={profileForm.handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormFieldComponent<ProfileFormValues>
                      control={profileForm.control}
                      name="name"
                      label="Restaurant Name"
                      placeholder="Name"
                    />
                    <FormField
                      name="resImage"
                      render={() => (
                        <FormItem>
                          <FormLabel>Restaurant Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              onUploadComplete={(imageUrl) => {
                                console.log("Image uploaded:", imageUrl);
                                profileForm.setValue("resImage", imageUrl);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
                                profileForm.setValue("image", imageUrl);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AutocompleteField<ProfileFormValues>
                      control={profileForm.control}
                      name="address"
                      label="Address"
                      apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}
                      onPlaceSelected={(place) => {
                        if (place.geometry) {
                          const { lat, lng } = place.geometry.location;
                          profileForm.setValue("lat", lat().toString());
                          profileForm.setValue("lng", lng().toString());
                        }
                      }}
                    />
                    <FormFieldComponent<ProfileFormValues>
                      control={profileForm.control}
                      name="email"
                      label="Email Address"
                      placeholder="Email"
                    />
                    <FormFieldComponent<ProfileFormValues>
                      control={profileForm.control}
                      name="phoneNumber"
                      label="Phone Number"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormFieldComponent<ProfileFormValues>
                      control={profileForm.control}
                      name="number_of_tables"
                      label="Anzahl der Tische"
                      type="number"
                      min={1}
                      max={100}
                    />
                    <FormFieldComponent<ProfileFormValues>
                      control={profileForm.control}
                      name="facebook"
                      label="Facebook"
                      placeholder="Facebook"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormFieldComponent<ProfileFormValues>
                      control={profileForm.control}
                      name="instagram"
                      label="Instagram"
                      placeholder="Instagram"
                    />
                    <FormFieldComponent<ProfileFormValues>
                      control={profileForm.control}
                      name="website"
                      label="Website"
                      placeholder="Website"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <SwitchField
                      id="menu"
                      checked={menuType}
                      onCheckedChange={(value: boolean) => {
                        profileForm.setValue(
                          "menuType",
                          value ? "url" : "file"
                        );
                        setMenuType(value);
                      }}
                      label="Menu URL"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FileInput<ProfileFormValues>
                      control={profileForm.control}
                      name="menu"
                      label="Menu"
                      isUrl={menuType}
                      type="food"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormFieldComponent<ProfileFormValues>
                      control={profileForm.control}
                      name="password"
                      label="Password"
                      placeholder="Password"
                      type="password"
                    />
                    <FormFieldComponent<ProfileFormValues>
                      control={profileForm.control}
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </div>
                  <Button type="submit">Einreichen</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </React.Suspense>
      </div>
    </main>
  );
}
