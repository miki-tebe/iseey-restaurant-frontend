"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

interface ActiveGuestsProps {
  sessionToken: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ActiveGuests({ sessionToken }: ActiveGuestsProps) {
  const [activeGuests, setActiveGuests] = useState(0);

  useEffect(() => {
    const socket = io(API_URL, {
      query: {
        token: `${sessionToken}`,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("NEW_CHECK_IN_CREATED", () => {
      setActiveGuests((prev) => prev + 1);
    });

    socket.on("NEW_CHECK_OUT_CREATED", () => {
      setActiveGuests((prev) => prev - 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionToken]);

  return <p>Aktive Gäste: {activeGuests}</p>;
}
