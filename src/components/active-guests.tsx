"use client";

import { getProfile } from "@/app/actions";
import useDataStore from "@/hooks/use-checkout-data";
import { useRestaurantSocket } from "@/hooks/use-socket-connect";
import convertToChartData from "@/lib/convertToChartData";
import { useEffect, useRef, useState } from "react";

interface ActiveGuestsProps {
  sessionToken: string;
}

export default function ActiveGuests({ sessionToken }: ActiveGuestsProps) {
  const { setData } = useDataStore();
  const [activeGuests, setActiveGuests] = useState(0);
  const socket = useRestaurantSocket(sessionToken);

  const restaurantIdRef = useRef<string | null>(null);
  const setDataRef = useRef(setData);
  setDataRef.current = setData;

  useEffect(() => {
    getProfile().then((profile) => {
      restaurantIdRef.current = profile?._id || null;
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleCheckIn = (data: any) => {
      const rid = restaurantIdRef.current;
      if (!rid || data?.restaurant_id?.toString() !== rid) return;
      setActiveGuests((prev) => prev + 1);
    };

    const handleCheckOut = (data: any) => {
      const rid = restaurantIdRef.current;
      if (!rid || data?.restaurant_id?.toString() !== rid) return;
      if (data?.hourlyData) {
        setDataRef.current(convertToChartData(data.hourlyData));
      }
      setActiveGuests((prev) => Math.max(0, prev - 1));
    };

    socket.off("NEW_CHECK_IN_CREATED");
    socket.off("NEW_CHECK_OUT_CREATED");

    socket.on("NEW_CHECK_IN_CREATED", handleCheckIn);
    socket.on("NEW_CHECK_OUT_CREATED", handleCheckOut);

    return () => {
      socket.off("NEW_CHECK_IN_CREATED");
      socket.off("NEW_CHECK_OUT_CREATED");
    };
  }, [socket]);

  return <p>Aktive Gäste: {activeGuests}</p>;
}
