import express from 'express';

import controllers from './controllers';
import middlewares from '../middlewares';

const boletaRoutes = express.Router();

boletaRoutes.post('/crear', controllers.crear);
/*
boletaRoutes.get('/getBoletas', controllers.getArriendos);
boletaRoutes.put('/modificar', controllers.modificar);
boletaRoutes.delete('/eliminar', controllers.eliminar);
boletaRoutes.put('/cambiarCliente', controllers.cambiarCliente);
boletaRoutes.get('/verBoletas', controllers.verBoletas);
boletaRoutes.get('/verCliente', controllers.verCliente);
boletaRoutes.get('/getDatosPagos', controllers.getDatosPagos);
*/

export default boletaRoutes;
