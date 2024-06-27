import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secretkey';

export interface CustomRequest extends Request {
  token: { id: string; email: string; };
}

function authGuard(req: Request, res: Response, next: NextFunction): void {
  
  console.log(req.headers);
  const authorization = req.header('authorization');
  if (!authorization) {
    res.status(401).send({
      message: 'Error: The authorization token is missing.',
    });
    return;
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const decoded: { id: string; email: string; } = jwt.verify(
      token,
      SECRET_KEY,
    ) as { id: string; email: string; };
    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      message: 'Error: The authentication token is invalid.',
    });
    return;
  }
}
export default {
  authGuard,
};
