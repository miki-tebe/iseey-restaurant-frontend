"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ITableStand } from "@/types/type";
import { usePurchaseTableStand } from "@/hooks/use-purchase-table-stand";

interface ITableStandFooter {
  tableStand: ITableStand;
}

function TableStandFooter({ tableStand }: ITableStandFooter) {
  const [quantity, setQuantity] = React.useState(1);
  const total_price = quantity * tableStand.unit_amount;
  const { onOpen } = usePurchaseTableStand();
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="border-zinc-700"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-xl font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="border-zinc-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-right">
          <div className="text-sm text-zinc-400">Total price</div>
          <div className="flex items-baseline justify-end mt-1">
            <span className="text-3xl font-bold">{total_price}</span>
            <span className="ml-1 text-zinc-400">EURO</span>
          </div>
        </div>
      </div>
      <Button
        className="w-full bg-orange-600 hover:bg-orange-700"
        onClick={() =>
          onOpen(
            tableStand.price_id,
            tableStand.product_id,
            quantity,
            tableStand.unit_amount
          )
        }
      >
        Order
      </Button>
    </CardFooter>
  );
}

export default TableStandFooter;
