import type { APIRoute } from "astro";
import { Month, isMonth } from "../../../models/month";
import type { MovieShort } from "../../../models/movie";
import { getJson, setJson } from "../../../lib/redis-client";
import {
  badRequestResponse,
  jsonResponse,
} from "../../../lib/httpUtils/responses";
import { getPremieres } from "../../../lib/kinopoisk-api/get-premieres";
import defaultHttpErrorHandler from "../../../lib/httpUtils/default-http-error-handler";

export const get: APIRoute = async function get({ request }) {
  try {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);
    const { year, month } = params;
    if (!year || isMonth(month) === false) {
      throw badRequestResponse();
    }

    const key = `premieres:${year}:${month}`;
    const data =
      (await getJson<MovieShort[]>(key)) ||
      (await getPremieres(year, month as Month));

    await setJson(key, data);
    return jsonResponse(data);
  } catch (e) {
    return defaultHttpErrorHandler.handleError(e);
  }
};
