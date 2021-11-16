import { Router, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { body, query } from 'express-validator'
import { validate } from '../lib/middleware/validate';
import { catchAsync } from '../lib/utils';

export const authController = {
  getRouter() {
    const router = Router();
    router.post(
      '/signup',
      [
        body('firstname').isString(),
        body('lastname').isString(),
        body('email').isString(),
        body('password').isString(),
        validate()
      ],
      catchAsync(
        this.signup
      )
    );
    router.post(
      '/login',
      [
        body('email').isString(),
        body('password').isString(),
        validate()
      ]
      ,
      catchAsync(
        this.login
      )
    );
    router.get(
      '/verify',
      [
        query('id').isNumeric(),
        query('token').isString(),
        validate()
      ],
      catchAsync(this.verify)
    );
    router.post(
      '/renew_token',
      [
        body('refreshToken').isString(),
        validate()
      ],
      catchAsync(this.renewToken)
    );
    return router;
  },
  async signup(req: Request, res: Response) {
    const { firstname, lastname, email, password } = req.body;
    const user = await authService.signup({
      email,
      firstname,
      lastname,
      password,
      role: 'user'
    })
    return res.json({
      data: user.toRespDto(),
      meta: {
        message: 'signup successful'
      }
    })
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const tokens = await authService.login({
      email,
      password
    })
    return res.json({
      data: tokens,
      meta: {
        message: 'login successful'
      }
    })
  },

  async verify(req: Request, res: Response) {
    const { id, token } = req.query;
    const user = await authService.confirmEmail({
      id: Number(id),
      token: String(token),
    })
    return res.json({
      data: user.toRespDto(),
      meta: {
        message: 'email confirmed'
      }
    })
  },

  async renewToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const token = await authService.renewAccessToken(refreshToken);
    return res.json({
      data: {
        accessToken: token
      },
      meta: {
        message: 'access token renew successful'
      }
    })

  },
}

authController.getRouter.bind(authController);