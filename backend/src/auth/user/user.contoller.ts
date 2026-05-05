import apiErr from "../../common/utils/api-error.ts";
import { register} from "./user.service.ts";
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
    console.log(result);
    return res.status(201).json({message: "Registration successful. Please check your email to verify your account.", data: result});
  } catch (err) {
    console.log(err);
    return next(err);

  }
};


export {registerController}