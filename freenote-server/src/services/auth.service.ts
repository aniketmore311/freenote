import { APIError } from "../lib/APIError";
import { IUserRepDto, User } from "../models/User";
import { IAuthService, loginDto, signupDto } from "../types/services/auth.service.interface";
import { hashPassword, hashString, match } from '../lib/password'
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const authService: IAuthService = {
  signup: async function (opts) {
    const user = await User.create(opts);
    return user;
  },

  login: async function (opts) {
    const email = opts.email;
    const password = opts.password;
    const user = await User.query().findOne({ email: email, is_deleted: false });
    if (user === undefined) {
      throw APIError.notFound('user not found');
    }
    if (user.is_verified == false) {
      throw APIError.forbidden('verify email before login');
    }
    const res = await match(password, user.password)
    if (!res) {
      throw APIError.unauthorized('wrong password');
    }
    const respDto = user.toRespDto();
    const passwordKey = await hashString(password, user.password_key_salt)
    const accessToken = jwt.sign({ ...respDto, passwordKey }, config.env.secretKey, {
      expiresIn: "15m"
    })
    const refreshToken = jwt.sign({ ...respDto, passwordKey }, config.env.secretKey, {
      expiresIn: "30d"
    })
    return {
      refreshToken,
      accessToken
    }
  },

  confirmEmail: async function (opts) {
    const user = await User.query().findOne({ id: opts.id, is_deleted: false });
    if (!user) {
      throw APIError.notFound('user not found');
    }
    await user.verify(opts.token);
    const userupdt = await User.query().findOne({ id: opts.id, is_deleted: false });
    return userupdt;
  },

  renewAccessToken: async function (refreshToken) {
    try {
      const token = jwt.verify(refreshToken, config.env.secretKey);
      if (typeof token == 'string') {
        throw APIError.badRequest('invalid token format');
      }
      const user = await User.query().findOne({ id: token.id, is_deleted: false });
      if (!user) {
        throw APIError.notFound('user not found');
      }
      if (user.is_forbidden) {
        throw APIError.forbidden('user forbidden');
      }
      const respDto = user.toRespDto();
      return jwt.sign({ ...respDto, passwordKey: token.passwordKey }, config.env.secretKey, {
        expiresIn: "15min"
      })
    } catch (err) {
      throw APIError.badRequest('invalid token');
    }
  },

  banUser: async function (id: number) {
    const user = await User.query().findOne({ id: id, is_deleted: false });
    if (!user) {
      throw APIError.notFound('user not found');
    }
    await user.ban();
    const userup = await User.query().findById(id);
    return userup;
  }

}
