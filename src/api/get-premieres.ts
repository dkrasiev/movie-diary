import type { MovieShort } from "../models/movie";
import type { Month } from "../models/month";
import { kinopoiskApi } from "./kinopoisk-api";

export async function getPremieres(
  year: string | number,
  month: Month
): Promise<MovieShort[]> {
  return kinopoiskApi
    .get<{ total: number; items: MovieShort[] }>(`api/v2.2/films/premieres`, {
      params: {
        year,
        month,
      },
    })
    .then((response) => response.data.items)
    .catch(() => []);
}
