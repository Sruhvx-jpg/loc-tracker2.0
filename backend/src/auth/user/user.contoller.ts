import apiErr from "../../common/utils/api-error.ts";
import { login, register, verifyEmail } from "./user.service.ts";
import {Response, Request, NextFunction} from "express"
import { AuthReq } from "./user.middleware.ts";
import { apiRes } from "../../common/utils/api-response.ts";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await register(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
};

// GET /auth/verify?token=...
const verifyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.query.token;

    if (!token || typeof token !== "string") {
      return next(apiErr.badReq("Invalid token"));
    }

    const result = await verifyEmail(token);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

// POST /auth/login
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const result = await login(email, password);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

const getMeController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(!(req as any).user) return next(apiErr.illegalAccess("illegal access"))

        return apiRes.apiResPlate(res, "fetch successful", (req as any).user, 0)
    } catch (error) {
        next(error)
    }
}

export {loginController, registerController, verifyController, getMeController}