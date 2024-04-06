import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';

const verifyCallback =
  (
    req: any,
    resolve: (value?: unknown) => void,
    reject: (reason?: unknown) => void,
  ) =>
    async (err: unknown, user: User | false, info: unknown) => {
      if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
      }
      req.user = user;

      resolve();
    };

const auth =
  () =>
    async (req: Request, res: Response, next: NextFunction) => {
      return new Promise((resolve, reject) => {
        passport.authenticate(
          'jwt',
          { session: false },
          verifyCallback(req, resolve, reject)
        )(req, res, next);
      })
        .then(() => next())
        .catch((err) => next(err));
    };

export default auth;