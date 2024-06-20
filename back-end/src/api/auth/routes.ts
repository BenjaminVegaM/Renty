import express from 'express';

import authControllers from './controllers';
import middlewares from '../middlewares';

const authRoutes = express.Router();

authRoutes.get('/', middlewares.authGuard, authControllers.getUserFromToken)
authRoutes.post('/signup', authControllers.crearCuenta);
authRoutes.post('/login', authControllers.iniciarSesion);

export default authRoutes;
