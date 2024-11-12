import { IsString, IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class CreateUpdateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;


  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  contrasena: string;

  @IsInt()
  @IsNotEmpty()
  idRol: number;
}