import type { APIRoute } from "astro";
import {
  badRequestResponse,
  internalErrorResponse,
  jsonResponse,
} from "../../../lib/responses";
import authService from "../../../lib/services/auth.service";

export const post: APIRoute = async ({ request }) => {
  try {
    const { email, password } = (await request.json().catch(() => {})) || {};

    if (!email || !password) {
      return badRequestResponse();
    }

    const result = await authService.register(email, password);

    if (result instanceof Response) {
      return result;
    }

    return jsonResponse(result);
  } catch (e) {
    return internalErrorResponse();
  }
};
