"use client";

import { getProfile } from "@/app/actions";
import useDataStore from "@/hooks/use-checkout-data";
import { useRestaurantSocket } from "@/hooks/use-socket-connect";
import convertToChartData from "@/lib/convertToChartData";
import { useState, useEffect } from "react";

interface ActiveGuestsProps {
  sessionToken: string;
}

export default function ActiveGuests({ sessionToken }: ActiveGuestsProps) {
  const { setData } = useDataStore();
  const [activeGuests, setActiveGuests] = useState(0);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const socket = useRestaurantSocket(sessionToken);

  useEffect(() => {
    getProfile().then((user) => {
      setRestaurantId(user?._id || null);
    });
  }, []);

  useEffect(() => {
    if (!restaurantId) return;

    const handleCheckIn = (data: any) => {
      console.log("data", data);
      if (data?.restaurant_id?.toString() === restaurantId) {
        setActiveGuests((prev) => prev + 1);
      }
    };

    const handleCheckOut = (data: any) => {
      if (data?.restaurant_id?.toString() === restaurantId) {
        const result = convertToChartData(data?.hourlyData);
        setData(result);
        setActiveGuests((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    socket?.on("NEW_CHECK_IN_CREATED", handleCheckIn);
    socket?.on("NEW_CHECK_OUT_CREATED", handleCheckOut);

    return () => {
      socket?.off("NEW_CHECK_IN_CREATED", handleCheckIn);
      socket?.off("NEW_CHECK_OUT_CREATED", handleCheckOut);
    };
  }, [socket, restaurantId, setData]);

  return <p>Aktive Gäste: {activeGuests}</p>;
}
