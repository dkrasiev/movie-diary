export abstract class HttpErrorHandler {
	abstract handleError(e: unknown): Response;
}
