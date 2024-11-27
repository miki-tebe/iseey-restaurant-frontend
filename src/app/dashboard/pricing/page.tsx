import { Suspense } from "react";

import Orders from "@/components/pricing/orders";
import PlanSection from "@/components/pricing/plan";
import PlanSkeleton from "@/components/pricing/plan-skeleton";
import TableStand from "@/components/pricing/table-stand";
import TableStandSkeleton from "@/components/pricing/table-stand-skeleton";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export default function Component() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Warning Banner */}
      {/* <Alert className="rounded-none bg-red-700 text-white border-none">
        <AlertDescription>
          Card details required! Your trial period expires on May 11, 2024.
          Please enter your card details before the expiration date. Click here
          to add card details.
        </AlertDescription>
      </Alert> */}

      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<PlanSkeleton />}>
          <PlanSection />
        </Suspense>
        <Separator className="my-4" />
        <Suspense fallback={<TableStandSkeleton />}>
          <TableStand />
        </Suspense>
      </div>
      <Separator className="my-4" />
      <Suspense fallback={<TableStandSkeleton />}>
        <Orders />
      </Suspense>
    </div>
  );
}
