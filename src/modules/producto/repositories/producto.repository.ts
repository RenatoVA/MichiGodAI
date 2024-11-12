import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
export interface ProductoRepository extends Repository<Producto> {
    this: Repository<Producto>;
    findByCat(rolId: number): Promise<Producto[]>;
    getbyid(id: number): Promise<Producto>;
}
export const customProductoRepository : Pick<ProductoRepository,any>={
    findByCat(this:Repository<Producto>,cat_id: number) {
        return this.createQueryBuilder('producto')
        .leftJoinAndSelect('producto.categoria', 'categoria')
          .where('producto.category_id = :cat_id', { cat_id })
          .getMany();
      }
    ,
    getbyid(this:Repository<Producto>,id: number) {
        return this.createQueryBuilder('producto')
        .leftJoinAndSelect('producto.categoria', 'categoria')
        .where('producto.id = :id', { id })
        .getOne();
      }
    ,
};