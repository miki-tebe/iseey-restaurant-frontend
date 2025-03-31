import React from "react";
import EditProfile from "@/components/profile/edit-profile";
import SkeletonEditProfile from "@/components/profile/skeleton-edit-profile";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background pb-24">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center mb-10">
          <h1 className="text-lg font-semibold md:text-2xl">
            Restaurantprofil
          </h1>
        </div>
        <div className="max-w-6xl">
          <React.Suspense fallback={<SkeletonEditProfile />}>
            <EditProfile />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
