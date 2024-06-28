import express from 'express';

import controllers from './controllers';
import middlewares from '../middlewares';

const cobroRoutes = express.Router();

cobroRoutes.post('/crear', controllers.crear);
cobroRoutes.get('/getCobros', controllers.getCobros);
cobroRoutes.get('/getCobro', controllers.getCobro);
cobroRoutes.put('/pagarCobro', controllers.pagarCobro);
cobroRoutes.put('/despagarCobro', controllers.despagarCobro);

export default cobroRoutes;
