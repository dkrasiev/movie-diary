import type { APIRoute } from "astro";
import { getPremieres } from "../../api/get-premieres";

export const get: APIRoute = async function get() {
  const premieres = await getPremieres();

  return new Response(JSON.stringify(premieres));
};
