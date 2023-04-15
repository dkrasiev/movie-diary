export abstract class HttpErrorHandler {
  abstract handleError(e: any): Response;
}
