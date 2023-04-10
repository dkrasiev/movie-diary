import axios from "axios";

export const appAxios = axios.create({
  baseURL: import.meta.env.API_URL,
});
