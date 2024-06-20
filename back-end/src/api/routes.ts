import express from 'express';

import authRoutes from './auth/routes';
import docRoutes from './documento/routes';

const router = express.Router();

router.use('/users', authRoutes);
router.use('/documents', docRoutes);

router.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: 'La ruta solicitada no existe o no está disponible temporalmente',
  });
});

export default router;
