import type { APIRoute } from "astro";
import { badRequestResponse, jsonResponse } from "../../../lib/responses";
import authService from "../../../lib/services/auth.service";

export const post: APIRoute = async ({ request }) => {
  const { email, password } = (await request.json().catch(() => {})) || {};

  if (!email || !password) {
    return badRequestResponse();
  }

  const result = await authService.login(email, password);

  if (result instanceof Response) {
    return result;
  }

  return jsonResponse(result);
};
