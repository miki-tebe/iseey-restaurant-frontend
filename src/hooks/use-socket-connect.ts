"use client";

import { useEffect, useMemo } from "react";
import { io, Socket } from "socket.io-client";

export function useRestaurantSocket(token: string) {
  const raw = process.env.NEXT_PUBLIC_API_URL;

  const socket: Socket | null = useMemo(() => {
    if (!raw) return null;

    // IMPORTANT: Strip `/api` or any path. Socket.IO needs the server origin.
    const origin = new URL(raw).toString();

    return io(origin, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      auth: { token },
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      withCredentials: false,
    });
  }, [raw, token]);

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => console.log("socket connected", socket.id);
    const onConnectError = (err: any) =>
      console.log("socket connect_error", err?.message || err);

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);

    socket.on("NEW_CUSTOMER_CREATED", (payload) => {
      console.log("NEW_CUSTOMER_CREATED", payload);
    });
    socket.on("NEW_CHECK_IN_CREATED", (payload) => {
      console.log("NEW_CHECK_IN_CREATED", payload);
    });
    socket.on("NEW_CHECK_OUT_CREATED", (payload) => {
      console.log("NEW_CHECK_OUT_CREATED", payload);
    });

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.disconnect();
    };
  }, [socket]);

  return socket;
}
