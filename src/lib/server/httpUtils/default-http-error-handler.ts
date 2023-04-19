import { HttpErrorHandler } from './abstract-http-error-handler';
import { HttpError } from './http-error';
import { internalErrorResponse } from './responses';

export class DefaultHttpErrorHandler extends HttpErrorHandler {
	handleError(e: unknown): Response {
		console.error(e);

		if (e instanceof HttpError) {
			return e.response;
		}

		return internalErrorResponse().response;
	}
}

export default new DefaultHttpErrorHandler();
