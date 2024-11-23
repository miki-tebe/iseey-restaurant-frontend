"use client";

import { useSubscribePlan } from "@/hooks/use-subscribe-plan";
import React from "react";

interface LoadingIndicatorProps {
  size?: "small" | "medium" | "large";
  color?: string;
  fullScreen?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "medium",
  color = "currentColor",
  fullScreen = true,
}) => {
  const { loading } = useSubscribePlan();
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  if (!loading) return null;

  const Spinner = () => (
    <div
      className={`${sizeClasses[size]} animate-spin`}
      style={{ borderColor: color, borderRightColor: "transparent" }}
    >
      <div className="w-full h-full rounded-full border-4 border-t-transparent border-r-transparent animate-pulse" />
    </div>
  );

  if (fullScreen && loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default LoadingIndicator;
