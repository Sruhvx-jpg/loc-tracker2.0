import apiErr from "../../common/utils/api-error.ts"
import { apiRes } from "../../common/utils/api-response.ts";
import mongoUser from "../../Database/userModel.ts"
import { generateAuthTokens, generateVerifyEmailTokUtil } from "../../common/utils/jwtutils.ts";
import { sendVerificationEmail } from "../../common/service/nodemailer.ts";
import crypto from "crypto"

const register = async ({ username, email, password }: { username: string, email: string, password: string }) => {

  const existingUser = await mongoUser.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    if (existingUser.email === email) throw apiErr.emailConflict();
    if (existingUser.username === username) throw apiErr.userNameConflict();
    return
  }

  const { rawTok, hashedTok } = generateVerifyEmailTokUtil()


  const newUser = await mongoUser.create({
    username,
    email,
    password,
    isEmailVerified: false,
    hashedEmailVerTok: hashedTok
  });

  await sendVerificationEmail(email, username, rawTok)


  const { password: ignored, ...sanitizedUser } = newUser.toObject();

  return apiRes.created(
    "success",
    sanitizedUser
  );
};

const verifyEmail = async (token: string) => {
  if (!token) throw apiErr.invalidToken();

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await mongoUser.findOne({
    hashedEmailVerTok: hashedToken,
  });

  if (!user) throw apiErr.invalidToken();
  if (user.isEmailVerified) throw apiErr.emailAlreadyVerified();

  user.isEmailVerified = true;
  user.hashedEmailVerTok = "_";


  const { accessToken, refreshToken, hashedRefreshToken } =
    await generateAuthTokens(user._id.toString());

  user.refreshToken = hashedRefreshToken;

  await user.save();

  const { password: _p, ...sanitizedUser } = user.toObject();

  return {
    user: sanitizedUser,
    accessToken,
    refreshToken,
  };
};

const login = async ({ email, password }: { email: string; password: string }) => {
  const user = await mongoUser.findOne({ email });

  if (!user) throw apiErr.invalidCredentials();

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw apiErr.invalidCredentials();


  if (!user.isEmailVerified) {
    const { rawTok, hashedTok } = generateVerifyEmailTokUtil();

    user.hashedEmailVerTok = hashedTok;
    await user.save();

    await sendVerificationEmail(user.email, user.username, rawTok);

    throw apiErr.emailNotVerified("Verification email sent again");
  }

  const { accessToken, refreshToken, hashedRefreshToken } =
    await generateAuthTokens(user._id.toString());

  user.refreshToken = hashedRefreshToken;
  await user.save();

  const { password: _p, refreshToken: _r, ...sanitizedUser } = user.toObject();

  return {
    user: sanitizedUser,
    accessToken,
    refreshToken,
  };
};

const getMe = async(userID: any) => {
  const user = mongoUser.findById(userID)
  if(!userID) throw apiErr.NotFound("user not found")

  return user
}



export { register, verifyEmail, login, getMe }