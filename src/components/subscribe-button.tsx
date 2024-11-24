"use client";

import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useSubscribePlan } from "@/hooks/use-subscribe-plan";

interface SubscribeButtonProps {
  plan: string;
  priceId: string;
  isSubscribed: string;
  subscribeYear: string;
}

function SubscribeButton({
  plan,
  priceId,
  isSubscribed,
  subscribeYear,
}: SubscribeButtonProps) {
  const { onOpen } = useSubscribePlan();
  const isCurrentPlan = subscribeYear === plan;
  return (
    <CardFooter className="flex flex-col gap-4">
      <div className="text-sm text-zinc-400">FUTURE OF COMMUNICATION</div>
      <Button
        className="w-full bg-orange-600 hover:bg-orange-700"
        disabled={isSubscribed === "trialing"}
        onClick={() => onOpen(plan, priceId)}
      >
        {isCurrentPlan ? (
          <>
            <Check className="mr-2 h-4 w-4" /> CURRENT PLAN
          </>
        ) : (
          "CHOOSE"
        )}
      </Button>
    </CardFooter>
  );
}

export default SubscribeButton;
