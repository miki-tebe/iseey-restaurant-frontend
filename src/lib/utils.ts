import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const getApiUrl = (path: string) => {
  const baseUrl = publicRuntimeConfig.apiBaseUrl;
  const basePath = publicRuntimeConfig.basePath;

  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  return `${baseUrl}${basePath}/api/${cleanPath}`;
};

export function getAssetPath(path: string) {
  const { publicRuntimeConfig } = getConfig();
  return `${publicRuntimeConfig.basePath || ""}${path}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
