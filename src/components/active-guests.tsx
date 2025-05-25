"use client";

import { getProfile } from "@/app/actions";
import useDataStore from "@/hooks/use-checkout-data";
import convertToChartData from "@/lib/convertToChartData";
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
      const socketOptions = {
        path: "/restaurants/socket.io/",
        rejectUnauthorized: false,
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
        autoConnect: true,
        query: {
          token: sessionToken,
        },
      };
      // console.log("Connecting to restaurant socket -->", API_URL);
      socket = io(API_URL, socketOptions);

      // socket.on("connect", () => {
      //   console.log("Connected to restaurant socket");
      // });

      // socket.on("disconnect", (reason) => {
      //   console.log("Disconnected from restaurant socket:", reason);
      // });

      // socket.on("connect_error", (error) => {
      //   console.log("Restaurant socket connection error:", error);
      // });

      // // Debug events
      // socket.onAny((event, ...args) => {
      //   console.log("Restaurant Socket Event:", event, args);
      // });

      // // Error events
      // socket.on("error", (error) => {
      //   console.log("Restaurant socket error:", error);
      // });

      // // Auth events
      // socket.on("unauthorized", (error) => {
      //   console.log("Restaurant socket unauthorized:", error);
      // });

      const handleCheckIn = (data: any) => {
        if (data) {
          if (data.restaurant_id.toString() === restaurantId) {
            setActiveGuests((prev) => prev + 1);
            // console.log("active guests", activeGuests);
          }
        }
      };

      const handleCheckOut = (data: any) => {
        if (data?.restaurant_id?.toString() === restaurantId) {
          const result = convertToChartData(data?.hourlyData);
          setData(result);
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
