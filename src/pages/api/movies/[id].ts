import type { APIRoute } from "astro";
import { getJson, setJson } from "../../../lib/redis-client";
import type { Movie } from "../../../models/movie";
import {
  badRequestResponse,
  internalErrorResponse,
  jsonResponse,
  notFoundResponse,
} from "../../../lib/responses";
import { getMovie } from "../../../lib/kinopoisk-api/get-movie";

export const get: APIRoute = async function get({ params }) {
  try {
    const id: number = Number(params.id);
    if (!id) {
      throw badRequestResponse();
    }

    const key = `movie:${id}`;
    const data = (await getJson<Movie>(key)) || (await getMovie(id));

    if (!data) {
      throw notFoundResponse();
    }

    await setJson(key, data);
    return jsonResponse(data);
  } catch (e) {
    if (e instanceof Response) {
      return e;
    }

    return internalErrorResponse();
  }
};
