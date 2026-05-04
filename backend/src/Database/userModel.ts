import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs"
import { Document } from 'mongoose';

const {Schema} = mongoose
const Email = new Schema({
	
		address: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
		validated: {type: Boolean, default: false}
	
	});

interface IUser extends Document {
  username: string;
  password: string;
  email: {
    address: string;
    validated: boolean;
  };
  active: boolean;
  resToken?: string;
  refToken?: string;
  comparePassword(plaintext: string): Promise<boolean>;
}


//user schema
const userSchema = new Schema<IUser>({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  password: {type: String, required: true},
  email: {type: Email, required: true},
  active: {type: Boolean, default: true},
  resToken: {type: String},
  refToken: {type: String}
});


userSchema.pre("save", function(this: IUser) {
    if(!this.isModified("password")) {
 	   return ;
    }
    this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function(this: IUser ,plaintext: string) {
    return bcrypt.compare(plaintext, this.password)
};

userSchema.plugin(uniqueValidator, {message: "is already taken"})

const mongoUser = mongoose.model<IUser>('user', userSchema);
export default mongoUser