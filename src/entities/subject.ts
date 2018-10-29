import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";
import { Mark } from "./mark";

@Entity()
export class SchoolSubject extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() name: string;
    @CreateDateColumn({name: 'created_at'}) private _created_at: Date;
    @UpdateDateColumn({name: 'updated_at'}) private _updated_at: Date;

    @Index()
    @Column()
    grade: string;

    @OneToMany(type => Mark, mark => mark.subject)
    mark: Mark[];
}
