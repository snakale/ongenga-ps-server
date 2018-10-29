import { User } from '../entities/user';
import { AppReturnType } from '../entities/return-type.interface';
import { AuthService } from './auth.service';
import { Auth } from '../entities/auth';

export class UsersService {

    addNewUser(names, surname, role, email, teacherClass, teacherGrade): Promise<AppReturnType> {

        let newUser = new User();
        newUser.surname = surname;
        newUser.email = email;
        newUser.names = names;
        newUser.role = role;
        newUser.teacherClass = teacherClass;
        newUser.teacherGrade = teacherGrade;

        return new Promise( async(resolve) => {

            const alreadyExisting = await User.findOne({email: email});

            if (alreadyExisting && alreadyExisting.id) 
                resolve( {success: false, message: 'There is already a user registered with this email address'} );

            newUser.save()
                .then( () => {
                    const authService = new AuthService();
                    authService.resetAuthForUser(newUser)
                        .then( user => resolve( { success: true, data: {id: user.id}, message: 'New user saved' }))
                        .catch( () => resolve( { success: false, data: 'Unexpected error while setting up user details' }))                    
                })
                .catch( () => resolve( { success: false, message: 'An error occured while adding new user to the DB' } ));
        });
    }

    async updateUserProfile(userId, names, surname, email, role) {

        let user = await User.findOne(parseInt(userId));
        user.names = names;
        user.surname = surname;
        user.email = email;
        user.role = role;

        return new Promise( (resolve) => {
            user.save()
                .then( () => resolve( { success: true, data: 'User profile updated successfully' }))
                .catch( () => resolve( { success: false, message: 'An error occured while updating User role' } ));
        });
    }

    async updateUserRole(userId: number, newRole: number) {

        let user = await User.findOne(+userId);
        user.role = newRole;

        return new Promise( (resolve, reject) => {
            user.save()
                .then( () => resolve( { success: true, data: 'User role updated successfully' }))
                .catch( () => resolve( { success: false, message: 'An error occured while updating User role' } ));
        });
    }

    async removeUser(userId: number) {
                
        const user = await User.findOne(userId);
        const userAuth = await Auth.findOne({user: user});

        if (userAuth){
            await userAuth.remove();
        } 

        return new Promise( (resolve, reject) => {
            user.remove()
                .then( () => resolve( { success: true, data: 'User removed' }))
                .catch( () => resolve( { success: false, message: 'An error occured while removing student from the DB' } ));
        });
    }

    getAllUsers() {

        return new Promise( (resolve) => {
            User.find()
                .then( data => resolve( { success: true, data: data }))
                .catch( () => resolve( { success: false, message: 'An error occured while fetching users from the DB' } ));
        });
    }  
    
    async getUserByIdInUser(id): Promise<User> {
        return User.findOne(id);
    }

}