// axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000", // Set your backend URL here
});

export default instance;
