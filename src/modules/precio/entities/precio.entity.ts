import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Producto } from 'src/modules/producto/entities/producto.entity';
import { Supermercado } from 'src/modules/supermercado/entities/supermercado.entity';

@Entity('precios')
export class Precio {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    precio: string;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fecha_precio: string;
  
    @ManyToOne(() => Producto, (producto) => producto.id)
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

    @ManyToOne(() => Supermercado, (supermercado) => supermercado.id)
    @JoinColumn({ name: 'supermercado_id' })
    supermercado: Supermercado;
}