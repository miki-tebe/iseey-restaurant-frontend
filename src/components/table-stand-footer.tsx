"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
function TableStandFooter() {
  const [quantity, setQuantity] = React.useState(1);
  const unitPrice = 2.99;
  const total_price = (quantity * unitPrice).toFixed(2);
  return (
    <CardFooter>
      <div className="flex items-center justify-between w-full">
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
      <div className="w-full text-right">
        <div className="text-sm text-zinc-400">Total price</div>
        <div className="flex items-baseline justify-end mt-1">
          <span className="text-3xl font-bold">{total_price}</span>
          <span className="ml-1 text-zinc-400">EURO</span>
        </div>
      </div>
    </CardFooter>
  );
}

export default TableStandFooter;
