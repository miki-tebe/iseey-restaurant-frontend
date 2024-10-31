"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { verifySession } from "@/lib/dal";
import { createSession, destroySession } from "@/lib/session";
import { profileFormSchema } from "@/app/dashboard/profile/page";
import { addUserFormSchema } from "@/app/dashboard/users/add/page";
import { editUserFormSchema } from "@/app/dashboard/users/edit/[id]/page";
import { offerFormSchema } from "@/app/dashboard/offers/add/page";
import { editOfferFormSchema } from "@/app/dashboard/offers/edit/[id]/page";

export async function login(data: { email: string; password: string }) {
  const payload = await fetch("http://localhost:8090/api/restaurants/login", {
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
    const payload = await fetch(
      "http://localhost:8090/api/restaurants/getProfile",
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
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

export async function getGuests() {
  const session = await verifySession();
  if (!session) return null;
  try {
    const payload = await fetch(
      "http://localhost:8090/api/restaurants/customers/list",
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    const data = await payload.json();
    if (data.success == 200) return data.result.customers;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function getGuest(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `http://localhost:8090/api/restaurants/users/get/${data.id}`,
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

export async function updateUser(
  data: z.infer<typeof editUserFormSchema>,
  id: string
) {
  const session = await verifySession();
  if (!session) return null;

  if (data.dob) {
    data.dob = new Date(data.dob).getTime().toString();
  }

  const payload = await fetch(
    `http://localhost:8090/api/admin/users/updateProfile/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
    }
  );
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

export async function getOffers() {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    "http://localhost:8090/api/restaurants/offers/list",
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  const data = await payload.json();
  if (data.success == 200) return data.result.offers;
  return null;
}

export async function getOffer(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `http://localhost:8090/api/restaurants/offers/get/${data.id}`,
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

export async function addOffer(data: z.infer<typeof offerFormSchema>) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    "http://localhost:8090/api/restaurants/offers/create",
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

export async function updateOffer(
  data: z.infer<typeof editOfferFormSchema>,
  id: string
) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `http://localhost:8090/api/restaurants/offers/update/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
    }
  );
  revalidatePath("/dashboard/offers");
  return await payload.json();
}

export async function deleteOffer(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `http://localhost:8090/api/restaurants/offers/delete/${data.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  revalidatePath("/dashboard/offers");
  return await payload.json();
}

export async function getNewsletters() {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    "http://localhost:8090/api/restaurants/newsletter/list",
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  const data = await payload.json();
  if (data.success == 200) return data.result.newsletters;
  return null;
}
