import type { APIRoute } from "astro";
import { getMovie } from "../../../api/get-movie";
import { getJson, setJson } from "../../../lib/redis-client";
import type { Movie } from "../../../models/movie";
import { createJSONResponse } from "../../../lib/create-json-response";

export const get: APIRoute = async function get({ params }) {
  const id: number = Number(params.id);
  if (!id) {
    return new Response("Bad request", { status: 400 });
  }

  const key = `movie:${id}`;
  const data = (await getJson<Movie>(key)) || (await getMovie(id));

  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  await setJson(key, data);
  return createJSONResponse(data);
};
