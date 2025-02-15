import axios, { AxiosError, AxiosResponse } from "axios";
import { errorLogger } from "../error/error-logger";

export const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorResponse = error.response;

    // Log the error
    errorLogger.logError("api_error", error, {
      url: errorResponse?.config?.url,
      method: errorResponse?.config?.method,
      status: errorResponse?.status,
      statusText: errorResponse?.statusText,
      data: errorResponse?.data,
    });

    return Promise.reject(error);
  },
);
