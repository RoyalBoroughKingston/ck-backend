import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URI
});

export default http;
