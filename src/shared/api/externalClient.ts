import type { AxiosRequestConfig } from "axios";
import { axiosExternalPlugin } from "@/plugins/axios.ts";

async function externalHttpClient<T = unknown>(config: AxiosRequestConfig) {
  return axiosExternalPlugin.request<T>(config);
}

export default externalHttpClient;
