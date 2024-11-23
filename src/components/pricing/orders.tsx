import React from "react";
import OrdersTable from "@/components/orders-table";
import { Card, CardContent } from "@/components/ui/card";
import { fetchOrders } from "@/app/actions";

export default async function Orders() {
  const orders = await fetchOrders();
  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-12">orders</h1>
      <Card className="bg-zinc-800 border-zinc-700 transition-all duration-300 mx-6 mb-16">
        <CardContent>
          <OrdersTable orders={orders} />
        </CardContent>
      </Card>
    </>
  );
}
