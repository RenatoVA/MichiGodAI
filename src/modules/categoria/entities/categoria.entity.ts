import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity('categorias')
export class Categoria{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}