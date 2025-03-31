import React from "react";

import EditProfile from "@/components/profile/edit-profile";
import SkeletonEditProfile from "@/components/profile/skeleton-edit-profile";

export default async function Profile() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Restaurantprofil</h1>
      </div>
      <div className="grid gap-4 col-span-2">
        <React.Suspense fallback={<SkeletonEditProfile />}>
          <EditProfile />
        </React.Suspense>
      </div>
    </main>
  );
}
