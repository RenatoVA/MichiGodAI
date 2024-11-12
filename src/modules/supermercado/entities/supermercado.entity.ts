import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('supermercados')
export class Supermercado {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 12 })
    telefono: string;
  
    @Column({ length: 100 })
    sitio_web: string;
}