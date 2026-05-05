import apiErr from "../../common/utils/api-error.ts";
import { register} from "./user.service.ts";
import {Response, Request, NextFunction} from "express"
import { AuthReq } from "./user.middleware.ts";
import { apiRes } from "../../common/utils/api-response.ts";

const registerController = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const result = await register(req.body)
    console.log(result)
    return apiRes.registerApiRes(res, "registration successfull", result)
  } catch (err) {
    console.log(err)
    return next(err)

  }
};


export {registerController}