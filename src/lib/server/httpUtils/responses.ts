import { HttpError } from './http-error';

function createHttpErrorFactory(defaultMessage: string, status: number) {
	return (message?: string) => new HttpError(message || defaultMessage, status);
}

// Successful responses
export const jsonResponse = (body: object | string) =>
	new Response(JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json'
		}
	});

// Client error responses
export const badRequestResponse = createHttpErrorFactory('Bad Request', 400);
export const unauthorizedResponse = createHttpErrorFactory('Unauthorized', 401);
export const forbiddenResponse = createHttpErrorFactory('Forbidden', 403);
export const notFoundResponse = createHttpErrorFactory('Not Found', 404);
export const conflictResponse = createHttpErrorFactory('Conflict', 409);

// Server error responses
export const internalErrorResponse = createHttpErrorFactory('Internal Error', 500);
