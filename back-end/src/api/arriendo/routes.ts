import express from 'express';

import controllers from './controllers';
import middlewares from '../middlewares';

const arriendoRoutes = express.Router();

arriendoRoutes.get('/getArriendos', controllers.getArriendos);
arriendoRoutes.post('/crear', controllers.crear);
arriendoRoutes.put('/modificar', controllers.modificar);
arriendoRoutes.delete('/eliminar', controllers.eliminar);
arriendoRoutes.put('/cambiarCliente', controllers.cambiarCliente);
arriendoRoutes.get('/verBoletas', controllers.verBoletas);
arriendoRoutes.get('/verCliente', controllers.verCliente);
arriendoRoutes.get('/getDatosPagos', controllers.getDatosPagos);

export default arriendoRoutes;
