"use server";

import { redirect } from "next/navigation";

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
  if (result.result?.user_id) {
    await createSession(result.result.user_id);
    redirect("/dashboard");
  }
}

export async function logout() {
  destroySession();
  redirect("/");
}
