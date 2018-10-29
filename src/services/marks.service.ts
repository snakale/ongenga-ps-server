import { Mark } from '../entities/mark';
import { Student } from '../entities/student';
import { AppReturnType } from '../entities/return-type.interface';
import { getManager } from 'typeorm';
import { SchoolSubject } from '../entities/subject';

export class MarksService {

    saveTeacherTermMarks(year: string, term: string, termMarks: Mark[]): Promise<AppReturnType> {
        return new Promise( (resolve, reject) => {
            try {
                const marksRepo = getManager().getRepository(Mark);
                const subjectsRepo = getManager().getRepository(SchoolSubject);
                const studentRepo = getManager().getRepository(Student);

                termMarks.forEach( async(mark) => {
                    let newMark = new Mark();
                    newMark.student = await studentRepo.findOne(mark.student.id);
                    newMark.subject = await subjectsRepo.findOne(mark.subject.id);
                    newMark.ca_mark = mark.ca_mark;
                    newMark.term = +term;
                    newMark.year = +year;
                    newMark.exam_mark = mark.exam_mark;
                    await marksRepo.save(newMark);
                });
                resolve({success: true, message: 'Marks successfully saved'})
            } catch (e) {
                reject(e);
            }
        });
    }

    updateTeacherTermMarks(marks: Mark[]): Promise<AppReturnType> {
        return  new Promise( (resolve, _) => {
            try {
                const marksRepo = getManager().getRepository(Mark);
                marks.forEach( async(mark) => {
                    let editMark = await marksRepo.findOne( mark.id );
                    editMark.exam_mark = mark.exam_mark;
                    editMark.ca_mark = mark.ca_mark;
                    await marksRepo.save(editMark);
                });
                resolve({success: true, message: 'Successfully updated marks'});
            } catch(e) {
                resolve({success: false, message: e});
            }
        });
    }

    updateSingleSubjectMark(mark: Mark) {
        
    }

    updateStudentTermMarks() {

    }

    getAllStudentMarks(student: Student) {

    }

    getTermMarkSheet(grade, schoolClass, year, term) {
        return new Promise( (resolve, reject) => {
            Mark.find({
                    where: {
                        grade, schoolClass, year, term
                    }
                })
                .then( data => resolve({success: true, data: data}))
                .catch( e => reject({success: false, message: e.message}));
        });
    }

    getAllTeacherTermMarks(teacherId: string, year: string, term: string): Promise<AppReturnType> {
        return new Promise( (resolve, reject) => {
            resolve({success: true, data: [] } as AppReturnType);
        });
    }
}
