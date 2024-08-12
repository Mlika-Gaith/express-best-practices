import {Request, Response, NextFunction} from "express"
import { TokenService } from "../services/tokens.service";

const tokenService = new TokenService();
/**
 * Middleware to authenticate requests using a JWT token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const authenticateToken = async (req:Request, res:Response, next:NextFunction): Promise<void> =>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        res.status(401).json({error: "No token provided."});
        return;
    }

    const decodedToken = tokenService.validateToken(token);
    if(typeof decodedToken === "string"){
        res.status(403).json({error: "Invalid token."})
    }
    req.body.userId = (decodedToken as any).userId; // Attach the userId from the token to the request body
    next();
}