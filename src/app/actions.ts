"use server";

import { redirect } from "next/navigation";

import { verifySession } from "@/lib/dal";
import { createSession, destroySession } from "@/lib/session";

export async function login(data: { email: string; password: string }) {
  const payload = await fetch("http://localhost:8090/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await payload.json();
  if (result.result?.token) {
    await createSession(result.result.token);
    redirect("/dashboard");
  }
}

export async function logout() {
  destroySession();
  redirect("/");
}

export async function getProfile() {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch("http://localhost:8090/api/admin/getProfile", {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  const data = await payload.json();
  if (data.success == 200) return data.result;
  return null;
}

export async function getUsers() {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch("http://localhost:8090/api/admin/users/list", {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  const data = await payload.json();
  if (data.success == 200) return data.result.users;
  return null;
}

export async function getRestaurants() {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    "http://localhost:8090/api/admin/restaurants/list",
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  const data = await payload.json();
  if (data.success == 200) return data.result.restaurants;
  return null;
}
