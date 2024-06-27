import express from 'express';

import controllers from './controllers';
import middlewares from '../middlewares';

const propiedadRoutes = express.Router();

propiedadRoutes.post('/signUp', controllers.createAccount);
propiedadRoutes.post('/logIn', controllers.logIn);
propiedadRoutes.get('/isEmailRegistered', controllers.isEmailRegistered);
propiedadRoutes.get('/getUserFromToken', controllers.getUserFromToken);
propiedadRoutes.put('/modifyAccount', controllers.modifyAccount);
propiedadRoutes.delete('/deleteAccount', controllers.deleteAccount);

export default propiedadRoutes;
