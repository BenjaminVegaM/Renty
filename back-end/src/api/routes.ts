import express from 'express';

import usuarioRoutes from './usuario/routes';
import arriendoRoutes from './arriendo/routes';
import boletaRoutes from './boleta/routes';
import cobroRoutes from './cobro/routes';
import eventoRoutes from './evento/routes';
import clienteRoutes from './cliente/routes';

const router = express.Router();

router.use('/usuario', usuarioRoutes);
router.use('/arriendo', arriendoRoutes);
router.use('/boleta', arriendoRoutes);
router.use('/cobro', cobroRoutes);
router.use('/evento', eventoRoutes);
router.use('/cliente', clienteRoutes);

router.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found.',
    message: 'The requested route does not exist or is not currently available.',
  });
});

export default router;
