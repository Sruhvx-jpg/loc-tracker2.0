import apiErr from "../../common/utils/api-error.ts";
import { register, login, getMe } from "./user.service.ts";
import { Response, Request, NextFunction } from "express"
import { AuthReq } from "./user.middleware.ts";
import { apiRes } from "../../common/utils/api-response.ts";
import { request } from "http";

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

const getMeController = async(req: Request, res: Response) =>{
  const userID: any = await req.params.username

  const data = await getMe(userID)

  return apiRes.success(res, "user data fetched successfully", data)
}

export { registerController,  loginController, getMeController }