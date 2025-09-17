import type { AxiosRequestConfig } from "axios";
import { axiosPlugin } from "@/plugins/axios.ts";
import { storage } from "@/utils/storage.ts";
import { logOut } from "@/utils";

interface ApiRequest extends AxiosRequestConfig {
  open?: boolean;
  pk?: string;
  prefix?: string;
}

const { getToken } = storage;

async function httpClient<T = unknown>(config: ApiRequest) {
  try {
    if (!config.prefix) {
      config.prefix = import.meta.env.VITE_API_VERSION_URL;
    }
    config.url = `${config.prefix}/${config.url}`;
    if (!config.open) {
      const token = getToken();
      if (!token) {
        logOut();
      }
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return await axiosPlugin.request<T>(config);
  } catch (error) {
    throw error;
  }
}

export default httpClient;
