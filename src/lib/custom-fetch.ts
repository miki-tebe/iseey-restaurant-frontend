interface NodeFetchOptions extends RequestInit {
  baseUrl?: string;
}

const isProd = process.env.NODE_ENV === "production";

const getBaseUrl = () => {
  return isProd ? "https://iseey.app/restaurants" : "http://localhost:5002";
};

const parseResponse = async (response: Response) => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (e) {
    console.error("Failed to parse response:", text);
    throw new Error("Invalid JSON response");
  }
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

    if (isProd && typeof window === "undefined") {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      // Always parse as JSON for API endpoints
      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}, Body: ${JSON.stringify(
            data
          )}`
        );
      }

      return data as T;
    } finally {
      if (isProd && typeof window === "undefined") {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
      }
    }
  } catch (error) {
    console.error(`API Request Failed:`, error);
    throw error;
  }
};

export default customFetch;
