import { Precio } from "../entities/precio.entity";
import { Producto } from "../../producto/entities/producto.entity";
export class  ResponsePrecioDto {
    id: number;
    supermercado: string;
    producto: Producto;
    precio: string;
    fecha_precio:string;
    constructor(precio: Partial<Precio>) {
        this.id = precio.id;
        this.supermercado = precio.supermercado.nombre;
        this.producto = precio.producto;
        this.precio = precio.precio;
        this.fecha_precio=precio.fecha_precio;
      }
}