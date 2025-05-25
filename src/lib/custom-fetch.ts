interface NodeFetchOptions extends RequestInit {
  baseUrl?: string;
}

const isProd = process.env.NODE_ENV === "production";

const getBaseUrl = () => {
  // return isProd
  //   ? "https://iseey.app/restaurants"
  //   : "https://iseey.app/restaurants";
  return isProd ? "https://iseey.app/restaurants" : "http://localhost:5002";
};

const customFetch = async <T = any>(
  path: string,
  options: NodeFetchOptions = {}
): Promise<T> => {
  try {
    const { baseUrl = getBaseUrl(), ...fetchOptions } = options;
    const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

    const headers = new Headers(fetchOptions.headers || {});
    // if (!headers.has("Content-Type")) {
    //   headers.set("Content-Type", "application/json");
    // }

    // Temporarily disable SSL verification for server-side requests
    if (isProd && typeof window === "undefined") {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
    // remove this part
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      // console.log("Fetching:", url);
      // console.log("Options:", {
      //   ...fetchOptions,
      //   headers: Object.fromEntries(headers.entries()),
      // });

      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      // Log response details
      // console.log("Response status:", response.status);
      // console.log(
      //   "Response headers:",
      //   Object.fromEntries(response.headers.entries())
      // );

      // if (!response.ok) {
      //   let errorMessage;
      //   try {
      //     const errorData = await response.text();
      //     errorMessage = `HTTP error! Status: ${response.status}, Body: ${errorData}`;
      //   } catch (e) {
      //     errorMessage = `HTTP error! Status: ${response.status}`;
      //   }
      //   throw new Error(errorMessage);
      // }

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        // console.log("--------------------------", errorData);
        throw new Error(errorData?.message || "Something went wrong");
      }

      const contentType = response.headers.get("content-type");

      // Safe JSON parsing
      if (contentType?.includes("application/json")) {
        try {
          const text = await response.text();
          // Handle empty response
          if (!text) {
            return {} as T;
          }
          return JSON.parse(text) as T;
        } catch (e) {
          // console.error("JSON parsing error:", e);
          throw new Error("Failed to parse JSON response");
        }
      }

      return response.text() as Promise<T>;
    } finally {
      // Reset SSL verification
      if (isProd && typeof window === "undefined") {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
      }
    }
  } catch (error) {
    // console.error(`Fetch error for ${path}:`, error);
    // Add more context to the error
    if (error instanceof Error) {
      error.message = `${error.message}`;
    }
    throw error;
  }
};

export default customFetch;
