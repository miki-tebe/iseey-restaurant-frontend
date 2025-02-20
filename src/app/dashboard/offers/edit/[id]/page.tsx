import React from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import EditOffer from "@/components/offers/edit-offers";
import SkeletonEditOffer from "@/components/offers/edit-offer-skeleton";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Offer</CardTitle>
        </CardHeader>
        <React.Suspense fallback={<SkeletonEditOffer />}>
          <EditOffer params={params} />
        </React.Suspense>
      </Card>
    </main>
  );
}
