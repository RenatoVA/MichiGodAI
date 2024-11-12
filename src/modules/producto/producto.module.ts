import { Module } from '@nestjs/common';
import {
    getDataSourceToken,
    getRepositoryToken,
    TypeOrmModule,
  } from '@nestjs/typeorm';
  import { DataSource } from 'typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { customProductoRepository, ProductoRepository } from './repositories/producto.repository';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categoria/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]),TypeOrmModule.forFeature([Categoria])],
  controllers: [ProductoController],
  providers: [
    {
      provide: getRepositoryToken(Producto),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(Producto)
          .extend(customProductoRepository);
      },
    },
    ProductoService,
  ],
})
export class ProductoModule {}
