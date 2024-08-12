import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { User as IUser} from "../types/user-type";

const UserSchema: Schema<IUser> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique:true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// execute operation before Schema is saved
// next() pass control to the next middleware
// hash password with bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(this.password as string, salt);
  next();
});

// compare password with bcrypt
UserSchema.methods.comparePassword = function(password: string): Promise<boolean>{
    return bcrypt.compare(password, this.password);
}

export const User = mongoose.model<IUser>('User', UserSchema);