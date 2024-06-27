import express from 'express';

import controllers from './controllers';
import middlewares from '../middlewares';

const clienteRoutes = express.Router();

clienteRoutes.post('/signUp', controllers.createAccount);
clienteRoutes.post('/logIn', controllers.logIn);
clienteRoutes.get('/isEmailRegistered', controllers.isEmailRegistered);
clienteRoutes.get('/getUserFromToken', controllers.getUserFromToken);
clienteRoutes.put('/modifyAccount', controllers.modifyAccount);
clienteRoutes.delete('/deleteAccount', controllers.deleteAccount);

export default clienteRoutes;
