import Image from "next/image";
import { Check } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SubscribeButton from "@/components/subscribe-button";

import { getPlans, getProfile } from "@/app/actions";
import { getAssetPath } from "@/lib/utils";

export default async function PlanSection() {
  const [plans, profile] = await Promise.all([getPlans(), getProfile()]);

  if (!plans || !plans.prices || plans.prices.length === 0 || !profile)
    return <p className="mt-4 text-gray-400">No data available.</p>;

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-12">Pricing</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
        {/* Monthly Plan */}
        <Card className="bg-zinc-800 border-zinc-700 text-white transition-all duration-300 hover:border-orange-500">
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
              Monthly
              <div className="text-sm">subscription</div>
            </div>
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-bold">
                {plans.prices[0].unit_amount}
              </span>
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
          <SubscribeButton
            plan={plans.prices[0].recurringInterval}
            priceId={plans.prices[0]._id}
            isSubscribed={profile?.activeSubscription?.status}
            subscribeYear={profile?.activeSubscription?.plan}
          />
        </Card>

        {/* Annual Plan */}
        {plans.prices[1] && (
          <Card className="bg-zinc-800 border-zinc-700 text-white transition-all duration-300 hover:border-orange-500">
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
                Annual
                <div className="text-sm">subscription</div>
              </div>
              <div className="flex items-baseline mt-4">
                <span className="text-4xl font-bold">
                  {plans.prices[1].unit_amount}
                </span>
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
                <span className="text-zinc-400">YEARLY Cancelable</span>
              </div>
            </CardContent>

            <Separator className="my-4 bg-[#898989]" />
            <SubscribeButton
              plan={plans.prices[1].recurringInterval}
              priceId={plans.prices[1]._id}
              isSubscribed={profile?.activeSubscription?.status}
              subscribeYear={profile?.activeSubscription?.plan}
            />
          </Card>
        )}
      </div>
    </>
  );
}
