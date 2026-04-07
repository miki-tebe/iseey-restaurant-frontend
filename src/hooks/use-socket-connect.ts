"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useRestaurantSocket(token: string) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const socketRef = useRef<Socket | null>(null);

  if (!socketRef.current && url) {
    const origin = new URL(url).origin;
    socketRef.current = io(origin, {
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
  }

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.auth = { token };
    }
  }, [token]);

  useEffect(() => {
    const s = socketRef.current;
    if (!s) return;

    const onConnect = () => console.log("socket connected", s.id);
    const onDisconnect = (reason: string) =>
      console.log("socket disconnected", reason);
    const onConnectError = (err: any) =>
      console.log("socket connect_error", err?.message || err);

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);
    s.on("connect_error", onConnectError);

    s.connect();

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      s.off("connect_error", onConnectError);
      s.disconnect();
    };
  }, []);

  return socketRef.current;
}
