import React from "react";

import { getProfile } from "@/app/actions";
import { RestaurantProfile } from "@/types/type";
import { CardContent } from "@/components/ui/card";
import EditProfileForm from "@/components/profile/edit-profile-form";

export default async function EditProfile() {
  const restaurantProfile: RestaurantProfile = await getProfile();
  // console.log("profile is--------------", restaurantProfile);

  if (!restaurantProfile) {
    return (
      <CardContent>
        <p className="text-center text-zinc-400">No profile found.</p>
      </CardContent>
    );
  }
  return <EditProfileForm restaurantProfile={restaurantProfile} />;
}
