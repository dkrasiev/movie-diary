// Successful responses
export const jsonResponse = (body: object) =>
  new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Client error responses
export const badRequestResponse = () =>
  new Response("Bad Request", { status: 400 });

export const unauthorizedResponse = () =>
  new Response("Unauthorized", { status: 401 });

export const forbiddenResponse = () =>
  new Response("Forbidden", { status: 403 });

export const notFoundResponse = () =>
  new Response("Not Found", { status: 404 });

export const conflictResponse = () => new Response("Conflict", { status: 409 });

// Server error responses
export const internalErrorResponse = () =>
  new Response("Internal Error", { status: 500 });
