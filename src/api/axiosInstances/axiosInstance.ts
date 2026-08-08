import { BASE_URL } from "@/constants/urls";
import axios, { type AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
