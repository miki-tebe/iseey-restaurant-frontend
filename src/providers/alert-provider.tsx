"use client";

import { useMountedState } from "react-use";
import SubscribePlan from "@/components/subscribe-plan";
import LoadingIndicator from "@/components/loading-indicator";

export const AlertProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <SubscribePlan />
      <LoadingIndicator />
    </>
  );
};
