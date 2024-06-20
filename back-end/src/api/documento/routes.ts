import express from 'express';

import middlewares from '../middlewares';
import docControllers from './controllers';

const docRoutes = express.Router();

docRoutes.get('/', docControllers.getDocs);
docRoutes.post('/masive', middlewares.authGuard, docControllers.addDocs);
docRoutes.post('/', middlewares.authGuard, docControllers.addDoc);
docRoutes.put('/', middlewares.authGuard, docControllers.updateDoc);
docRoutes.delete('/', middlewares.authGuard, docControllers.deleteDoc);

export default docRoutes;
