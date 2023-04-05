import type { Movie } from "../models/movie.interface";
import { Month } from "../models/month";
import { api } from "./api";

function getDefaultMonth(): Month {
  const date = new Date();

  return Object.values(Month)[date.getMonth()];
}

export async function getPremieres(
  year: number = new Date().getFullYear(),
  month = getDefaultMonth()
): Promise<Movie[]> {
  return api
    .get(`api/v2.2/films/premieres`, {
      searchParams: {
        year,
        month,
      },
    })
    .json<{ total: number; items: Movie[] }>()
    .then((result) => result.items);
}
