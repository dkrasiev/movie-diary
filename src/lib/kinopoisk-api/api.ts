import axios from "axios";

export const kinopoiskApi = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech",
  headers: {
    "X-API-KEY": import.meta.env.KINOPOISK_API_TOKEN,
    "Content-Type": "application/json",
  },
});
