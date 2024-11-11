import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity('roles')
export class Rol{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}