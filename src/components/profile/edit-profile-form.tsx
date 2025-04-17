"use client";

import React, { useEffect } from "react";

import { RestaurantProfile } from "@/types/type";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema, ProfileFormValues } from "@/schema/profileSchema";
import { Button } from "@/components/ui/button";
import { FormFieldComponent } from "@/components/form-field";
import { SwitchField } from "@/components/switch-field";
import { FileInput } from "@/components/file-input";
import { AutocompleteField } from "@/components/auto-complete-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/image-upload";
import { useEditProfile } from "@/hooks/use-edit-profile";
import { CountryCodeInput } from "../country-code-input";
import { useStore } from "@/hooks/use-edit-profile-store";
import { countries } from "@/lib/countries-data";

export default function EditProfileForm({
  restaurantProfile,
}: {
  restaurantProfile: RestaurantProfile;
}) {
  const {countryCode, updateCountryCode} = useStore()
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: restaurantProfile.name,
      address: restaurantProfile.address,
      email: restaurantProfile.email,
      phoneNumber: restaurantProfile.phoneNumber.number,
      number_of_tables: restaurantProfile.number_of_tables,
      facebook: restaurantProfile.facebook,
      instagram: restaurantProfile.instagram,
      website: restaurantProfile.website,
      resImage: restaurantProfile.restaurant_image?.location,
      image: restaurantProfile.image,
      lat: restaurantProfile.lat,
      lng: restaurantProfile.lng,
      menu: restaurantProfile.menu,
      menuType:
        restaurantProfile.menuType === "url" ||
        restaurantProfile.menuType === "file"
          ? restaurantProfile.menuType
          : undefined,
      drinkMenuType:
        restaurantProfile.drinkMenuType === "url" ||
        restaurantProfile.drinkMenuType === "file"
          ? restaurantProfile.drinkMenuType
          : undefined,
      drinkMenu: restaurantProfile.drinkMenu,
      // password: undefined,
      // confirmPassword: undefined,
    },
  });


  useEffect(() => {
    if(restaurantProfile.phoneNumber.country_code) {
      const country = countries.filter((country) => {
        return country.dial_code === '+' + restaurantProfile.phoneNumber.country_code.toString() })
      if(country.length > 0) {
        updateCountryCode(country[0])
      }
    }
  },[])


  const mutation = useEditProfile();

  const [menuType, setMenuType] = React.useState(false);
  const [drinkType, setDrinkType] = React.useState(false);

  function onSubmit(data: Partial<ProfileFormValues>) {
    if(data["lat"] === undefined || data["lng"] === undefined) {
        profileForm.setError("address", {
              type: "manual",
              message: "Address is required",
              });
        return
      }
    // delete object property if empty
    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof typeof data;
      if (data[typedKey] === "" || data[typedKey] === undefined) {
        delete data[typedKey];
      }
    });

    if (data.phoneNumber){
      data.phoneNumber = countryCode.dial_code + data.phoneNumber;
    }

    mutation.mutate({ values: data });
  }
  return (
    <Form {...profileForm}>
      <form className="space-y-4" onSubmit={profileForm.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormFieldComponent<ProfileFormValues>
            control={profileForm.control}
            name="name"
            label="Restaurant Name"
            placeholder="Name"
            type="text"
            disabled={mutation.isPending}
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
                          // console.log("Image uploaded:", imageUrl);
                          profileForm.setValue("resImage", imageUrl);
                          field.onChange(imageUrl);
                        }}
                        type="restaurant"
                        disabled={mutation.isPending}
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
                      // console.log("Image uploaded:", imageUrl);
                      profileForm.setValue("image", imageUrl);
                    }}
                    type="restaurant"
                    disabled={mutation.isPending}
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
            disabled={mutation.isPending}
          />

          <FormFieldComponent<ProfileFormValues>
            control={profileForm.control}
            name="email"
            label="Email Address"
            placeholder="email"
            type="email"
            disabled={mutation.isPending}
          />

          <CountryCodeInput<ProfileFormValues> 
            control={profileForm.control}
            name="phoneNumber"
            placeholder="phonenumber"
            disabled={mutation.isPending}
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
            disabled={mutation.isPending}
          />
          <FormFieldComponent<ProfileFormValues>
            control={profileForm.control}
            name="facebook"
            label="Facebook"
            placeholder="Facebook"
            type="url"
            disabled={mutation.isPending}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormFieldComponent<ProfileFormValues>
            control={profileForm.control}
            name="instagram"
            label="Instagram"
            placeholder="Instagram"
            type="url"
            disabled={mutation.isPending}
          />
          <FormFieldComponent<ProfileFormValues>
            control={profileForm.control}
            name="website"
            label="Website"
            placeholder="Website"
            type="url"
            disabled={mutation.isPending}
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
            disabled={mutation.isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FileInput<ProfileFormValues>
            control={profileForm.control}
            name="menu"
            label="Menu"
            isUrl={menuType}
            type="food"
            disabled={mutation.isPending}
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
            disabled={mutation.isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FileInput<ProfileFormValues>
            control={profileForm.control}
            name="drinkMenu"
            label="Drink Menu"
            isUrl={drinkType}
            type="drink"
            disabled={mutation.isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormFieldComponent<ProfileFormValues>
            control={profileForm.control}
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            disabled={mutation.isPending}
          />
          <FormFieldComponent<ProfileFormValues>
            control={profileForm.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            disabled={mutation.isPending}
          />
        </div>
        <Button disabled={mutation.isPending} type="submit">
          Einreichen
        </Button>
      </form>
    </Form>
  );
}
