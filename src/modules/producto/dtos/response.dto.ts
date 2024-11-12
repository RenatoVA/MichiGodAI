import { Producto } from "../entities/producto.entity";
export class  ResponseProductoDto {
    id: number;
    nombre: string;
    descripcion: string;
    unidad_medida: string;
    cantidad:number;
    categoria:string;
    constructor(producto: Partial<Producto>) {
        this.id = producto.id;
        this.nombre = producto.nombre;
        this.descripcion = producto.descripcion;
        this.cantidad = producto.cantidad;
        this.unidad_medida = producto.unidad_medida;
        this.categoria=producto.categoria.name;
      }
}