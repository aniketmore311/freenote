import { Handler } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../../config/config";
import { IUserToken, User } from "../../models/User";
import { APIError } from "../APIError";
import { catchAsync } from "../utils";

export function auth(opts?: { fetchUser: boolean }): Handler {
  return catchAsync(async function (req, res, next) {
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
      req.userToken = userToken as IUserToken;
      // res.locals.userToken = userToken;
      if (opts && opts.fetchUser) {
        const user = await User.query().findOne({ id: req.userToken.id, is_deleted: false });
        req.user = user;
      }
      next();
    } catch (err) {
      throw APIError.unauthorized('invalid Authorization token');
    }
  })

}