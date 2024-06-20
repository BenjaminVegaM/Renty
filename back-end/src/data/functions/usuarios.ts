import AppDataSource from '..';

import { Usuario } from '../entity/Usuario';

export const usuariosRepo = AppDataSource.getRepository(Usuario);
export async function existeUsuario(
  username: string,
  email: string,
): Promise<boolean> {
  return (await usuariosRepo.findOne({
    where: [{ username }, { email }],
  }))
    ? true
    : false;
}
