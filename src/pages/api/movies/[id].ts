import type { APIRoute } from "astro";
import { getMovie } from "../../../api/get-movie";

export const get: APIRoute = async function get({ params }) {
  const id: number = Number(params.id);

  if (!id) {
    return new Response("Not found", { status: 400 });
  }

  const movie = await getMovie(id);

  return new Response(JSON.stringify(movie));
};
