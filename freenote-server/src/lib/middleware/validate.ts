import { Handler } from "express";
import { validationResult } from "express-validator";
import { APIError } from "../APIError";

export function validate(): Handler {
  return function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0]
      const message = `${error.param} ${error.msg}`
      throw APIError.badRequest(message);
    }
    next()
  }
}