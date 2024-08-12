import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" });
const secret = process.env.SECRET_KEY;
/**
 * Service class for JSON token related operations.
 */
export class TokenService{
    /**
     * Generates an access token for a user.
     * @param {string} userId - The user's id. 
     * @returns  {string} the generated access token.
     */
    generateAccessToken = (userId: string): string =>{
        return jwt.sign({userId}, secret!, {expiresIn: '1h'});
    }
    /**
     * Validates an access token.
     * @param {string} token - a token to be validated. 
     * @returns  {object | string} the decoded token or an error message.
     */
    validateToken = (token: string): object | string =>{
        try{
            return jwt.verify(token, secret!)
        }catch(error: any){
            return 'Invalid token';
        }
    }

}