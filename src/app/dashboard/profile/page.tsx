"use client";

import * as React from "react";

import EditProfile from "@/components/edit-profile";
import { getProfile } from "@/app/actions";

export default function Profile() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = React.useState<any | null>(null);

  React.useLayoutEffect(() => {
    async function fetchProfile() {
      const profileData = await getProfile();
      setProfile(profileData);
    }
    fetchProfile();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Restaurantprofil</h1>
      </div>
      <div className="grid gap-4 col-span-2">
        {!profile ? (
          <div className="flex flex-1">Loading...</div>
        ) : (
          <EditProfile profile={profile} />
        )}
      </div>
    </main>
  );
}
