import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Categoria } from 'src/modules/categoria/entities/categoria.entity';

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    nombre: string;
    
    @Column({ length: 100 })
    descripcion: string;
  
    @Column({ length: 100 })
    unidad_medida: string;

    @Column()
    cantidad: number;
  
    @ManyToOne(() => Categoria, (categoria) => categoria.id)
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;
}