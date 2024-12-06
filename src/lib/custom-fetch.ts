import https from "node:https";
import { readFileSync } from "node:fs";

interface NodeFetchOptions extends RequestInit {
  agent?: https.Agent;
  baseUrl?: string;
}

const isProd = process.env.NODE_ENV === "production";
const isServer = typeof window === "undefined";

const getBaseUrl = () => {
  const baseUrl = isProd
    ? "https://iseey.app/restaurants"
    : "http://localhost:5002";
  console.log("Base URL:", baseUrl);
  return baseUrl;
};

const createHttpsAgent = () => {
  console.log("Creating HTTPS agent");
  console.log("Is Server:", isServer);
  console.log("Is Production:", isProd);

  if (isServer && isProd) {
    try {
      console.log("Attempting to load SSL certificates...");

      // Log available files
      const fs = require("fs");
      console.log("SSL directory contents:", fs.readdirSync("/app/ssl"));

      const caBundle = readFileSync("/app/ssl/iseey_app.ca-bundle");
      console.log("CA Bundle loaded, size:", caBundle.length);

      const cert = readFileSync("/app/ssl/iseey_app.crt");
      console.log("Certificate loaded, size:", cert.length);

      const agent = new https.Agent({
        ca: [caBundle],
        cert: cert,
        rejectUnauthorized: true,
      });

      console.log("HTTPS Agent created successfully");
      return agent;
    } catch (error: any) {
      console.error("Failed to load SSL certificates:", error);
      console.error("Error stack:", error.stack);

      // In production, create agent with default certificates
      console.log("Creating fallback HTTPS agent");
      return new https.Agent({
        rejectUnauthorized: true,
      });
    }
  } else if (isServer && !isProd) {
    console.log(
      "Development mode - creating agent with rejectUnauthorized: false"
    );
    return new https.Agent({
      rejectUnauthorized: false,
    });
  }

  console.log("No HTTPS agent created (client-side or non-server environment)");
  return undefined;
};

const customFetch = async <T = any>(
  path: string,
  options: NodeFetchOptions = {}
): Promise<T> => {
  try {
    console.log("Starting fetch request");
    console.log("Path:", path);
    console.log("Options:", JSON.stringify(options, null, 2));

    const { baseUrl = getBaseUrl(), ...fetchOptions } = options;
    const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
    console.log("Full URL:", url);

    if (isServer) {
      console.log("Creating HTTPS agent for server-side request");
      const agent = createHttpsAgent();
      if (agent) {
        fetchOptions.agent = agent;
        console.log("HTTPS agent attached to request");
      } else {
        console.log("No HTTPS agent created");
      }
    }

    const headers = new Headers(fetchOptions.headers || {});
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    console.log("Request headers:", Object.fromEntries(headers.entries()));

    console.log("Making fetch request with options:", {
      ...fetchOptions,
      agent: fetchOptions.agent ? "HTTPS Agent Present" : "No Agent",
      headers: Object.fromEntries(headers.entries()),
    });

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    console.log("Response received");
    console.log("Status:", response.status);
    console.log("Status text:", response.statusText);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error text:", errorText);
      throw new Error(
        `HTTP error! Status: ${response.status}, Body: ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    console.log("Response content type:", contentType);

    if (contentType?.includes("application/json")) {
      const jsonData = await response.json();
      console.log("JSON response received");
      return jsonData as T;
    }

    const textData = await response.text();
    console.log("Text response received");
    return textData as T;
  } catch (error: any) {
    console.error("Detailed fetch error information:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    if (error.cause) {
      console.error("Error cause:", error.cause);
    }

    throw error;
  }
};

export default customFetch;
