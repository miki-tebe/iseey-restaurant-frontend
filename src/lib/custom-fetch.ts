import https from "node:https";
import { readFileSync } from "node:fs";

interface NodeFetchOptions extends RequestInit {
  agent?: https.Agent; // Add the 'agent' property for Node.js
  baseUrl?: string;
}

const isProd = process.env.NODE_ENV === "production";
const isServer = typeof window === "undefined";

const getBaseUrl = () => {
  if (isProd) {
    return "https://iseey.app";
  }
  return "http://localhost:9003";
};

const createHttpsAgent = () => {
  if (isServer && isProd) {
    try {
      return new https.Agent({
        ca: readFileSync("/app/ssl/iseey_app.ca-bundle"),
      });
    } catch (error) {
      console.warn(
        "Failed to load SSL certificate, falling back to default agent:",
        error
      );
      return new https.Agent({
        rejectUnauthorized: isProd,
      });
    }
  }
  return undefined;
};

const customFetch = async <T = any>(
  path: string,
  options: NodeFetchOptions = {}
): Promise<T> => {
  try {
    const { baseUrl = getBaseUrl(), ...fetchOptions } = options;
    const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

    // Add HTTPS agent for server-side requests
    if (isServer) {
      fetchOptions.agent = createHttpsAgent();
    }

    // Default headers
    const headers = new Headers(fetchOptions.headers || {});
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle different response types
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    return response.text() as Promise<T>;
  } catch (error) {
    console.error(`Fetch error for ${path}:`, error);
    throw error;
  }
};

export default customFetch;
