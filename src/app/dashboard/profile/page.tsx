"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useLayoutEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getProfile,
  updateProfile,
  uploadRestaurantMenus,
} from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
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
import { profileFormSchema } from "@/schema/profileSchema";

export default function Profile() {
  const [menuURL, setMenuURL] = useState(false);
  const [drinkURL, setDrinkURL] = useState(false);
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
  });

  useLayoutEffect(() => {
    async function fetchProfile() {
      const profileData = await getProfile();
      profileForm.reset(profileData);
      if (profileData?.drinkMenu != undefined) {
        setDrinkURL(true);
        profileForm.setValue("drinkMenu", profileData.drinkMenu);
      }
      if (profileData?.menu != undefined) {
        setMenuURL(true);
        profileForm.setValue("menu", profileData.menu);
      }
    }
    fetchProfile();
  }, [profileForm]);

  function handleMenuFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.id;
    const file = event.target.files?.[0];
    const isDrink = id === "drink_menu";
    if (file) {
      const formData = new FormData();
      formData.append("picture", file);
      uploadRestaurantMenus(formData).then((result) => {
        if (isDrink) {
          setDrinkURL(true);
          profileForm.setValue("drinkMenu", result?.url ?? "");
        } else {
          setMenuURL(true);
          profileForm.setValue("menu", result?.url ?? "");
        }
        toast(result ? "Menu uploaded" : "Failed to upload menu");
      });
    }
  }

  function onSubmit(data: z.infer<typeof profileFormSchema>) {
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

  function handleMenuSwitch() {
    profileForm.setValue("menu", "");
  }
  function handleDrinkSwitch() {
    profileForm.setValue("drinkMenu", "");
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Restaurantprofil</h1>
      </div>
      <div className="grid gap-4 col-span-2">
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
                  <FormField
                    name="name"
                    control={profileForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Restaurantname</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="address"
                    control={profileForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Autocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                            onPlaceSelected={(place) => {
                              if (place && place.geometry) {
                                const { lat, lng } = place.geometry.location;
                                const formatted_address =
                                  place.formatted_address;

                                profileForm.setValue("lat", lat().toString());
                                profileForm.setValue("lng", lng().toString());
                                profileForm.setValue(
                                  "address",
                                  formatted_address || ""
                                );
                              }
                            }}
                            options={{
                              types: ["establishment"],
                            }}
                            value={field.value || ""}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const value = e.target.value;
                              profileForm.setValue("address", value, {
                                shouldValidate: true,
                              });
                            }}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <FormField
                    control={profileForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="number_of_tables"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anzahl der Tische</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tables"
                            type="number"
                            min={1}
                            max={100}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input placeholder="Facebook" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input placeholder="Instagram" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Website" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="menu"
                    checked={menuURL}
                    onCheckedChange={setMenuURL}
                    onClick={handleMenuSwitch}
                  />
                  <Label htmlFor="menu">Menu URL</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {menuURL ? (
                    <FormField
                      control={profileForm.control}
                      name="menu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Menu</FormLabel>
                          <FormControl>
                            <Input placeholder="Menu URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={profileForm.control}
                      name="menu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Menu</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              {...field}
                              onChange={handleMenuFileChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="drinkMenu"
                    checked={drinkURL}
                    onCheckedChange={setDrinkURL}
                    onClick={handleDrinkSwitch}
                  />
                  <Label htmlFor="drinkMenu">Drink Menu URL</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {drinkURL ? (
                    <FormField
                      control={profileForm.control}
                      name="drinkMenu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Drink Menu</FormLabel>
                          <FormControl>
                            <Input placeholder="Drink Menu URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={profileForm.control}
                      name="drinkMenu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Drink Menu</FormLabel>
                          <FormControl>
                            <Input
                              id="drink_menu"
                              type="file"
                              {...field}
                              onChange={handleMenuFileChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={profileForm.handleSubmit(onSubmit)}>
              Einreichen
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
