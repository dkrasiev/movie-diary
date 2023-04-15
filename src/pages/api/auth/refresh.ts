import type { APIRoute } from "astro";
import { REFRESH_TOKEN_KEY } from "../../../lib/constants";
import defaultHttpErrorHandler from "../../../lib/httpUtils/default-http-error-handler";
import {
  jsonResponse,
  unauthorizedResponse,
} from "../../../lib/httpUtils/responses";
import { setRefreshCookie } from "../../../lib/httpUtils/set-refresh-cookie";
import authService from "../../../lib/services/auth.service";

export const post: APIRoute = async ({ cookies }) => {
  try {
    const refreshToken = cookies.get(REFRESH_TOKEN_KEY).value;
    if (!refreshToken) {
      return unauthorizedResponse();
    }

    const { access, refresh } = await authService.refresh(refreshToken);
    setRefreshCookie(cookies, refresh);

    return jsonResponse(access);
  } catch (e) {
    return defaultHttpErrorHandler.handleError(e);
  }
};
