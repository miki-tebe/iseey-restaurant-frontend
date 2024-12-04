import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
const isProd = process.env.NODE_ENV === "production";

export const getBaseConfig = () => {
  const basePath = isProd ? "/restaurants" : "";

  return basePath;
};

// For client-side usage
export const getClientConfig = () => {
  try {
    // Only try to get Next.js config on client side
    if (typeof window !== "undefined") {
      const getConfig = require("next/config").default;
      const { publicRuntimeConfig } = getConfig() || {};
      return publicRuntimeConfig || getBaseConfig();
    }
  } catch (e) {
    console.warn("Unable to get client config, falling back to base config");
  }

  return getBaseConfig();
};

// Helper for asset URLs
export const getAssetPath = (path: string) => {
  const config = getClientConfig();
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${config}/${cleanPath}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
