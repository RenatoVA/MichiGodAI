import { Usuario } from '../entities/usuario.entity';
export class  ResponseUsuarioDto {
    id_usuario: number;
    nombre_usuario: string;
    correo: string;
    rol:string;
    constructor(usuario: Partial<Usuario>) {
        this.id_usuario = usuario.id_usuario;
        this.nombre_usuario = usuario.nombre_usuario;
        this.correo = usuario.correo;
        this.rol=usuario.rol.name;
      }
}