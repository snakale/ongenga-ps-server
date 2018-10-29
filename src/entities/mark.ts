import { SchoolTerm } from './enums/school-term.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, Index, BaseEntity} from "typeorm";
import { SchoolSubject } from '../entities/subject';
import { Student } from './student';
import { SchoolGrade } from './enums/grades.enum';
import { SchoolClass } from './enums/class.enum';

@Entity()
export class Mark extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() ca_mark: number;
    @Column() exam_mark: number;
    @Column() final_mark: number;    
    @Column() term: SchoolTerm;
    @Column() grade: SchoolGrade;
    @Column() schoolClass: SchoolClass;

    @Index()
    @Column() year: number;

    @ManyToOne(type => Student, student => student.id)
    student: Student;

    @ManyToOne(type => SchoolSubject)
    subject: SchoolSubject;

}
