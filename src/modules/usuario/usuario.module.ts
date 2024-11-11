import { Module } from '@nestjs/common';
import {
    getDataSourceToken,
    getRepositoryToken,
    TypeOrmModule,
  } from '@nestjs/typeorm';
  import { DataSource } from 'typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { customUsuarioRepository, UsuarioRepository } from './repositories/usuario.repository';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]),TypeOrmModule.forFeature([Rol])],
  controllers: [UsuarioController],
  providers: [
    {
      provide: getRepositoryToken(Usuario),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Task with a custom one
        return dataSource
          .getRepository(Usuario)
          .extend(customUsuarioRepository);
      },
    },
    UsuarioService,
  ],
})
export class UsuarioModule {}
