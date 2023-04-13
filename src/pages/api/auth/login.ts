import type { APIRoute } from "astro";
import { badRequestResponse, jsonResponse } from "../../../lib/responses";

export const post: APIRoute = async ({ request }) => {
  const { login, password } = (await request.json().catch(() => {})) || {};

  if (!login || !password) {
    return badRequestResponse();
  }

  return jsonResponse({ login, password });
};
