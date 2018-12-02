
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, BaseEntity, ManyToOne} from "typeorm";
import { User } from "./user";

@Entity()
export class Student extends BaseEntity {

    @PrimaryGeneratedColumn() id: number;
    @Column() names: string;
    @Column() surname: string;
    @Column() grade: number;
    @Column() gender: string;
    @Column() studentClass: string; 
    @Column() dateOfBirth: Date;

    @ManyToOne(type => User)
    @JoinColumn()
    registerTeacher: User;

    // TODO: Link to Parent Object
    @Column()
    parent1Id: number; 

    @Column()
    parent2Id: number;

    /*
    
    @OneToMany(type => Mark, mark => mark.student)
    marks: Mark[];
    
    */

    /*@OneToOne(type => Parent)
    @JoinColumn()
    parent1: Parent;

    @OneToOne(type => Parent)
    @JoinColumn()
    parent2: Parent;*/
}
