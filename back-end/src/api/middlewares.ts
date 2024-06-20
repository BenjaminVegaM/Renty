import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secretkey';

export interface CustomRequest extends Request {
  token: { id: string; username: string; rol: string };
}

function authGuard(req: Request, res: Response, next: NextFunction): void {
  if (!req.header('authorization')) {
    res.status(401).send({
      message: 'Error: No se ha recibido el token de autenticación',
    });
    return;
  }
  const token = req.header('authorization').replace('Bearer ', '');
  try {
    const decoded: { id: string; username: string; rol: string } = jwt.verify(
      token,
      SECRET_KEY,
    ) as { id: string; username: string; rol: string };
    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      message: 'Error: Token de autenticación inválido',
    });
    return;
  }
}
export default {
  authGuard,
};
