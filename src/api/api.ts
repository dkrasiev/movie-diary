import axios from "axios";

export const api = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech",
  headers: {
    "X-API-KEY": import.meta.env.KINOPOISK_API_TOKEN,
    "Content-Type": "application/json",
  },
});
