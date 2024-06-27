import express from 'express';

import controllers from './controllers';
import middlewares from '../middlewares';

const boletaRoutes = express.Router();

boletaRoutes.post('/signUp', controllers.createAccount);
boletaRoutes.post('/logIn', controllers.logIn);
boletaRoutes.get('/isEmailRegistered', controllers.isEmailRegistered);
boletaRoutes.get('/getUserFromToken', controllers.getUserFromToken);
boletaRoutes.put('/modifyAccount', controllers.modifyAccount);
boletaRoutes.delete('/deleteAccount', controllers.deleteAccount);

export default boletaRoutes;
