import { Repository } from 'typeorm';
import { Precio } from '../entities/precio.entity';
export interface PrecioRepository extends Repository<Precio> {
    this: Repository<Precio>;
    findBySup(rolId: number): Promise<Precio[]>;
    getbyid(id: number): Promise<Precio>;
}
export const customPrecioRepository : Pick<PrecioRepository,any>={
    findBySup(this:Repository<Precio>,sup_id: number) {
        return this.createQueryBuilder('precio')
        .leftJoinAndSelect('precio.supermercado', 'supermercado')
        .leftJoinAndSelect('precio.producto', 'producto')
          .where('precio.supermercado_id = :sup_id', { sup_id })
          .getMany();
      }
    ,
    getbyid(this:Repository<Precio>,id: number) {
        return this.createQueryBuilder('precio')
        .leftJoinAndSelect('precio.supermercado', 'supermercado')
        .leftJoinAndSelect('precio.producto', 'producto')
        .where('precio.id = :id', { id })
        .getOne();
      }
    ,
};