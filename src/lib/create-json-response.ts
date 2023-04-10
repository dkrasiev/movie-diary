export function createJSONResponse(
  obj: object,
  options: ResponseInit = {}
): Response {
  return new Response(JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
}
