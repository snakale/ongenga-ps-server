import {createTypeORMConnection} from '../../src/utils/createConnection';
import { AuthService } from '../../src/services/auth.service';
import { expect, assert } from 'chai';
import 'mocha';

describe('Auth Service', () => {

    const authService = new AuthService();

    // runs before all tests in this block
    before(async() => {
      createTypeORMConnection()
    });

    describe('Create a new user auth', () => {
        it('Should create a new user auth', () => {

        })
    });

    describe('Remove a new user', () => {
        it('Should remove user auth', () => {

        })
    });

  
    
});