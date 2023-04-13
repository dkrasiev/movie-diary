import { kinopoiskApi } from "./api";
import type { Movie } from "../models/movie";

export async function getMovie(id: number): Promise<Movie | undefined> {
  return kinopoiskApi
    .get<Movie>(`api/v2.2/films/${id}`)
    .then((response) => response.data)
    .catch(() => undefined);
}
