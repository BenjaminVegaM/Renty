import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Documento {
  @PrimaryGeneratedColumn('increment')
  id: bigint;

  @Column({ nullable: false })
  titulo: string;

  @Column({ nullable: false })
  contenido: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.documentos)
  usuario: Usuario;
}
