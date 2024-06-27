import express from 'express';

import controllers from './controllers';
import middlewares from '../middlewares';

const usuarioRoutes = express.Router();

usuarioRoutes.post('/signUp', controllers.createAccount);
usuarioRoutes.post('/logIn', controllers.logIn);
usuarioRoutes.get('/isEmailRegistered', controllers.isEmailRegistered);
usuarioRoutes.get('/getUserFromToken', controllers.getUserFromToken);
usuarioRoutes.put('/modifyAccount', controllers.modifyAccount);
usuarioRoutes.delete('/logOut', controllers.logOut);
usuarioRoutes.delete('/deleteAccount', controllers.deleteAccount);

export default usuarioRoutes;
