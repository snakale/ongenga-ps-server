import { Router, Request, Response } from "express";
import { isLoggedInAdmin, isLoggedIn } from "./utility.functions";
import { SubjectsService } from "../services/subjects.service";

const router: Router = Router();
const schoolSubjectsService = new SubjectsService();

router.get('/', (req: Request, res: Response) => {
    
    if ( isLoggedIn(req) ){
        
        schoolSubjectsService.getAllSubjects()
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e})); 
            
    } else {
        res.status(200).json( { success: false, message: 'User not autherized' });
    }
});

router.post('/new', async(req: Request, res: Response) => {
    if ( isLoggedInAdmin(req) ){

        const {grade, name} = req.body;

        schoolSubjectsService.addNewSubject(grade, name)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e})); 
    } else {
        res.status(200).json( { success: false, message: 'User not autherized to perform this actionssss' });
    }
});

router.put('/:id', (req: Request, res: Response) => {
    if ( isLoggedInAdmin(req) ){

        const subjectId = req.params.id;
        const { name, grade } = req.body;

        schoolSubjectsService.updateSubject(subjectId, name, grade)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e})); 
    } else {
        res.status(200).json( { success: false, message: 'User not autherized to perform this action' });
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    if ( isLoggedInAdmin(req) ){
        schoolSubjectsService.removeSubject(+req.params.id)
            .then(data => res.status(200).json(data))
            .catch( e => res.status(200).json({success: false, message: e})); 
    }
});

export const SubjectsRoutes: Router = router;
