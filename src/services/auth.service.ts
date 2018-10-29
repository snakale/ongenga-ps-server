import { User } from '../entities/user';
import * as bcrypt from 'bcrypt';
import { Auth } from '../entities/auth';

export class AuthService {

    private saltRounds = 5;

    /**
     * 
     * @param storedPasswordHash The hash string stored
     * @param inputPassword The plain text string to compare to
     * 
     * Returns a promise that resolves to true if input password matches storedHash
     */
    private comparePasswords(storedPasswordHash: string, inputPassword: string): Promise<boolean> {
        return new Promise( (resolve, reject) => {
            bcrypt.compare(inputPassword, storedPasswordHash, function(err, res) {
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }

    /**
     * Returns a hashed equivalent of a string
     * @param plaintextPassword Plain text string to be hashed
     */
    public getHash(plaintextPassword: string): Promise<any>{
        return new Promise((res, rej) => {
            bcrypt.hash(plaintextPassword, this.saltRounds, function(err, hash) {
                if(err){
                    rej(err);
                }else{
                    res(hash);
                }
            });
        })
    }

    async resetAuthForUser(user: User) {
        let newAuth = new Auth();
        newAuth.password = await this.getHash('Hello1234');
        newAuth.user = user;
        return newAuth.save();
    }

    async updateUserAuth(id: number, oldPass: string, newPass: string) {
        return {success: false, message: 'Failed Test'};
    }
    
    async getLoggedInUser(id) {
        return await User.findOne(id);
    }

    async authenticateUser(email: string, password: string) {

        const user = await User.findOne( {where:{email: email.toLowerCase()}} );

        if ( user && user.id ) {
            const auth = await Auth.findOne({user: user});
            const passwordsMatch: boolean = await this.comparePasswords (auth.password, password);
            
            if ( passwordsMatch ) {
                return { success: true, data: user };
            } else {
                return { success: false, message: `Invalid password for ${email}` };
            }
        } else {
            return { success: false, message: 'Username not found'};
        }

    }
}