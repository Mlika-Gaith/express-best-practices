import { UserService } from "../services/user.service";
import { Request, Response } from 'express';
import {Account as IAccount} from '../types/account.type';
import { CustomError } from "../utils/custom.error";

const userService = new UserService();

/**
 * Controller for handling user-related requests.
 */
export class UserController {
    /**
     * Handles the creation of a new user.
     * @param {Request} req - the request object.
     * @param {Response} res - the response object.
     * @returns  {Promise<void>}
     */
    static async createUser(req: Request, res: Response): Promise<void> {
        const {firstName, lastName, email, username, password}= req.body;
        if (!firstName || !lastName || !email || !username || !password) {
            res.status(400).json({error: "All fields are required."});
            return;
        }
        try{
            const account = await userService.createUser(firstName, lastName, email, username, password);
        res.status(201).json(account);
        }catch(error: any){
            if (error instanceof CustomError){
                res.status(error.statusCode).json({ message: error.message, error: error.error })
            }
        }
        
    }
    /**
     * Handles the authentication of a user.
     * @param {Request} req - the request object 
     * @param {Response} res - the response object 
     * @returns  {Promise<void>}
     */
    static async authenticateUser(req: Request, res:Response): Promise<void>{
        const {username, password} = req.body;
        if (!username || !password){
            res.status(400).json({error: "Username and password are required."});
            return;
        }
        const account = await userService.authenticateUser(username, password);
        if (typeof account === 'string'){
            res.status(401).json({error: account});
            return;
        }
        res.status(200).json(account);
    }
    static async logoutUser(req: Request, res: Response): Promise<void>{
        const{username} = req.body;
        if (!username){
            res.status(400).json({error: "Username is required."});
            return;
        }
        res.status(200).json(await userService.logoutUser(username));
    }

    
}