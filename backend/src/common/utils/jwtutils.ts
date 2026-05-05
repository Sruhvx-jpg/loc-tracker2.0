import jwt, { SignOptions } from "jsonwebtoken"
import "dotenv/config"
import * as crypto from 'crypto';
import bcrypt from "bcryptjs";


const generateVerifyEmailTokUtil = () => {
    const rawTok = crypto.randomBytes(32).toString("hex")
    const hashedTok = crypto.createHash("sha256").update(rawTok).digest("hex")

    return {rawTok, hashedTok}
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const generateAuthTokens = async (userId: string) => {
  const payload = { id: userId };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  return {
    accessToken,
    refreshToken,
    hashedRefreshToken,
  };
};

const verifyAccessToken = (token: string) => {
  if (!token) throw new Error("No token provided");

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    return decoded; // { id: userId }
  } catch {
    throw new Error("Invalid or expired access token");
  }
};

export {generateVerifyEmailTokUtil, generateAuthTokens, verifyAccessToken}