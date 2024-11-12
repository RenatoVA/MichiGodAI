import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoRepository } from './repositories/producto.repository';
import { CreateUpdateProductoDto } from './dtos/create-update.dto';
import { ResponseProductoDto } from './dtos/response.dto';
import { Repository } from 'typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: ProductoRepository,
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  async findByCat(catid: number): Promise<ResponseProductoDto[]> {
    const productos = await this.productosRepository.findByCat(catid);
    return productos.map((producto) => new ResponseProductoDto(producto));
  }

  async getall(): Promise<ResponseProductoDto[]> {
    const productos = await this.productosRepository.find({relations: ['categoria'],});
    return productos.map((producto) => new ResponseProductoDto(producto));
  }

  async getbyid(prodid: number): Promise<ResponseProductoDto> {
    const producto = await this.productosRepository.findOne({
      where: { id: prodid },
    relations: ['categoria'],
  });
    return new ResponseProductoDto(producto);
  }
  async create(createUpdateProductoDto: CreateUpdateProductoDto): Promise<ResponseProductoDto> {
    const categoria = await this.categoriasRepository.findOneBy({id:createUpdateProductoDto.categoria_id});
    if (!categoria) {
        throw new NotFoundException(`Categoria con ID ${createUpdateProductoDto.categoria_id} no encontrado`);
      }
    const producto = this.productosRepository.create({
        ...createUpdateProductoDto,
        categoria
      });
    const productoSaved = await this.productosRepository.save(producto);
    return new ResponseProductoDto(productoSaved);
  }
  async update(id: number, createUpdateProductoDto: CreateUpdateProductoDto): Promise<ResponseProductoDto> {
    await this.productosRepository.update(id, createUpdateProductoDto);
    const updatedProducto = await this.productosRepository.getbyid(id);
    return new ResponseProductoDto(updatedProducto);
  }
  async remove(id: number): Promise<void> {
    await this.productosRepository.delete(id);
  }
}
