import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs"
import { Document } from 'mongoose'

const {Schema} = mongoose


export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  isEmailVerified: boolean;
  active: boolean;
  hashedEmailVerTok: String;
  refreshToken: String;
  lastVerificationEmailSentAt: Date;
  comparePassword(plaintext: string): Promise<boolean>;
}


//user schema
const userSchema = new Schema<IUser>({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  password: {type: String, required: true , select : false},
  email: {type: String, required: true},
  isEmailVerified: {type: Boolean, required: false},
  active: {type: Boolean, default: true},
  hashedEmailVerTok: String,
  refreshToken: String,
  lastVerificationEmailSentAt: {type: Date, default: null}
});


userSchema.pre("save", function(this: IUser) {
    if(!this.isModified("password")) {
 	   return ;
    }
    this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function(this: IUser ,plaintext: string) {
    if (!plaintext || !this.password) {
        return Promise.resolve(false);
    }
    return bcrypt.compare(plaintext, this.password)
};

userSchema.plugin(uniqueValidator, {message: "is already taken"})

const mongoUser = mongoose.model('user', userSchema);
export default mongoUser