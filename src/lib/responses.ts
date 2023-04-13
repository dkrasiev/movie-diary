export const badRequestResponse = () =>
  new Response("Bad request", { status: 400 });

export const notFoundResponse = () =>
  new Response("Not found", { status: 404 });

export const jsonResponse = (obj: object, options: ResponseInit = {}) =>
  new Response(JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
