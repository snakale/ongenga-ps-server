import * as studentsService from "../services/students.service";
import { Router, Request, Response } from "express";
import { isLoggedIn } from "./utility.functions";
import { AppReturnType } from "../entities/return-type.interface";

const router: Router = Router();
const StudentsService = new studentsService.StudentsService();

router.get('/', async(req: Request, res: Response) => {
        
        if ( isLoggedIn(req) ) {
                StudentsService.getAllStudents()
                        .then(data => res.status(200).json(data))
                        .catch( e => res.status(200).json( { success: false, message: e.message } ));
        } else {
                res.status(200).json( {success: false, message: 'User unauthenticated'} as AppReturnType );
        }
        
});

router.get('/parents', async(req: Request, res: Response) => {
        
        if ( isLoggedIn(req) ) {

                const { studentId } = req.params;

                StudentsService.getStudentParents(studentId)
                        .then(data => res.status(200).json(data))
                        .catch( e => res.status(200).json( { success: false, message: e.message } ));
        } else {
                res.status(200).json( {success: false, message: 'User unauthenticated'} as AppReturnType );
        } 
});

router.get('/:id', async(req, res) => {
        if ( isLoggedIn(req) ) {

                const { id } = req.params;

                StudentsService.getStudent(id)
                        .then(data => res.status(200).json(data))
                        .catch(e => res.status(200).json({success: false, message: e.message}));
        } else {
                res.status(200).json( {success: false, message: 'User unauthenticated'} as AppReturnType );
        }
});


router.put('/:id', async(req, res) => { 
        if ( isLoggedIn(req) ) {
                StudentsService.updateStudent(req)
                        .then(data => res.status(200).json(data))
                        .catch( e => res.status(200).json({success: false, message: e.message}));
        } else {
                res.status(200).json( {success: false, message: 'User unauthenticated'} as AppReturnType );
        }
});

router.delete('/:id', async(req, res) => {
        if ( isLoggedIn(req) ) {
                const { id } = req.params; 
                StudentsService.deleteStudent(id)
                        .then(data => res.status(200).json(data))
                        .catch( e => res.status(200).json({success: false, message: e.message}));
        } else {
                res.status(200).json( {success: false, message: 'User unauthenticated'} as AppReturnType );
        }
});

router.post('/', async(req, res) => {
        if ( isLoggedIn(req) ) {                
                StudentsService.addNewStudent(req.body)
                        .then(data => res.status(200).json(data))
                        .catch( e => res.status(200).json({success: false, message: e.message}));
        } else {
                res.status(200).json( {success: false, message: 'User unauthenticated'} as AppReturnType );
        }
});

export const StudentsRoutes: Router = router;
