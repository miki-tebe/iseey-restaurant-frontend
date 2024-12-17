import React from "react";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";
import TableStandFooter from "@/components/table-stand-footer";
import { getPlans } from "@/app/actions";
import { getAssetPath } from "@/lib/utils";

export default async function TableStand() {
  const plans = await getPlans();

  if (!plans || !plans.tableStands)
    return <p className="mt-4 text-gray-400">No data available.</p>;
  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-12">table stand</h2>
      <Card className="border-zinc-700 text-white max-w-sm mx-auto transition-all duration-300 hover:border-orange-500">
        <CardHeader>
          <div className="h-12 mb-4">
            <Image
              src={getAssetPath("/images/logo4.png")}
              alt="ISSEY Logo"
              width={180}
              height={180}
            />
          </div>
          <div className="text-orange-500 uppercase font-medium">
            TABLE STAND
          </div>
          <div className="text-sm text-zinc-400 mt-2">1 unit price</div>
          <div className="flex items-baseline mt-2">
            <span className="text-4xl font-bold">
              {plans.tableStands.unit_amount}
            </span>
            <span className="ml-1 text-zinc-400">EURO</span>
          </div>
        </CardHeader>
        <TableStandFooter tableStand={plans.tableStands} />
      </Card>
    </>
  );
}
