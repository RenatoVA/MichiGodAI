import { Controller, Get, Post, Body, Param, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { PrecioService } from './precio.service';
import { CreateUpdatePrecioDto } from './dtos/create-update.dto';
import { ResponsePrecioDto } from './dtos/response.dto';

@Controller('precios')
export class PrecioController {
  constructor(private readonly precioService: PrecioService) {}

  @Get()
  async findAll(): Promise<ResponsePrecioDto[]> {
    return this.precioService.getall();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponsePrecioDto> {
    const precio = await this.precioService.getbyid(id);
    return precio;
  }

  @Post()
  async create(@Body(new ValidationPipe()) createUpdatePrecioDto: CreateUpdatePrecioDto): Promise<ResponsePrecioDto> {
    return this.precioService.create(createUpdatePrecioDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) createUpdatePrecioDto: CreateUpdatePrecioDto,
  ): Promise<ResponsePrecioDto> {
    return this.precioService.update(id, createUpdatePrecioDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.precioService.remove(id);
  }
}
