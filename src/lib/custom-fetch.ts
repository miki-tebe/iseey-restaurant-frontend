import https from "node:https";
import { readFileSync } from "node:fs";

interface NodeFetchOptions extends RequestInit {
  agent?: https.Agent;
  baseUrl?: string;
}

const isProd = process.env.NODE_ENV === "production";
const isServer = typeof window === "undefined";

const getBaseUrl = () => {
  if (isProd) {
    return "https://iseey.app/restaurants";
  }
  return "http://localhost:5002";
};

const createHttpsAgent = () => {
  if (isServer && isProd) {
    try {
      // Load both the CA bundle and the client certificate
      const ca = readFileSync("/app/ssl/iseey_app.ca-bundle");
      const cert = readFileSync("/app/ssl/iseey_app.crt");

      return new https.Agent({
        ca: [ca, cert], // Include both certificates in the chain
        cert: cert, // Include the client certificate
        rejectUnauthorized: true,
      });
    } catch (error) {
      console.warn(
        "Failed to load SSL certificates, falling back to default agent:",
        error
      );
      // In production, we still want to verify certificates
      return new https.Agent({
        rejectUnauthorized: true,
      });
    }
  } else if (isServer && !isProd) {
    // In development, optionally disable certificate verification
    return new https.Agent({
      rejectUnauthorized: false,
    });
  }
  return undefined; // Client-side doesn't need an agent
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
      const agent = createHttpsAgent();
      if (agent) {
        fetchOptions.agent = agent;
      }
    }

    // Default headers
    const headers = new Headers(fetchOptions.headers || {});
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    // Log request details in development
    if (!isProd) {
      console.log("Making request to:", url);
      console.log("With options:", {
        ...fetchOptions,
        agent: fetchOptions.agent ? "HTTPS Agent" : "None",
      });
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle different response types
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Body: ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    return response.text() as Promise<T>;
  } catch (error) {
    console.error(`Fetch error for ${path}:`, error);
    // Add more detailed error information
    if (error instanceof Error) {
      error.message = `Fetch error for ${path}: ${error.message}`;
    }
    throw error;
  }
};

export default customFetch;
