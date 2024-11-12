import { IsNotEmpty, IsInt,IsDecimal } from 'class-validator';

export class CreateUpdatePrecioDto {
  @IsDecimal()
  @IsNotEmpty()
  precio: string;

  @IsInt()
  @IsNotEmpty()
  supermercado_id: number;

  @IsInt()
  @IsNotEmpty()
  producto_id: number;
}