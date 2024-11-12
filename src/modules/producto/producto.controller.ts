import { Controller, Get, Post, Body, Param, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateUpdateProductoDto } from './dtos/create-update.dto';
import { ResponseProductoDto } from './dtos/response.dto';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  async findAll(): Promise<ResponseProductoDto[]> {
    return this.productoService.getall();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseProductoDto> {
    const usuario = await this.productoService.getbyid(id);
    return usuario;
  }

  @Post()
  async create(@Body(new ValidationPipe()) createUpdateProductoDto: CreateUpdateProductoDto): Promise<ResponseProductoDto> {
    return this.productoService.create(createUpdateProductoDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) createUpdateProductoDto: CreateUpdateProductoDto,
  ): Promise<ResponseProductoDto> {
    return this.productoService.update(id, createUpdateProductoDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productoService.remove(id);
  }
}
