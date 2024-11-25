"use client";

import { getProfile } from "@/app/actions";
import useDataStore, { DataEntry } from "@/hooks/use-checkout-data";
import { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";

interface ActiveGuestsProps {
  sessionToken: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let socket: Socket | null = null;

export default function ActiveGuests({ sessionToken }: ActiveGuestsProps) {
  const { setData } = useDataStore();
  const [activeGuests, setActiveGuests] = useState(0);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const user = await getProfile();
    setRestaurantId(user?._id || null);
  }, []);

  useEffect(() => {
    fetchData();

    if (!socket) {
      socket = io(API_URL, {
        query: { token: sessionToken },
      });

      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      const handleCheckIn = (data: any) => {
        if (data?.restaurant_id.toString() === restaurantId) {
          const result: DataEntry[] = Object.entries(data?.hourlyData).map(
            ([hour, guests]) => ({
              hour,
              guests: Number(guests),
            })
          );
          setData(result);
          setActiveGuests((prev) => prev + 1);
          console.log("active gusts", activeGuests);
        }
      };

      const handleCheckOut = (data: any) => {
        console.log("checkout", data);
        if (data?.restaurant_id?.toString() === restaurantId) {
          console.log("checkout", activeGuests);
          setData(data?.hourlyData);
          setActiveGuests((prev) => (prev > 0 ? prev - 1 : prev));
        }
      };

      socket.on("NEW_CHECK_IN_CREATED", handleCheckIn);
      socket.on("NEW_CHECK_OUT_CREATED", handleCheckOut);

      return () => {
        socket?.off("NEW_CHECK_IN_CREATED", handleCheckIn);
        socket?.off("NEW_CHECK_OUT_CREATED", handleCheckOut);
        socket?.disconnect();
        socket = null;
      };
    }
  }, [sessionToken, fetchData, restaurantId]);

  return <p>Aktive Gäste: {activeGuests}</p>;
}
