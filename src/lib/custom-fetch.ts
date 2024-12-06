interface NodeFetchOptions extends RequestInit {
  baseUrl?: string;
}

const isProd = process.env.NODE_ENV === "production";

const getBaseUrl = () => {
  // Always use the nginx proxy, which handles SSL
  return "https://iseey.app/restaurants";
};

const customFetch = async <T = any>(
  path: string,
  options: NodeFetchOptions = {}
): Promise<T> => {
  try {
    const { baseUrl = getBaseUrl(), ...fetchOptions } = options;
    const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

    const headers = new Headers(fetchOptions.headers || {});
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    // In production server-side, disable SSL verification since we're going through nginx
    if (isProd && typeof window === "undefined") {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    try {
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
    } finally {
      // Reset SSL verification
      if (isProd && typeof window === "undefined") {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
      }
    }
  } catch (error) {
    console.error(`Fetch error for ${path}:`, error);
    throw error;
  }
};

export default customFetch;
