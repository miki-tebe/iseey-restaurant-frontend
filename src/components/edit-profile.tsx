"use client";

import React from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProfile } from "@/app/actions";
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
import { profileFormSchema, ProfileFormValues } from "@/schema/profileSchema";
import ImageUpload from "@/components/image-upload";
import { FormFieldComponent } from "@/components/form-field";
import { AutocompleteField } from "@/components/auto-complete-field";
import { SwitchField } from "@/components/switch-field";
import { FileInput } from "@/components/file-input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditProfile({ profile }: any) {
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile?.name || "",
      address: profile?.address || "",
      phoneNumber: "+251" + profile.phoneNumber || "",
      number_of_tables: profile?.number_of_tables || "",
      facebook: profile?.facebook || "",
      instagram: profile?.instagram || "",
      website: profile?.website || "",
      resImage: profile?.resImage || "",
      image: profile?.image || "",
      lat: profile?.lat || "",
      lng: profile?.lng || "",
      menu: profile?.menu || "",
      menuType: profile?.menuType || "url",
      drinkMenu: profile?.drinkMenu || "",
      drinkMenuType: profile?.drinkMenuType || "url",
    },
  });

  const [menuType, setMenuType] = React.useState(false);
  const [drinkType, setDrinkType] = React.useState(false);

  function onSubmit(data: Partial<ProfileFormValues>) {
    // delete object property if empty
    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof typeof data;
      if (data[typedKey] === "" || data[typedKey] === undefined) {
        delete data[typedKey];
      }
    });

    console.log("data", data);
    updateProfile(data).then((result) => {
      toast(result.message);
    });
  }
  return (
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
                type="text"
              />
              <FormField
                name="resImage"
                render={() => (
                  <Controller
                    control={profileForm.control}
                    name="resImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Restaurant Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            onUploadComplete={(imageUrl) => {
                              console.log("Image uploaded:", imageUrl);
                              profileForm.setValue("resImage", imageUrl);
                              field.onChange(imageUrl);
                            }}
                            type="restaurant"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                        type="restaurant"
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
                    profileForm.setValue("address", place.formatted_address);
                  }
                }}
              />

              <FormFieldComponent<ProfileFormValues>
                control={profileForm.control}
                name="email"
                label="Email Address"
                placeholder="email"
                type="email"
              />

              <FormFieldComponent<ProfileFormValues>
                control={profileForm.control}
                name="phoneNumber"
                label="Phone Number"
                placeholder="phonenumber"
                type="text"
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
                type="url"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormFieldComponent<ProfileFormValues>
                control={profileForm.control}
                name="instagram"
                label="Instagram"
                placeholder="Instagram"
                type="url"
              />
              <FormFieldComponent<ProfileFormValues>
                control={profileForm.control}
                name="website"
                label="Website"
                placeholder="Website"
                type="url"
              />
            </div>
            <div className="flex items-center space-x-2">
              <SwitchField
                id="menu"
                checked={menuType}
                onCheckedChange={(value: boolean) => {
                  profileForm.setValue("menuType", value ? "url" : "file");
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

            <div className="flex items-center space-x-2">
              <SwitchField
                id="drink"
                checked={drinkType}
                onCheckedChange={(value: boolean) => {
                  profileForm.setValue("drinkMenuType", value ? "url" : "file");
                  setDrinkType(value);
                }}
                label="Drink URL"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FileInput<ProfileFormValues>
                control={profileForm.control}
                name="drinkMenu"
                label="Drink Menu"
                isUrl={drinkType}
                type="drink"
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
  );
}

export default EditProfile;
