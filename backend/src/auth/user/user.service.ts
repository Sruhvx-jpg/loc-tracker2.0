import apiErr from "../../common/utils/api-error.ts"
import { apiRes } from "../../common/utils/api-response.ts";
import { generateResetTok, generateAccTok, generateRefTok } from "../../common/utils/jwtutils"
import mongoUser from "../../Database/userModel.ts"
import crypto from "crypto"


const register = async ({username,email,password}: {username: string,email: string,password: string} ) => {

  const existingUser = await mongoUser.findOne({ email });

  if (existingUser) {
    return apiErr.emailConflict("Email already in use");
  }


  const newUser = await mongoUser.create({
    username,
    email,
    password,
  });

  const userObj = newUser.toObject();
  

  return apiRes.created(
    "success",
    userObj,
  );
};


export { register }