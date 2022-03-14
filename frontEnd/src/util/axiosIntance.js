import axios from "axios";

const backend_HOST = process.env.REACT_APP_BACKEND_HOST;

const axiosInstance = axios.create({
  baseURL: { backend_HOST },
  withCredentials: true,
  timeout: 3000,
});

export default axiosInstance;
