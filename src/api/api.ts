import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

// TODO: add redis storage for cache
export const api = setupCache(
  axios.create({
    baseURL: "https://kinopoiskapiunofficial.tech",
    headers: {
      "X-API-KEY": import.meta.env.KINOPOISK_API_TOKEN,
      "Content-Type": "application/json",
    },
  })
);
