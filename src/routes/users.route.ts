import * as usersService from "../services/users.service";
import { Router, Request, Response } from "express";
import { isLoggedInAdmin, loggedInUserIDMatch } from "./utility.functions";

const router: Router = Router();
const UsersService = new usersService.UsersService();

router.get('/', (req: Request, res: Response) => {
    
    if ( isLoggedInAdmin(req) ){
        
        UsersService.getAllUsers()
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e.message})); 
            

    } else {
        res.status(200).json( { success: false, message: 'User not autherized' });
    }
});

router.post('/new', async(req: Request, res: Response) => {
    if ( isLoggedInAdmin(req) ){
        
        const {names, surname, role, email, teacherClass, teacherGrade} = req.body;

        UsersService.addNewUser(names, surname, role, email, teacherClass, teacherGrade)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e.message})); 
    } else {
        res.status(200).json( { success: false, message: 'User not autherized to perform this actionssss' });
    }
});

router.put('/:id', (req: Request, res: Response) => {
    if ( loggedInUserIDMatch(req) && isLoggedInAdmin(req) ){
        
        const userId = req.params.id;
        const { names, surname, email, role } = req.body;

        UsersService.updateUserProfile(userId, names, surname, email, role)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e.message})); 
    } else {
        res.status(200).json( { success: false, message: 'User not autherized to perform this action' });
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    if ( isLoggedInAdmin(req) ){
        UsersService.removeUser(+req.params.id)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e.message})); 
    }
});

export const UsersRoutes: Router = router;
