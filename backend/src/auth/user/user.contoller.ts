import apiErr from "../../common/utils/api-error.ts";
import { register, verifyEmail, login } from "./user.service.ts";
import { Response, Request, NextFunction } from "express"
import { AuthReq } from "./user.middleware.ts";
import { apiRes } from "../../common/utils/api-response.ts";

const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await register(req.body)
    console.log(result)
    return apiRes.registerApiRes(res, "registration successfull", result)
  } catch (err) {
    console.log(err)
    return next(err)

  }
};

const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.query as { token?: string };

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    const result = await verifyEmail(token);

    return apiRes.success(res ,"email verification successfull: autologin....", result)
  } catch (err) {
    next(err);
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Missing credentials");
    }

    const data = await login({ email, password });

    
    return apiRes.success(res, "Login successful", data)
  } catch (error: any) {
    return res.status(error.statusCode || 401).json({
      message: error.message || "Login failed",
    });
  }
};

export { registerController, verifyEmailController, loginController }