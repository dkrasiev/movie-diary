import { api } from "./api";
import type { Movie } from "../models/movie.interface";

export async function getMovie(id: string | number): Promise<Movie> {
  return api.get(`api/v2.2/films/${id}`).json<Movie>();
}
