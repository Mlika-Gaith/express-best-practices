import { Account } from '../models/account-model';
import { User } from '../models/user-model';
import {Account as IAccount} from '../types/account-type';
import { TokenService } from './token-service';
const tokenService = new TokenService();
/**
 * Service class for user related operations
 */
export class UserService{
/**
 * Creates a new user and a new account for the user
 * @param {string} firstName - the firstName of the user
 * @param {string} lastName  - the lastName of the user
 * @param {string} email - the email of the user 
 * @param {string} username  - the username of the user
 * @param {string} password  - the password of the user
 * @returns {Account} the created account
 */
    async createUser(firstName: string, lastName:string, email:string, username:string, password: string): Promise<IAccount | string>{
        // verify if user exists
        const existingUserByEmail = await User.findOne({email});
        if(existingUserByEmail)
            return'User with email already exists';
        const existingUserByUsername = await User.findOne({username})
        if (existingUserByUsername)
            return 'User with username already exists';
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
     * @param {string} username - the username of the user
     * @param {string} password - the password of the user
     * @returns  {Account | string} the account of the user or an error message
     */
    async authenticateUser(username: string, password: string): Promise<IAccount | string>{
        const user = await User.findOne({username});
        if (!user)
            return 'Username not found, please create an account.';
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch)
            return 'Invalid password';
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
     * 
     * @param {string} username - the username of the user.
     * @returns {string} a message indicating if the user was logged out successfully or not.
     */
    async logoutUser(username: string): Promise<string>{
        const user = await User.findOne({username});
        if (!user)
            return 'Username not found';
        const account = await Account.findOneAndDelete({user: user._id});
        if(!account)
            return 'Account not found';
        return 'Logout successful';
    }
        
}