"use client";

import React from "react";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export default function TableStand() {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-12">table stand</h2>
      <Card className="bg-zinc-800 border-zinc-700 text-white max-w-sm mx-auto transition-all duration-300 hover:border-orange-500">
        <CardHeader>
          <div className="h-12 mb-4">
            <Image
              src="/images/logo4.png"
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
            <span className="text-4xl font-bold">2.99</span>
            <span className="ml-1 text-zinc-400">EURO</span>
          </div>
        </CardHeader>
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
        </CardFooter>
      </Card>
    </>
  );
}
