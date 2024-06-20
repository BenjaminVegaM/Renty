import { Entity, Column, Unique, PrimaryColumn, OneToMany } from 'typeorm';

import { Documento } from './Documento';

@Entity()
@Unique(['username', 'email'])
export class Usuario {
  @PrimaryColumn()
  username: string;

  @Column({ type: 'text', length: 80 })
  email: string;

  @Column({ type: 'text', length: 20 })
  password: string;

  @Column({ type: 'text', length: 20 })
  rol: string;

  @OneToMany(() => Documento, (documento) => documento.usuario)
  documentos: Documento[];
}
