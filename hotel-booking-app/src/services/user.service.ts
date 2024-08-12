import { Account } from '../models/account.model';
import { User } from '../models/user.model';
import {Account as IAccount} from '../types/account.type';
import { CustomError } from '../utils/custom.error';
import { TokenService } from "./tokens.service"
const tokenService = new TokenService();
/**
 * Service class for user related operations
 */
export class UserService{
/**
 * Creates a new user and a new account for the user.
 * @param {string} firstName - the firstName of the user.
 * @param {string} lastName  - the lastName of the user.
 * @param {string} email - the email of the user.
 * @param {string} username  - the username of the user.
 * @param {string} password  - the password of the user.
 * @throws {CustomError} If a user with same email is found.
 * @throws {CustomError} If a user with same username is found.
 * @returns {Account} the created account.
 */
    async createUser(firstName: string, lastName:string, email:string, username:string, password: string): Promise<IAccount | string>{
        // verify if user exists
        const existingUserByEmail = await User.findOne({email});
        if(existingUserByEmail)
            throw new CustomError(409, "User with same email already exists.")
        const existingUserByUsername = await User.findOne({username})
        if (existingUserByUsername)
            throw new CustomError(409, "User with same username already exists.")
        // create user
        const user = new User({firstName, lastName, email, username, password});
        await user.save();
        // generate an access token
        const accessToken = tokenService.generateAccessToken(user._id as string);
        // create new account
        const account = new Account({user: user._id, accessToken});
        await account.save();
        return account;
    }
    /**
     * Authenticates a user
     * @param {string} username - the username of the user.
     * @param {string} password - the password of the user.
     * @throws {CustomError} If the user is not found.
     * @throws {CustomError} If the password is not valid.
     * @returns  {Account} the account of the user.
     */
    async authenticateUser(username: string, password: string): Promise<IAccount>{
        const user = await User.findOne({username});
        if (!user)
            throw new CustomError(404, "User not found ! Please create an account.");
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch)
            throw new CustomError(400, "Invalid Password.");
        const account = await Account.findOne({user: user._id});
        if (!account){
            const account = new Account({user: user._id, accessToken: tokenService.generateAccessToken(user._id as string)});
            await account.save();
            return account;
        }
            
        const isTokenValid = tokenService.validateToken(account.accessToken);
        if (typeof isTokenValid === 'string'){
            await Account.findOneAndDelete({user: user._id});
            const account = new Account({user: user._id, accessToken: tokenService.generateAccessToken(user._id as string)});
            await account.save();
            return account;
        }
        return account;
            
    }
    /**
     * Logs out a user.
     * @param {string} username - the username of the user.
     * @throws {CustomError} If the user is not found.
     * @throws {CustomError} If the account is not found.
     * @returns {Promise<{ message: string }>} - A JSON object with a success message.
     */
    async logoutUser(username: string): Promise<{message: string}>{
        const user = await User.findOne({username});
        if (!user)
            throw new CustomError(404, "User not found.")
        const account = await Account.findOneAndDelete({user: user._id});
        if(!account)
            throw new CustomError(404, "Account not found.")
        return {message: "Logout successful"};
    }
        
}