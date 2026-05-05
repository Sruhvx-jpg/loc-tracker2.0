import mongoose from "mongoose";
import apiErr from "../../common/utils/api-error.ts"
import { apiRes } from "../../common/utils/api-response.ts";
import { generateResetTok, generateAccTok, generateRefTok } from "../../common/utils/jwtutils"
import mongoUser from "../../Database/userModel.ts"
import crypto from "crypto"


const register = async ({username,email,password}: {username: string,email: string,password: string} ) => {

  const existingUser = await mongoUser.findOne({$or: [{email}, {username}]});

if (existingUser) {
  if (existingUser.email === email) throw apiErr.emailConflict();
  if (existingUser.username === username) throw apiErr.userNameConflict();
}


  const newUser = await mongoUser.create({
    username,
    email,
    password,
  });

  const {password: ignored , ...sanitizedUser} = newUser.toObject();
  console.log("DB NAME:", mongoose.connection.name);


  return apiRes.created(
    "success",
    sanitizedUser
  );
};


export { register }