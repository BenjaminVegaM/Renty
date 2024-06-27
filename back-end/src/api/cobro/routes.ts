import express from 'express';

import controllers from './controllers';
import middlewares from '../middlewares';

const cobroRoutes = express.Router();

cobroRoutes.post('/signUp', controllers.createAccount);
cobroRoutes.post('/logIn', controllers.logIn);
cobroRoutes.get('/isEmailRegistered', controllers.isEmailRegistered);
cobroRoutes.get('/getUserFromToken', controllers.getUserFromToken);
cobroRoutes.put('/modifyAccount', controllers.modifyAccount);
cobroRoutes.delete('/deleteAccount', controllers.deleteAccount);

export default cobroRoutes;
