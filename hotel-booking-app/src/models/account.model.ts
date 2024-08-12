import mongoose, {Schema} from 'mongoose';
import { Account as IAccount } from '../types/account.type';

const AccountSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    accessToken: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

export const Account = mongoose.model<IAccount>('Account', AccountSchema); 