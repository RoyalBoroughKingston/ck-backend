import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URI
});

http.defaults.headers.post["Content-Type"] = "application/json";

export default http;
