import Image from "next/image";
import { Check } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getPlans } from "@/app/actions";

export default async function PlanSection() {
  const plans = await getPlans();

  if (!plans || plans.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-12">Pricing</h1>
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
            <div className="text-sm text-zinc-400">FUTURE OF COMMUNICATION</div>
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
              <span className="text-zinc-400">Can Be Terminated Annually</span>
            </div>
          </CardContent>
          <Separator className="my-4 bg-[#898989]" />
          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-zinc-400">FUTURE OF COMMUNICATION</div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              CHOOSE
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
