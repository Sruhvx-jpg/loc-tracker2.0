import { NextFunction, Request, Response } from "express";
import apiErr from "../../common/utils/api-error.ts";
import mongoUser, { IUser } from "../../Database/userModel.ts";
import { verifyAccessToken } from "../../common/utils/jwtutils.ts";

export type AuthReq = Request & {
    user: IUser
}


const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(apiErr.illegalAccess("Invalid token"));
  }

  try {
    const decoded = verifyAccessToken(token) as { userId: string };

    const user = await mongoUser.findById(decoded.userId).select("-password");

    if (!user) {
      return next(apiErr.illegalAccess("User not found"));
    }

    (req as any).user = user;

    next();
  } catch (err) {
    return next(apiErr.illegalAccess("Invalid or expired token"));
  }
};

export default authenticate;