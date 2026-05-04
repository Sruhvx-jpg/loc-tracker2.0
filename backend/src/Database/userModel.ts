import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs"

const {Schema} = mongoose
const Email = new Schema({
	
		address: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
		validated: {type: Boolean, default: false}
	
	});


//user schema
const userSchema = new Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  password: {type: String, required: true},
  email: {type: Email, require: true},
  active: {type: Boolean, default: true}
});

userSchema.pre("save", function() {
    if(!this.isModified("password")) {
 	   return ;
    }
    this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function(plaintext: string) {
    return bcrypt.compare(plaintext, this.passworf)
};

userSchema.plugin(uniqueValidator, {message: "is already taken"})

const user = mongoose.model('user', userSchema);