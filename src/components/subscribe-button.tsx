"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useSubscribePlan } from "@/hooks/use-subscribe-plan";

interface SubscribeButtonProps {
  plan: string;
  priceId: string;
}

function SubscribeButton({ plan, priceId }: SubscribeButtonProps) {
  const { onOpen } = useSubscribePlan();
  return (
    <CardFooter className="flex flex-col gap-4">
      <div className="text-sm text-zinc-400">FUTURE OF COMMUNICATION</div>
      <Button
        className="w-full bg-orange-600 hover:bg-orange-700"
        onClick={() => onOpen(plan, priceId)}
      >
        CHOOSE
      </Button>
    </CardFooter>
  );
}

export default SubscribeButton;
