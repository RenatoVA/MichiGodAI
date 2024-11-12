import { Module } from '@nestjs/common';
import {
    getDataSourceToken,
    getRepositoryToken,
    TypeOrmModule,
  } from '@nestjs/typeorm';
  import { DataSource } from 'typeorm';
import { PrecioService } from './precio.service';
import { PrecioController } from './precio.controller';
import { customPrecioRepository, PrecioRepository } from './repositories/precio.repository';
import { Precio } from './entities/precio.entity';
import { Supermercado } from '../supermercado/entities/supermercado.entity';
import { Producto } from '../producto/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Precio]),TypeOrmModule.forFeature([Producto]),TypeOrmModule.forFeature([Supermercado])],
  controllers: [PrecioController],
  providers: [
    {
      provide: getRepositoryToken(Precio),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(Precio)
          .extend(customPrecioRepository);
      },
    },
    PrecioService,
  ],
})
export class PrecioModule {}
