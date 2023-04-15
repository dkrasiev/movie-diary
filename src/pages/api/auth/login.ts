import type { APIRoute } from "astro";
import defaultHttpErrorHandler from "../../../lib/httpUtils/default-http-error-handler";
import {
  badRequestResponse,
  jsonResponse,
} from "../../../lib/httpUtils/responses";
import { setRefreshCookie } from "../../../lib/httpUtils/set-refresh-cookie";
import authService from "../../../lib/services/auth.service";

export const post: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = (await request.json().catch(() => {})) || {};
    if (!email || !password) {
      throw badRequestResponse();
    }

    const { access, refresh } = await authService.login(email, password);
    setRefreshCookie(cookies, refresh);

    return jsonResponse(access);
  } catch (e) {
    return defaultHttpErrorHandler.handleError(e);
  }
};
