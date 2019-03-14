import axios from "axios";
import Auth from "@/classes/Auth";
import router from "@/router";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_API_URI}/core/v1`
});

http.defaults.headers.post["Content-Type"] = "application/json";
http.interceptors.request.use(
  config => {
    // If the user has been inactive for too long.
    if (Auth.inactive()) {
      router.push({ name: "logout" });
    }

    // If the user is logged in then attach the access token.
    if (Auth.isLoggedIn) {
      Auth.invokeActivity();
      config.headers["Authorization"] = `Bearer ${Auth.accessToken}`;
      return config;
    }

    // If the user was logged in, but the token has now expired.
    if (Auth.accessToken && Auth.hasExpired) {
      router.push({ name: "logout" });
    }

    // If the user is not authenticated.
    return config;
  },
  error => Promise.reject(error)
);
http.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 403) {
      alert("You are not authorised to perform this action.");
    } else if (error.response.status === 401) {
      router.push({ name: "logout" });
    } else {
      return Promise.reject(error);
    }
  }
);

export default http;
