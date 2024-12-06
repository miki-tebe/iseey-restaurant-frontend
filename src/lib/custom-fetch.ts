import https from "node:https";
import { readFileSync } from "node:fs";

interface NodeFetchOptions extends RequestInit {
  agent?: https.Agent;
  baseUrl?: string;
}

const isProd = process.env.NODE_ENV === "production";
const isServer = typeof window === "undefined";

const getBaseUrl = () => {
  return isProd ? "https://iseey.app/restaurants" : "http://localhost:5002";
};

const createHttpsAgent = () => {
  if (isServer && isProd) {
    try {
      // Load all certificates
      const caBundle = readFileSync("/app/ssl/iseey_app.ca-bundle", "utf8")
        .split("-----END CERTIFICATE-----")
        .filter((cert) => cert.trim().length > 0)
        .map((cert) => cert + "-----END CERTIFICATE-----");

      const clientCa = readFileSync("/app/ssl/ca-bundle-client.crt", "utf8")
        .split("-----END CERTIFICATE-----")
        .filter((cert) => cert.trim().length > 0)
        .map((cert) => cert + "-----END CERTIFICATE-----");

      // Combine all certificates
      const certs = [...caBundle, ...clientCa];

      return new https.Agent({
        ca: certs,
        rejectUnauthorized: true,
      });
    } catch (error) {
      console.error("SSL Certificate loading error:", error);
      // In production with error, still try with system certificates
      return new https.Agent({
        rejectUnauthorized: true,
      });
    }
  } else if (isServer && !isProd) {
    return new https.Agent({
      rejectUnauthorized: false,
    });
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

    if (isServer) {
      fetchOptions.agent = createHttpsAgent();
    }

    const headers = new Headers(fetchOptions.headers || {});
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

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
    throw error;
  }
};

export default customFetch;
