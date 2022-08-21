import axios, { AxiosRequestConfig } from "axios";
import { getFromLS } from "./localStorage";

const baseURL = process.env.VUE_APP_API_URL 
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((request: AxiosRequestConfig) => {
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];
  if (getFromLS("token")) {
    if(request.headers) {
      request.headers.Authorization = getFromLS("token");
    }
  }
  return request;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${baseURL}/refresh`
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      instance
        .post("/refresh", {
          body: {
            id: Number(getFromLS("user")),
            refreshToken: getFromLS("refreshToken"),
          },
        })
        .then((response) => {
          const newToken = response.data.data.newAccessToken;
          localStorage.setItem("token", newToken);
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          return instance(originalRequest);
        })
    }
    return Promise.reject(error);
  }
);

export default instance;
