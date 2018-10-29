import { UserRoles } from './enums/roles.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import { SchoolGrade } from './enums/grades.enum';
import { SchoolClass } from './enums/class.enum';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() names: string;
    @Column() surname: string;
    @Column() email: string;
    @Column() role: UserRoles;    

    @Column() teacherGrade?: SchoolGrade; 
    @Column() teacherClass?: SchoolClass;

}
