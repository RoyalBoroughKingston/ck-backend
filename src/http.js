import axios from "axios";
import Auth from "@/classes/Auth";
import router from "@/router";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URI
});

http.defaults.headers.post["Content-Type"] = "application/json";
http.interceptors.request.use(
  config => {
    // If the user is logged in then attach the access token.
    if (Auth.isLoggedIn) {
      config.headers["Authorization"] = `Bearer ${Auth.accessToken}`;
      return config;
    }

    // If the user was logged in, but the token has now expired.
    if (Auth.accessToken && Auth.hasExpired) {
      Auth.logout();
    }

    // If the user is not authenticated.
    return config;
  },
  error => Promise.reject(error)
);
http.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      Auth.logout();
      router.push({ name: "login" });
    } else {
      return Promise.reject(error);
    }
  }
);

export default http;
