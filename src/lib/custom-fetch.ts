import axios, { AxiosRequestConfig, AxiosError } from "axios";

const isProd = process.env.NODE_ENV === "production";

// const getBaseUrl = () =>
//   isProd ? "https://iseey.app/restaurant" : "http://localhost:5002";

const apiClient = axios.create({
  // baseURL: getBaseUrl(),
  baseURL: "http://localhost:5002",
  headers: {
    "Content-Type": "application/json",
  },
});

const customFetch = async <T = any>(
  path: string,
  options: AxiosRequestConfig = {},
): Promise<T> => {
  try {
    const response = await apiClient.request<T>({
      url: path,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const message =
        (error.response.data as any)?.message || "Something went wrong";
      throw new Error(message);
    }
    throw error;
  }
};

export default customFetch;
