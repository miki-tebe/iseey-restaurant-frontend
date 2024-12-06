import https from "node:https";

interface NodeFetchOptions extends RequestInit {
  agent?: https.Agent;
  baseUrl?: string;
}

const isProd = process.env.NODE_ENV === "production";
const isServer = typeof window === "undefined";

// Initialize root CAs at the module level
if (isServer) {
  try {
    const sslRootCAs = require("ssl-root-cas/latest");
    sslRootCAs.inject().addFile("/app/ssl/iseey_app.ca-bundle");
  } catch (error) {
    console.error("Failed to inject SSL certificates:", error);
  }
}

const getBaseUrl = () => {
  return isProd ? "https://iseey.app/restaurants" : "http://localhost:5002";
};

const createHttpsAgent = () => {
  if (isServer && isProd) {
    return new https.Agent({
      rejectUnauthorized: true,
    });
  }

  if (isServer && !isProd) {
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
      const agent = createHttpsAgent();
      if (agent) {
        fetchOptions.agent = agent;
      }
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
