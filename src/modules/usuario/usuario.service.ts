import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from './repositories/usuario.repository';
import { CreateUpdateUsuarioDto } from './dtos/create-update.dto';
import { ResponseUsuarioDto } from './dtos/response.dto';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: UsuarioRepository,
    @InjectRepository(Rol)
    private rolesRepository: Repository<Rol>,
  ) {}

  async findbyrol(rolId: number): Promise<ResponseUsuarioDto[]> {
    const usuarios = await this.usuariosRepository.findByRol(rolId);
    return usuarios.map((usuario) => new ResponseUsuarioDto(usuario));
  }

  async getall(): Promise<ResponseUsuarioDto[]> {
    const usuarios = await this.usuariosRepository.find(
      {relations: ['rol'],}
    );
    console.log(usuarios);
    return usuarios.map((usuario) => new ResponseUsuarioDto(usuario));
  }

  async getbyid(id: number): Promise<ResponseUsuarioDto> {
    const usuario = await this.usuariosRepository.getbyid(id);
    return new ResponseUsuarioDto(usuario);
  }
  async create(createUsuarioDto: CreateUpdateUsuarioDto): Promise<ResponseUsuarioDto> {
    const rol = await this.rolesRepository.findOneBy({id:createUsuarioDto.idRol});
    if (!rol) {
        throw new NotFoundException(`Rol con ID ${createUsuarioDto.idRol} no encontrado`);
      }
    const { contrasena, ...userData } = createUsuarioDto;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const usuario = this.usuariosRepository.create({
        ...userData,
        contrasena: hashedPassword,rol
      });
    const usuarioSaved = await this.usuariosRepository.save(usuario);
    return new ResponseUsuarioDto(usuarioSaved);
  }
  async update(id: number, createUsuarioDto: CreateUpdateUsuarioDto): Promise<ResponseUsuarioDto> {
    await this.usuariosRepository.update(id, createUsuarioDto);
    const updatedUsuario = await this.usuariosRepository.getbyid(id);
    return new ResponseUsuarioDto(updatedUsuario);
  }
  async remove(id: number): Promise<void> {
    await this.usuariosRepository.delete(id);
  }
}
