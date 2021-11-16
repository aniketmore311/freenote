import { Handler } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../../config/config";
import { APIError } from "../APIError";

export function auth(): Handler {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw APIError.badRequest('Authorization token missing');
    }
    const parts = authHeader.split(' ');
    if (parts[0] !== 'Bearer' || parts.length !== 2) {
      throw APIError.badRequest('invalid Authorization token format');
    }
    try {
      const userToken = jwt.verify(parts[1], config.env.secretKey);
      res.locals.userToken = userToken;
      next();
    }catch(err){
      throw APIError.unauthorized('invalid Authorization token');
    }
  }
}