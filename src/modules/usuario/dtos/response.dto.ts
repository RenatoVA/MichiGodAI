import { Usuario } from '../entities/usuario.entity';
export class  ResponseUsuarioDto {
    id: number;
    nombres: string;
    apellidos: string;
    correo: string;
    rol:string;
    constructor(usuario: Partial<Usuario>) {
        this.id = usuario.id;
        this.nombres = usuario.nombres;
        this.apellidos = usuario.apellidos;
        this.correo = usuario.correo;
        this.rol=usuario.rol.name;
      }
}