import 'dotenv/config';
import app from './api/app';

import AppDataSource from './data';

const PORT = process.env.EXPRESS_PORT ?? 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log('[✅] TypeORM fue cargado exitosamente!');
    try {
      app.listen(PORT, () => {
        console.log(`  -> [ℹ️ ] Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.log('[❌] Error al iniciar el servidor: ', error);
    }
  })
  .catch((error) => {
    console.log('[❌] Error al cargar TypeORM: ', error);
  });
