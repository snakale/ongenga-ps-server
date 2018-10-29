import { Router, Request, Response } from "express";
import { AppReturnType } from "../entities/return-type.interface";
import { isLoggedIn, loggedInUserIDMatch, isLoggedInAdmin } from "./utility.functions";
import { AuthService } from '../services/auth.service';

const router: Router = Router();
const authService = new AuthService();

router.get('/', async(req, res) => {
    if (isLoggedIn(req)){
        const user = await authService.getLoggedInUser(req.session.userId);
        res.status(200).json({success: true, data: user});
    } else{
        res.status(200).json({success: false, message: 'Not Authenticated'})
    }
});

router.post('/', async(req: Request, res: Response) => {
    
    const { email, password } = req.body.params;
    
    const result: AppReturnType = await authService.authenticateUser(email, password);

    if (result && result.success && result.data.id){
        req.session.userId = result.data.id;

        // TODO: Remove role from session
        req.session.role = result.data.role;
    }

    res.send( result );
});

router.put('/:id', async(req:Request, res: Response) => {

    if ( loggedInUserIDMatch(req) && isLoggedInAdmin(req) ){
        const {id, oldPassword, newPassword} = req.body.params;
        const result = await authService.updateUserAuth(id, oldPassword, newPassword);
        res.status(200).json(result);
    } else {
        res.status(401).send('Unauthorized to perform this action');
    }
   
});

router.delete('/', (req: Request, res: Response) => {
    if (req.session) {
        req.session.destroy( function(err) {
            const _success = err ? false : true;
            const _message = err ? 'Failed to log you out. Try again' : '';
            res.status(200).json({ success: _success, message: _message });
        });
    }
});

export const AuthRoutes: Router = router;
