import axios from "axios";
import { errorCatch } from "./error.api";

export let baseURL = "https://jsonplaceholder.typicode.com/";
let url = "";
///export const baseURL = `http://${url}:4200/api`;
export const BaseImageUrl = `http://${url}:4200`;

export const BaseImageUrl2 = (path: string) => `http://${url}:4200${path}`;

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const $files = axios.create({
  baseURL,
  headers: { "Content-Type": "multipart/form-data" },
});

// instance.interceptors.request.use(async config => {

// })

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
    }
    throw error;
  }
);
export default instance;
