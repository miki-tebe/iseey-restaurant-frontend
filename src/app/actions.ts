"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { verifySession } from "@/lib/dal";
import { createSession, destroySession } from "@/lib/session";
import { profileFormSchema } from "@/app/dashboard/profile/page";
import { offerFormSchema } from "@/app/dashboard/offers/add/page";
import { editOfferFormSchema } from "@/app/dashboard/offers/edit/[id]/page";
import { signupValidationSchema } from "@/app/signup/page";
import { forgotPasswordSchema } from "@/app/forgot-password/page";

const API_URL = process.env.API_URL;

export async function login(data: { email: string; password: string }) {
  const payload = await fetch(
    `${API_URL}/api/restaurant-app/restaurants/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await payload.json();
  if (result.data?.token) {
    await createSession(result.data.token);
    redirect("/dashboard");
  }
  return result;
}

export async function signup(data: z.infer<typeof signupValidationSchema>) {
  data.lat = "1.3521";
  data.lng = "103.8198";
  const payload = await fetch(
    `${API_URL}/api/restaurant-app/restaurants/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await payload.json();
  if (result.data?.token) {
    await createSession(result.data.token);
    redirect("/dashboard");
  }
  return result;
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
      `${API_URL}/api/restaurant-app/restaurants/profile`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    const result = await payload.json();
    if (result.success == true) return result.data;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateProfile(data: z.infer<typeof profileFormSchema>) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `${API_URL}/api/restaurant-app/restaurants/profile`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return await payload.json();
}

export async function getGuests() {
  const session = await verifySession();
  if (!session) return null;
  try {
    const payload = await fetch(
      `${API_URL}/api/restaurant-app/customers/list`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    const result = await payload.json();
    if (result.success == true) return result.data.customers;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function getGuest(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `${API_URL}/api/restaurant-app/customers/get/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  const result = await payload.json();
  if (result.success == true) return result.data;
  return null;
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

  const payload = await fetch(`${API_URL}/api/restaurant-app/offers/`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  const result = await payload.json();
  if (result.success == true) return result.data;
  return null;
}

export async function getOffer(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `${API_URL}/api/restaurant-app/offers/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  const result = await payload.json();
  if (result.success == true) return result.data;
  return null;
}

export async function addOffer(data: z.infer<typeof offerFormSchema>) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(`${API_URL}/api/restaurant-app/offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await payload.json();
  revalidatePath("/dashboard/offers");
  return result;
}

export async function updateOffer(
  data: z.infer<typeof editOfferFormSchema>,
  id: string
) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(`${API_URL}/api/restaurant-app/offers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify(data),
  });
  revalidatePath("/dashboard/offers");
  return await payload.json();
}

export async function deleteOffer(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  const payload = await fetch(
    `${API_URL}/api/restaurant-app/offers/${data.id}`,
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

  const payload = await fetch(`${API_URL}/api/restaurant-app/newsletters/`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  const result = await payload.json();

  if (result.success == true) return result.data.newsletters;
  return null;
}

export async function uploadOfferPhoto(data: FormData) {
  const session = await verifySession();
  if (!session) return null;
  const payload = await fetch(`${API_URL}/api/restaurant-app/upload/offer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
    body: data,
  });
  const result = await payload.json();
  if (result.success == true) {
    return { message: "Offer photo uploaded", url: result.data.url };
  } else return { message: "Failed to upload offer photo" };
}

export async function uploadRestaurantMenus(data: FormData) {
  const session = await verifySession();
  if (!session) return null;
  const payload = await fetch(`${API_URL}/api/restaurant-app/upload/menu`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
    body: data,
  });
  const result = await payload.json();
  if (result.success == true) {
    return { message: "Restaurant menu uploaded", url: result.data.url };
  } else return { message: "Failed to upload restaurant menu" };
}

export async function forgotPassword(
  data: z.infer<typeof forgotPasswordSchema>
) {
  const payload = await fetch(`${API_URL}/api/restaurant-app/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await payload.json();
  console.log(result);
  return result;
}

export async function resetPassword(data: {
  password: string;
  confirmPassword: string;
  token: string;
}) {
  const payload = await fetch(`${API_URL}/api/restaurant-app/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await payload.json();
  console.log(result);
  return result;
}
