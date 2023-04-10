import type { APIRoute } from "astro";
import { getPremieres } from "../../../api/get-premieres";
import { Month, isMonth } from "../../../models/month";
import type { MovieShort } from "../../../models/movie";
import { getJson, setJson } from "../../../lib/redis-client";
import { createJSONResponse } from "../../../lib/create-json-response";

export const get: APIRoute = async function get({ request }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);
  const { year, month } = params;
  if (!year || isMonth(month) === false) {
    return new Response("Bad request", { status: 400 });
  }

  const key = `premieres:${year}:${month}`;
  const data =
    (await getJson<MovieShort[]>(key)) ||
    (await getPremieres(year, month as Month));

  await setJson(key, data);
  return createJSONResponse(data);
};
