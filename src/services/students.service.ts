import { Student } from "../entities/student";
import { Parent } from "../entities/parent";
import { User } from "../entities/user";
export class StudentsService {

    public getStudent(studentId) {

        return new Promise( (resolve) => {
            Student.findOne(studentId)
                .then( data => resolve( { success: true, data: data }))
                .catch( () => resolve( { success: false, message: 'An error occured while getting students from DB' } ));
        });
    }

    public async getStudentParents(studentId) {

        const student = await Student.findOne(studentId);
        const studentParents: any = {};
        
        if (student && student.parent1Id) {
            const parent1 = await Parent.findOne(student.parent1Id);
            studentParents['parent1'] = parent1;
        }

        if (student && student.parent2Id) {
            const parent2 = await Parent.findOne(student.parent2Id);
            studentParents['parent2'] = parent2;
        }

        return new Promise( (resolve) => {
            Student.findOne(studentId)
                .then( data => resolve( { success: true, data: studentParents }))
                .catch( () => resolve( { success: false, message: 'An error occured while getting student\'s parents from DB' } ));
        });
    }

    async getAllStudents() {

        return new Promise( (resolve) => {
            Student.find({ relations: ["registerTeacher"] })
                .then( data => resolve( { success: true, data: data.map( d => this.stripOffTeacherInfoFromStudent(d) ) }))
                .catch( () => resolve( { success: false, message: 'An error occured while getting students from DB' } ));
        });
    }

    /**
     * Remove all registerTeacher object values and return a new object containing registerTeacherId
     * Removes unnaccesry information that does not need to be sent down the wire
     * @param student : Student Object
     */
    stripOffTeacherInfoFromStudent(student) {
        const registerTeacherId = student.registerTeacher.id;
        return { ...{}, ...student, ...{ registerTeacher: undefined }, registerTeacherId };
    }

    async createStudentParentEntityObject(parentJsonObject: any) {
        let newParent = new Parent();
        const parentName = parentJsonObject.name.trim();

        if (parentJsonObject && parentName) {
            newParent.name = parentName;
            newParent.surname = parentJsonObject.surname;
            newParent.contactDetails = parentJsonObject.contactDetails;
            await newParent.save();
        }

        return newParent;
    }

    async createParentsArray(parent1, parent2) {

        const parent1Object = await this.createStudentParentEntityObject(parent1);
        const parent2Object = await this.createStudentParentEntityObject(parent2);

        let parentArray = [];

        if (parent1Object && typeof +parent1Object.id === 'number') {
            parentArray.push(+parent1Object.id)
        }

        if (parent2Object && typeof +parent2Object.id === 'number') {
            parentArray.push(+parent2Object.id)
        }

        return parentArray;
    }

    async addNewStudent({ names, surname, studentGrade, studentClass, dateOfBirth, gender, teacher, parent1, parent2 }) {

        let newStudent = new Student();
        newStudent.names = names;
        newStudent.surname = surname;
        newStudent.grade = studentGrade;
        newStudent.gender = gender;
        newStudent.dateOfBirth = dateOfBirth;
        newStudent.studentClass = studentClass;

        const parent1Object = await this.createStudentParentEntityObject(parent1);
        const parent2Object = await this.createStudentParentEntityObject(parent2);

        if (parent1Object && typeof +parent1Object.id === 'number') 
            newStudent.parent1Id = +parent1Object.id;

        if (parent2Object && typeof +parent2Object.id === 'number') 
            newStudent.parent2Id = +parent2Object.id;
        
        newStudent.registerTeacher = await User.findOne(teacher);

        return new Promise( (resolve) => {
            newStudent.save()
                .then( student => resolve( { success: true, data: student, message: 'New student saved' }))
                .catch( e => resolve( { success: false, message: `An error occured while adding new student to the DB ${e}` } ));
        });
    }

    async updateStudent(studentData) {

        let student = await Student.findOne(studentData.body.id);
        const {names, surname, grade, gender, studentClass, dateOfBirth, teacher, parent1, parent2} = studentData.body;

        if (!student) {
            return new Promise( (resolve) => resolve({ success: false, message: 'Student not found in System' }));
        }

        student.surname = surname;
        student.names = names;
        student.grade = grade;
        student.gender = gender;
        student.studentClass = studentClass;
        student.dateOfBirth = dateOfBirth;
        student.registerTeacher = teacher;
        
        let parent1Object = await Parent.findOne(parent1.id);
        let parent2Object = await Parent.findOne(parent2.id);

        if (parent1Object) {
            parent1Object.name = parent1.name;
            parent1Object.surname = parent1.surname;
            parent1Object.contactDetails = parent1.contactDetails;
        }

        if (parent2Object) {
            parent2Object.name = parent2.name;
            parent2Object.surname = parent2.surname;
            parent2Object.contactDetails = parent2.contactDetails;
        }

        await Promise.all([parent1Object.save(), parent2Object.save()]);

        return new Promise( (resolve) => {
            student.save()
                .then( () => resolve( { success: true, data: 'Student updated' }))
                .catch( () => resolve( { success: false, message: 'An error occured while updating student data' } ));
        });
    }

    async deleteStudent(studentId){
        let student = await Student.findOne(studentId)

        return new Promise( (resolve) => {
            student.remove()
                .then( () => resolve( { success: true, data: 'Student removed' }))
                .catch( () => resolve( { success: false, message: 'An error occured while removing student from the DB' } ));
        });
    }
}