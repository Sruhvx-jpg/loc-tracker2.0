// import { Types } from "mongoose"
// import { sendVerificationEmail } from "../../common/service/nodemailer.ts"
import apiErr from "../../common/utils/api-error.ts"
import { apiRes } from "../../common/utils/api-response.ts";
import { generateResetTok, generateAccTok, generateRefTok } from "../../common/utils/jwtutils"
import mongoUser from "../../Database/userModel.ts"
import crypto from "crypto"


const register = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {

  const existingUser = await mongoUser.findOne({ email });

  if (existingUser) {
    return apiErr.emailConflict("Email already in use");
  }

  // TODO: hash password (important)
  // const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await mongoUser.create({
    username,
    email,
    password, // replace with hashedPassword
  });

  const userObj = newUser.toObject();
  

  return apiRes.created(
    "User registered successfully. Please check your email to verify your account.",
    userObj
  );
};


export { register }