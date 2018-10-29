import * as usersService from "../services/users.service";
import { Router, Request, Response } from "express";
import { isLoggedInAdmin, loggedInUserIDMatch, isLoggedIn } from "./utility.functions";
import { MarksService } from "../services/marks.service";

const router: Router = Router();
const marksService = new MarksService();

router.get('/term-marks', (req, res) => {

    // TODO: Fix Security vulnerability here... Logged in user must be authorized to edit those particular marks
    if ( isLoggedIn(req) ) {
        
        const { grade, schoolClass, year, term } = req.body;

        marksService.getTermMarkSheet(grade, schoolClass, year, term)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e.message})); 
    } else {
        res.status(200).json( { success: false, message: 'User not autherized' });
    }
});

router.get('/', (req: Request, res: Response) => {
    
    if ( isLoggedIn(req) ){

        const { teacher, year, term } = req.params;

        marksService.getAllTeacherTermMarks(teacher, year, term)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e.message})); 
            
    } else {
        res.status(200).json( { success: false, message: 'User not autherized' });
    }
});

router.post('/bulk', async(req: Request, res: Response) => {
    if ( isLoggedIn(req) ){
        const {year, term, marks} = req.body;
        marksService.saveTeacherTermMarks(year, term, marks)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e.message})); 
    } else {
        res.status(200).json( { success: false, message: 'User not autherized to perform this actionssss' });
    }
});

/*router.put('/:id', (req: Request, res: Response) => {
    if ( loggedInUserIDMatch(req) && isLoggedInAdmin(req) ){
        marksService.updateUserProfile(req)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e.message})); 
    } else {
        res.status(200).json( { success: false, message: 'User not autherized to perform this action' });
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    if ( isLoggedInAdmin(req) ){
        marksService.removeUser(req)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e.message})); 
    }
});*/

export const MarksRoutes: Router = router;
