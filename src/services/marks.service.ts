import { Mark } from '../entities/mark';
import { Student } from '../entities/student';
import { AppReturnType } from '../entities/return-type.interface';
import { SchoolSubject } from '../entities/subject';

export class MarksService {

    saveTeacherTermMarks(termMarks, year, term, grade, schoolClass): Promise<AppReturnType> {
        return new Promise( async (resolve, reject) => {
            try {

                const params = {
                    grade: grade, schoolClass: schoolClass, year: year, term: term
                };

                const savedMarks = await Mark.find( {
                    where: params,
                    relations: ['student', 'subject']
                });

                termMarks.forEach( async(mark) => {

                    let newMark = savedMarks
                        .find(oldMark => oldMark.subject.id === mark.subjectId && oldMark.student.id === mark.studentId);

                    if (!newMark) {
                        newMark = new Mark();
                        newMark.student = await Student.findOne(mark.studentId);
                        newMark.subject = await SchoolSubject.findOne(mark.subjectId);
                    }                  
                                        
                    newMark.ca_mark = mark.ca_mark;
                    newMark.term = term;
                    newMark.year = year;
                    newMark.exam_mark = mark.exam_mark;
                    await newMark.save().catch( e => console.error(e));
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
                marks.forEach( async(mark) => {
                    let editMark = await Mark.findOne( mark.id );
                    editMark.exam_mark = mark.exam_mark;
                    editMark.ca_mark = mark.ca_mark;
                    await editMark.save();
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
                        grade: grade, schoolClass: schoolClass, year: year, term: term
                    },
                    relations: ['student', 'subject']
                })
                .then( data => resolve({success: true, data: this.mapStudentIdSubjectIdToMarks(data) }))
                .catch( e => reject({success: false, message: e.message}));
        });
    }

    mapStudentIdSubjectIdToMarks(marks: Mark[]) {

        return marks.map(mark => {
            const studentId = mark.student.id;
            const subjectId = mark.subject.id;
            return { ...mark, ...{studentId}, ...{subjectId}};
        });
        
    }

}
