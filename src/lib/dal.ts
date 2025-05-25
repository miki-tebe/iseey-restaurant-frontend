import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { decrypt } from "@/lib/session";
import customFetch from "./custom-fetch";

const API_URL = process.env.API_URL;

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie as string);
  try {
    if (!session?.token) {
      redirect("/");
    }
    return { isAuth: true, token: session.token };
  } catch (error) {
    console.log(`Failed to verify session: ${error}`);
    return { isAuth: false, token: "" };
  }
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await customFetch(`/api/restaurants/profile`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    return payload.data;
  } catch (e) {
    console.log(e);
  }
  return null;
});

export const getDashboard = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`${API_URL}/api/restaurants/dashboard`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const result = await payload.json();
    return result.data;
  } catch (e) {
    console.log(e);
  }
  return null;
});
