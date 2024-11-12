import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
export interface UsuarioRepository extends Repository<Usuario> {
    this: Repository<Usuario>;
    findByRol(rolId: number): Promise<Usuario[]>;
    getbyid(id: number): Promise<Usuario>;
}
export const customUsuarioRepository : Pick<UsuarioRepository,any>={
    findByRol(this:Repository<Usuario>,rolId: number) {
        return this.createQueryBuilder('usuario')
          .leftJoinAndSelect('usuario.rol', 'rol')
          .where('usuario.rol = :rolId', { rolId })
          .getMany();
      }
    ,
    getbyid(this:Repository<Usuario>,id: number) {
        return this.createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.rol', 'rol')
        .where('usuario.id = :id', { id })
        .getOne();
      }
    ,
};