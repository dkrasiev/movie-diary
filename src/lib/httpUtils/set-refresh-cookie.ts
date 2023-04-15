import type { AstroCookies } from "astro";
import { REFRESH_EXPRIRE_TIME, REFRESH_TOKEN_KEY } from "../constants";

export function setRefreshCookie(cookies: AstroCookies, token: string) {
  cookies.set(REFRESH_TOKEN_KEY, token, {
    maxAge: REFRESH_EXPRIRE_TIME,
    httpOnly: true,
  });
}
