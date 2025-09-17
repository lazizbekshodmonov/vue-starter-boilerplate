import axios, { type AxiosError } from "axios";
import { logOut } from "@/utils";

export const axiosPlugin = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosExternalPlugin = axios.create({
  timeout: 10000,
});

function createAxiosResponseInterceptor() {
  const interceptor = axiosPlugin.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }
      axios.interceptors.response.eject(interceptor);
      logOut();
      // return refreshAccessToken(error);
    },
  );
}

// async function refreshAccessToken(error: AxiosError) {
//   const refresh_token = getAccessToken();
//   if (refresh_token) {
//     return axios<unknown, AxiosResponse<IAuthResponse>>({
//       url: `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_VERSION_URL}/auth/token`,
//       method: "POST",
//       data: {
//         grant_type: GrantType.REFRESH_TOKEN,
//         refresh_token: refresh_token,
//       },
//     })
//       .then(({ data }) => {
//         setTokens(data.token);
//
//         return axios({
//           ...error.response?.config,
//           headers: {
//             ...error.response?.config.headers,
//             Authorization: `Bearer ${data.token}`,
//           },
//         });
//       })
//       .catch((error2) => {
//         logOut();
//         return Promise.reject(error2);
//       })
//       .finally(createAxiosResponseInterceptor);
//   }
//   logOut();
//   return Promise.reject("Error");
// }

createAxiosResponseInterceptor();
