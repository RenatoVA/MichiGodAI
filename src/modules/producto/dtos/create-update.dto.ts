import { IsString, IsNotEmpty, IsInt,IsDecimal } from 'class-validator';

export class CreateUpdateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  unidad_medida: string;

  @IsInt()
  @IsNotEmpty()
  cantidad: number;

  @IsInt()
  @IsNotEmpty()
  categoria_id: number;
}