import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { decrypt } from "@/lib/session";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.token) {
    redirect("/login");
  }

  return { isAuth: true, token: session.token };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch("http://localhost:8090/api/admin/getProfile", {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  const data = await payload.json();
  return data.result;
});

export const getDashboard = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch("http://localhost:8090/api/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  const data = await payload.json();
  return data.result;
});
