import { Controller, Get, Post, Body, Param, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUpdateUsuarioDto } from './dtos/create-update.dto';
import { ResponseUsuarioDto } from './dtos/response.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuariosService: UsuarioService) {}

  @Get()
  async findAll(): Promise<ResponseUsuarioDto[]> {
    return this.usuariosService.getall();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseUsuarioDto> {
    const usuario = await this.usuariosService.getbyid(id);
    return usuario;
  }
  @Get('/rol/:rolId')
  async findByRol(@Param('rolId') rolId: number): Promise<ResponseUsuarioDto[]> {
    return this.usuariosService.findbyrol(rolId);
  }

  @Post()
  async create(@Body(new ValidationPipe()) createUsuarioDto: CreateUpdateUsuarioDto): Promise<ResponseUsuarioDto> {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateUsuarioDto: CreateUpdateUsuarioDto,
  ): Promise<ResponseUsuarioDto> {
    return this.usuariosService.update(id, updateUsuarioDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usuariosService.remove(id);
  }
}
