"use client";
import OrdersTable from "@/components/orders-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Minus, Plus } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { useState } from "react";

export default function Component() {
  const [quantity, setQuantity] = useState(1);

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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Pricing Section */}
        <h1 className="text-4xl font-bold text-center mb-12">pricing</h1>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* Monthly Plan */}
          <Card className="bg-zinc-800 border-zinc-700 text-white transition-all duration-300 hover:border-orange-500">
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
                Monthly
                <div className="text-sm">subscription</div>
              </div>
              <div className="flex items-baseline mt-4">
                <span className="text-4xl font-bold">99</span>
                <span className="ml-1 text-zinc-400">
                  <div>EURO</div>
                  <div>/MONTH</div>
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-500" />
                <span className="text-zinc-400">WITHOUT ANY FURTHER COSTS</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-500" />
                <span className="text-zinc-400">MONTHLY Cancelable</span>
              </div>
            </CardContent>

            <Separator className="my-4 bg-[#898989]" />
            <CardFooter className="flex flex-col gap-4">
              <div className="text-sm text-zinc-400">
                FUTURE OF COMMUNICATION
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                CHOOSE
              </Button>
            </CardFooter>
          </Card>

          {/* Annual Plan */}
          <Card className="bg-zinc-800 border-zinc-700 text-white transition-all duration-300 hover:border-orange-500">
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
                Annual
                <div className="text-sm">subscription</div>
              </div>
              <div className="flex items-baseline mt-4">
                <span className="text-4xl font-bold">1499</span>
                <span className="ml-1 text-zinc-400">
                  <div>EURO</div>
                  <div>/YEAR</div>
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-500" />
                <span className="text-zinc-400">WITHOUT ANY FURTHER COSTS</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-500" />
                <span className="text-zinc-400">
                  Can Be Terminated Annually
                </span>
              </div>
            </CardContent>
            <Separator className="my-4 bg-[#898989]" />
            <CardFooter className="flex flex-col gap-4">
              <div className="text-sm text-zinc-400">
                FUTURE OF COMMUNICATION
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                CHOOSE
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Separator className="my-4" />

        {/* Table Stand Section */}
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
      </div>
      <Separator className="my-4" />
      <h1 className="text-4xl font-bold text-center mb-12">orders</h1>
      <Card className="bg-zinc-800 border-zinc-700 transition-all duration-300 mx-6 mb-16">
        <CardContent>
          <OrdersTable guests={[]} />
        </CardContent>
      </Card>
    </div>
  );
}
