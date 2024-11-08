"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useLayoutEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { getProfile, updateProfile } from "@/app/actions";
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

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(255),
  address: z.string().max(255),
  email: z.string().email(),
  phoneNumber: z.string(),
  tables: z.string(),
  facebook: z.string(),
  instagram: z.string(),
  website: z.string(),
  logo: z.string(),
  password: z.string().min(8).optional(),
  confirmPassword: z.string().min(8).optional(),
  menu: z.string().optional(),
  drink: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
});

export default function Profile() {
  const [menuURL, setMenuURL] = useState(false);
  const [drinkURL, setDrinkURL] = useState(false);
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
  });

  useLayoutEffect(() => {
    async function fetchProfile() {
      const profileData = await getProfile();
      profileForm.setValue("name", profileData.name);
      profileForm.setValue("address", profileData.address);
      profileForm.setValue("email", profileData.email);
      profileForm.setValue("phoneNumber", profileData.phoneNumber);
      profileForm.setValue("tables", profileData.number_of_tables.toString());
      profileForm.setValue("facebook", profileData.facebook);
      profileForm.setValue("instagram", profileData.instagram);
      profileForm.setValue("website", profileData.website);
    }
    fetchProfile();
  }, [profileForm]);

  function handleProfileSubmit(data: z.infer<typeof profileFormSchema>) {
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
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form
                className="space-y-4"
                onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
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
                          <Input placeholder="Address" {...field} />
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
                    name="tables"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anzahl der Tische</FormLabel>
                        <FormControl>
                          <Input placeholder="Tables" {...field} />
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
                            <Input type="file" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="drink"
                    checked={drinkURL}
                    onCheckedChange={setDrinkURL}
                  />
                  <Label htmlFor="drink">Drink Menu URL</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {drinkURL ? (
                    <FormField
                      control={profileForm.control}
                      name="drink"
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
                      name="drink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Drink Menu</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} />
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
          <CardFooter className="border-t px-6 py-4">
            <Button
              onClick={() => profileForm.handleSubmit(handleProfileSubmit)()}
            >
              Einreichen
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
