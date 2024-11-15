import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Rol } from 'src/modules/rol/entities/rol.entity';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    nombres: string;

    @Column({ length: 100 })
    apellidos: string;
  
    @Column({ length: 100 })
    correo: string;
  
    @Column({ length: 100 })
    contrasena: string;
  
    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fecha_registro: Date;
  
    @ManyToOne(() => Rol, (rol) => rol.id)
    @JoinColumn({ name: 'rol_id' })
    rol: Rol;
}