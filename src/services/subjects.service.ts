import { AppReturnType } from '../entities/return-type.interface';
import { SchoolSubject } from '../entities/subject';

export class SubjectsService {

    addNewSubject(grade, name): Promise<AppReturnType> {
        
        let newSchoolSubject = new SchoolSubject();
        newSchoolSubject.grade = grade;
        newSchoolSubject.name = name;

        return new Promise( (resolve) => {
            newSchoolSubject.save()
                .then( schoolSubject => resolve( { success: true, message: 'New subject saved', data:schoolSubject }))
                .catch( () => resolve( { success: false, message: 'An error occured while adding new subject to the DB' } ));
        });
    }

    async updateSubject(subjectId, name, grade) {
        
        let schoolSubject = await SchoolSubject.findOne(+subjectId);
        schoolSubject.name = name;
        schoolSubject.grade = grade;

        return new Promise( (resolve, reject) => {
            schoolSubject.save()
                .then( () => resolve( { success: true, data: 'School Subject updated successfully' }))
                .catch( () => resolve( { success: false, message: 'An error occured while updating School Subject' } ));
        });
    }

    async removeSubject(subjectId) {
        
        let subject = await SchoolSubject.findOne(subjectId)

        return new Promise( (resolve, reject) => {
            subject.remove()
                .then( () => resolve( { success: true, data: 'Subject removed' }))
                .catch( () => resolve( { success: false, message: 'An error occured while removing subject from the DB' } ));
        });
    }

    getAllSubjects() {
        return new Promise( (resolve, reject) => {
            SchoolSubject.find()
                .then( data => resolve( { success: true, data: data }))
                .catch( () => resolve( { success: false, message: 'An error occured while fetching subjects from the DB' } ));
        });
    }  

    /**
     * 
     * @param id Id of the subject to get
     */
    async getSubjectById(id) {
        return await SchoolSubject.findOne(id);
    }

}