import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn, Index, BaseEntity} from "typeorm";
import { Student } from "./student";

@Entity()
export class Parent extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() name: string;
    @Column('text') address: string;
    @Column() contactDetails: string;

    @Index() 
    @Column() surname: string;

    @CreateDateColumn({name: 'created_at'}) registration_date: Date;
    @UpdateDateColumn({name: 'updated_at'}) private _updated_at: Date;

}
