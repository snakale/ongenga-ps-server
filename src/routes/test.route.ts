import { Router } from "express";
import { Auth } from "../entities/auth";
import { User } from "../entities/user";
import { UsersService } from "../services/users.service";
import { getManager } from "typeorm";

const router: Router = Router();

router.get('/test', async(req, res) => {
   
    /*let newUser = new User();
    newUser.surname = 'Nakale';
    newUser.email = 'samnakale@yahoo.co.uk';
    newUser.names = 'Sam Iyaloo';
    newUser.role = 1;

    let newAuth = new Auth();
    const usersService = new UsersService();
    newAuth.password = await usersService.getHash('Hello1');
    newAuth.user = newUser;

    let studentRepository = getManager().getRepository(User);
    const authRepo = getManager().getRepository(Auth);

    studentRepository.save(newUser)
        .then( () => {
            authRepo.save(newAuth)
                .then(() => res.status(200).json({ message: 'Student created'}))
                .catch( e => res.status(200).json({ message: e}));
        })
        .catch( e => res.status(200).json({ message: e}));*/
        res.status(200).json({ message: 'Student created'});

});

export const TestRoutes: Router = router;
