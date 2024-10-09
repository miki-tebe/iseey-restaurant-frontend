"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { verifySession } from "@/lib/dal";
import { createSession, destroySession } from "@/lib/session";
import { profileFormSchema } from "@/app/dashboard/profile/page";
import { addUserFormSchema } from "@/app/dashboard/users/add/page";
import { restaurantFormSchema } from "@/app/dashboard/restaurants/add/page";

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

  try {
    const payload = await fetch("http://localhost:8090/api/admin/getProfile", {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const data = await payload.json();
    if (data.success == 200) return data.result;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateProfile(data: z.infer<typeof profileFormSchema>) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch("http://localhost:8090/api/admin/updateProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify(data),
  });
  return await payload.json();
}

export async function getUsers() {
  const session = await verifySession();
  if (!session) return null;
  try {
    const payload = await fetch("http://localhost:8090/api/admin/users/list", {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const data = await payload.json();
    if (data.success == 200) return data.result.users;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function getUser(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `http://localhost:8090/api/admin/users/getProfile/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  const result = await payload.json();
  if (result.success == 200) return result.result;
  return null;
}

export async function addUser(data: z.infer<typeof addUserFormSchema>) {
  const session = await verifySession();
  if (!session) return null;

  if (data.dob) {
    data.dob = new Date(data.dob).getTime().toString();
  }

  const payload = await fetch("http://localhost:8090/api/admin/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify(data),
  });
  revalidatePath("/dashboard/users");
  return await payload.json();
}

export async function deleteUser(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `http://localhost:8090/api/admin/users/delete/${data.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  revalidatePath("/dashboard/users");
  return await payload.json();
}

export async function getRestaurants() {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    "http://localhost:8090/api/admin/restaurants/list?limit=100",
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

export async function getRestaurant(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `http://localhost:8090/api/admin/restaurants/getRestaurant/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  const result = await payload.json();
  if (result.success == 200) return result.result;
  return null;
}

export async function addRestaurant(
  data: z.infer<typeof restaurantFormSchema>
) {
  const session = await verifySession();
  if (!session) return null;

  data.lat = "20.5797727";
  data.lng = "72.9341574";

  const payload = await fetch(
    "http://localhost:8090/api/admin/restaurants/addRestaurant",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return await payload.json();
}

export async function deleteRestaurant(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `http://localhost:8090/api/admin/restaurants/delete/${data.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  revalidatePath("/dashboard/restaurants");
  return await payload.json();
}
