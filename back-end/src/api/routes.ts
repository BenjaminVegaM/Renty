import express from 'express';

import boletaRoutes from './boleta/routes';
import clienteRoutes from './cliente/routes';
import cobroRoutes from './cobro/routes';
import eventoRoutes from './evento/routes';
import propiedadRoutes from './propiedad/routes';
import usuarioRoutes from './usuario/routes';

const router = express.Router();

router.use('/boleta', boletaRoutes);
router.use('/cliente', clienteRoutes);
router.use('/cobro', cobroRoutes);
router.use('/evento', eventoRoutes);
router.use('/propiedad', propiedadRoutes);
router.use('/usuario', usuarioRoutes);

router.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found.',
    message: 'The requested route does not exist or is not currently available.',
  });
});

export default router;
