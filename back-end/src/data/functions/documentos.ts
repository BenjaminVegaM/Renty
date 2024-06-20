import AppDataSource from '..';

import { Documento } from '../entity/Documento';

export const docRepo = AppDataSource.getRepository(Documento);
