export class APIError extends Error {

  code: string;
  statusCode: number;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }

  static get codes() {
    return {
      internalServerError: "INTERNAL_SERVER_ERROR",
      badRequest: "BAD_REQUEST",
      notFound: "NOT_FOUND",
      unauthorized: "UNAUTHORIZED",
      forbidden: "FORBIDDEN",
    }
  }

  static get statusCodes() {
    return {
      internalServerError: 500,
      badRequest: 400,
      notFound: 404,
      unauthorized: 401,
      forbidden: 403,
    }
  }

  static internalServerError(message: string): APIError {
    return new APIError(message, APIError.statusCodes.internalServerError, APIError.codes.internalServerError)
  }

  static badRequest(message: string): APIError {
    return new APIError(message, APIError.statusCodes.badRequest, APIError.codes.badRequest)
  }

  static notFound(message: string): APIError {
    return new APIError(message, this.statusCodes.notFound, this.codes.notFound)
  }

  static unauthorized(message: string) {
    return new APIError(message, this.statusCodes.unauthorized, this.codes.unauthorized);
  }

  static forbidden(message: string) {
    return new APIError(message, this.statusCodes.forbidden, this.codes.forbidden);
  }
}