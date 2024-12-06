"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { verifySession } from "@/lib/dal";
import { createSession, destroySession } from "@/lib/session";
import { ITableStand, Price, Product } from "@/types/type";
import { createTableStandSchema } from "@/schema/table-stand.schema";
import { offerFormSchema } from "@/schema/offerFormSchema";
import { editOfferFormSchema } from "@/schema/offerEditSchema";
import { changePlanSchema } from "@/schema/changePlanSchema";
import { profileFormSchema } from "@/schema/profileSchema";
import { forgotPasswordSchema } from "@/schema/forgotPasswordSchema";
import { signupValidationSchema } from "@/schema/signUpSchema";
import customFetch from "@/lib/custom-fetch";

export async function login(data: { email: string; password: string }) {
  try {
    const payload = await customFetch(`/api/restaurants/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await payload.json();
    if (result.data?.token === undefined) {
      return result;
    }
    await createSession(result.data.token);
  } catch (error) {
    console.error("Error in login:", error);
    return { message: "Failed to login" };
  }
  redirect("/dashboard");
}

export async function signup(data: z.infer<typeof signupValidationSchema>) {
  try {
    data.lat = "1.3521";
    data.lng = "103.8198";
    const payload = await fetch(`/api/restaurants/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await payload.json();
    if (result.data?.token === undefined) {
      return result;
    }
    await createSession(result.data.token);
  } catch (error) {
    console.error("Error in signup:", error);
    return { message: "Failed to signup" };
  }
  redirect("/dashboard");
}

export async function logout() {
  destroySession();
  redirect("/");
}

export async function getProfile() {
  const session = await verifySession();
  if (!session) return null;
  try {
    const payload = await fetch(`/api/restaurants/profile`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const result = await payload.json();
    if (result.success == true) return result.data;
  } catch (e) {
    console.log(e);
    return { message: "Failed to fetch user profile" };
  }
  return null;
}

export async function updateProfile(data: z.infer<typeof profileFormSchema>) {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/restaurants/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
    });
    return await payload.json();
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return { message: "Failed to update profile" };
  }
}

export async function getGuests() {
  const session = await verifySession();
  if (!session) return null;
  try {
    const payload = await fetch(`/api/customers/list`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
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

  try {
    const payload = await fetch(`/api/customers/get/${data.id}`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const result = await payload.json();
    if (result.success == true) return result.data;
    return null;
  } catch (error) {
    console.error("Error in getGuest:", error);
    return { message: "Failed to fetch guest" };
  }
}

export async function deleteUser(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/admin/users/delete/${data.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    revalidatePath("/dashboard/users");
    return await payload.json();
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return { message: "Failed to delete user" };
  }
}

export async function getOffers() {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/offers/`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const result = await payload.json();
    if (result.success == true) return result.data;
    return null;
  } catch (error) {
    console.error("Error in getOffers:", error);
    return { message: "Failed to fetch offers" };
  }
}

export async function getOffer(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/offers/${data.id}`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const result = await payload.json();
    if (result.success == true) return result.data;
    return null;
  } catch (error) {
    console.error("Error in getOffer:", error);
    return { message: "Failed to fetch offer" };
  }
}

export async function addOffer(data: z.infer<typeof offerFormSchema>) {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/offers`, {
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
  } catch (error) {
    console.error("Error in addOffer:", error);
    return { message: "Failed to add offer" };
  }
}

export async function updateOffer(
  data: z.infer<typeof editOfferFormSchema>,
  id: string
) {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/offers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
    });
    revalidatePath("/dashboard/offers");
    return await payload.json();
  } catch (error) {
    console.error("Error in updateOffer:", error);
    return { message: "Failed to update offer" };
  }
}

export async function deleteOffer(data: { id: string }) {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/offers/${data.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    revalidatePath("/dashboard/offers");
    return await payload.json();
  } catch (error) {
    console.error("Error in deleteOffer:", error);
    return { message: "Failed to delete offer" };
  }
}

export async function getNewsletters() {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/newsletters/`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const result = await payload.json();

    if (result.success == true) return result.data.newsletters;
    return null;
  } catch (error) {
    console.error("Error in getNewsletters:", error);
    return { message: "Failed to fetch newsletters" };
  }
}

export async function uploadOfferPhoto(data: FormData) {
  const session = await verifySession();
  if (!session) return null;
  try {
    const payload = await fetch(`/api/upload/offer`, {
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
  } catch (error) {
    console.error("Error in uploadOfferPhoto:", error);
    return { message: "Failed to upload offer photo" };
  }
}

export async function uploadRestaurantMenus(data: FormData) {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/upload/menu`, {
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
  } catch (error) {
    console.error("Error in uploadRestaurantMenus:", error);
    return { message: "Failed to upload restaurant menu" };
  }
}

export async function forgotPassword(
  data: z.infer<typeof forgotPasswordSchema>
) {
  try {
    const payload = await fetch(`/api/restaurants/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await payload.json();
    return result;
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return { message: "Failed to send reset password email" };
  }
}

export async function resetPassword(data: {
  password: string;
  confirmPassword: string;
  token: string;
}) {
  try {
    const payload = await fetch(`/api/restaurants/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await payload.json();
    return result;
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return { message: "Failed to reset password" };
  }
}

// plans actions
export async function getPlans() {
  const session = await verifySession();
  if (!session) return null;
  try {
    const response = await fetch(`/api/stripe/getPrices`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch prices: ${response.statusText}`);
      throw new Error("Failed to fetch prices");
    }

    const result = await response.json();
    if (!result.success) {
      console.error("Failed to fetch prices:", result);
      throw new Error("Failed to fetch prices");
    }

    const products: Product[] = result.data;
    const prices: Price[] = [];
    let tableStands: ITableStand | undefined;

    products.forEach((product: Product) => {
      if (product.title === "Iseey") {
        const sortedPrices = product.prices.sort(
          (a, b) => a.unit_amount - b.unit_amount
        );
        prices.push(...sortedPrices);
      } else if (product.title === "Table Stand" && product.prices.length > 0) {
        tableStands = {
          product_id: product._id,
          price_id: product.prices[0]._id,
          unit_amount: product.prices[0].unit_amount,
        };
      }
    });

    return { prices, tableStands };
  } catch (error) {
    console.error("Error in getPlans:", error);
    return { message: "Failed to fetch prices" };
  }
}

export async function changePlan(data: z.infer<typeof changePlanSchema>) {
  const session = await verifySession();
  if (!session) return null;
  try {
    const payload = await fetch(`/api/stripe/change_plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await payload.json();
    return result;
  } catch (error) {
    console.error("Error in changePlan:", error);
    throw new Error("Failed to change plan");
  }
}

export async function fetchOrders() {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(`/api/stripe/orders`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const result = await payload.json();
    if (result.success == true) return result.data;
  } catch (error) {
    console.log(error);
    return { message: "Failed to fetch orders" };
  }
}

export async function createTableStand(
  data: z.infer<typeof createTableStandSchema>
) {
  console.log("create Table data", data);
  const session = await verifySession();
  if (!session) return null;
  try {
    const payload = await fetch(`/api/stripe/session/purchaseTableStand`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await payload.json();
    return result.data;
  } catch (error) {
    console.error("Error in creating Table Stand:", error);
    throw new Error("Failed to change plan");
  }
}

export async function getChartData(type: string, date: Date) {
  const session = await verifySession();
  if (!session) return null;

  try {
    const payload = await fetch(
      `/api/restaurants/chart-data/${type}?date=${date.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    const result = await payload.json();
    if (result.success == true) return result.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch chart data");
  }
}
