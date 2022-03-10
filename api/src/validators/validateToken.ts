import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedException } from '../exceptions/NotAuthorizedException';

export const checkTokenIsValid = (token: string): any => {
  const { JWT_SECRET } = process.env;

  return new Promise((resolve, reject) => {
    if (JWT_SECRET === undefined) return reject('Missing secret token');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject('Invalid Token');
      resolve(decoded);
    });
  });
}

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new NotAuthorizedException('Authorization token required');
    }

    const token: string = bearerToken.split(' ')[1];
    const decodedToken = await checkTokenIsValid(token);
    res.locals.user_id = decodedToken.user_id;

    next();
  } catch (err) {
    next(err);
  }
}