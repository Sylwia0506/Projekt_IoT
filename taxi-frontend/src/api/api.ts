import axios, { AxiosInstance } from "axios"
import AppConstants from "../constants/appConstants.ts"

export const api: AxiosInstance = axios.create({
  baseURL: AppConstants.apiUrl,
})
