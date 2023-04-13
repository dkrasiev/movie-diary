import type { APIRoute } from "astro";
import { getJson, setJson } from "../../../lib/redis-client";
import type { Movie } from "../../../models/movie";
import {
  badRequestResponse,
  jsonResponse,
  notFoundResponse,
} from "../../../lib/responses";
import { getMovie } from "../../../lib/kinopoisk-api/get-movie";

export const get: APIRoute = async function get({ params }) {
  const id: number = Number(params.id);
  if (!id) {
    return badRequestResponse();
  }

  const key = `movie:${id}`;
  const data = (await getJson<Movie>(key)) || (await getMovie(id));

  if (!data) {
    return notFoundResponse();
  }

  await setJson(key, data);
  return jsonResponse(data);
};
