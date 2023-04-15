import { HttpErrorHandler } from "./abstract-http-error-handler";
import { internalErrorResponse } from "./responses";

export class DefaultHttpErrorHandler extends HttpErrorHandler {
  handleError(e: any): Response {
    console.error(e);

    if (e instanceof Response) {
      return e;
    }

    return internalErrorResponse();
  }
}

export default new DefaultHttpErrorHandler();
