import { HttpError } from './http-error';

function createCustomHttpErrorGenerator(defaultMessage: string, status: number) {
	return (message?: string) => new HttpError(defaultMessage || message, status);
}

// Successful responses
export const jsonResponse = (body: object | string) =>
	new Response(JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json'
		}
	});

// Client error responses
export const badRequestResponse = createCustomHttpErrorGenerator('Bad Request', 400);
export const unauthorizedResponse = createCustomHttpErrorGenerator('Unauthorized', 401);
export const forbiddenResponse = createCustomHttpErrorGenerator('Forbidden', 403);
export const notFoundResponse = createCustomHttpErrorGenerator('Not Found', 404);
export const conflictResponse = createCustomHttpErrorGenerator('Conflict', 409);

// Server error responses
export const internalErrorResponse = createCustomHttpErrorGenerator('Internal Error', 500);
