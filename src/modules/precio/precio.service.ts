import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrecioRepository } from './repositories/precio.repository';
import { CreateUpdatePrecioDto } from './dtos/create-update.dto';
import { ResponsePrecioDto } from './dtos/response.dto';
import { Repository } from 'typeorm';
import { Supermercado } from '../supermercado/entities/supermercado.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Precio } from './entities/precio.entity';

@Injectable()
export class PrecioService {
  constructor(
    @InjectRepository(Precio)
    private precioRepository: PrecioRepository,
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    @InjectRepository(Supermercado)
    private supermercadoRepository: Repository<Supermercado>,
  ) {}

  async findBySup(catid: number): Promise<ResponsePrecioDto[]> {
    const precios = await this.precioRepository.findBySup(catid);
    return precios.map((precio) => new ResponsePrecioDto(precio));
  }

  async getall(): Promise<ResponsePrecioDto[]> {
    const precios = await this.precioRepository.find({relations: ['supermercado','producto'],});
    return precios.map((precio) => new ResponsePrecioDto(precio));
  }

  async getbyid(precid: number): Promise<ResponsePrecioDto> {
    const precio = await this.precioRepository.findOne({
      where: { id: precid },
    relations: ['supermercado','producto'],
  });
    return new ResponsePrecioDto(precio);
  }
  async create(createUpdatePrecioDto: CreateUpdatePrecioDto): Promise<ResponsePrecioDto> {
    const producto = await this.productosRepository.findOne({
        where: { id: createUpdatePrecioDto.producto_id },
        relations: ['categoria'],
  });
    if (!producto) {
        throw new NotFoundException(`Producto con ID ${createUpdatePrecioDto.producto_id} no encontrado`);
      }
    const supermercado= await this.supermercadoRepository.findOne({
        where: { id: createUpdatePrecioDto.supermercado_id },
    });
    const precio = this.precioRepository.create({
        ...createUpdatePrecioDto,
        producto,supermercado
      });
    const precioSaved = await this.precioRepository.save(precio);
    return new ResponsePrecioDto(precioSaved);
  }
  async update(id: number, createUpdatePrecioDto: CreateUpdatePrecioDto): Promise<ResponsePrecioDto> {
    await this.precioRepository.update(id, createUpdatePrecioDto);
    const updatedPrecio = await this.precioRepository.getbyid(id);
    return new ResponsePrecioDto(updatedPrecio);
  }
  async remove(id: number): Promise<void> {
    await this.precioRepository.delete(id);
  }
}
