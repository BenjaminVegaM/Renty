import express from 'express';

import controllers from './controllers';
import middlewares from '../middlewares';

const eventoRoutes = express.Router();

eventoRoutes.post('/signUp', controllers.createAccount);
eventoRoutes.post('/logIn', controllers.logIn);
eventoRoutes.get('/isEmailRegistered', controllers.isEmailRegistered);
eventoRoutes.get('/getUserFromToken', controllers.getUserFromToken);
eventoRoutes.put('/modifyAccount', controllers.modifyAccount);
eventoRoutes.delete('/deleteAccount', controllers.deleteAccount);

export default eventoRoutes;
