import { Router } from "express"
import { validate } from "../../common/middleware/validate.middleware.ts"
import RegisterDto from "./dto/register-dto"
import {  registerController } from "./user.contoller.ts"


const authRouter = Router()


authRouter.post("/register", validate(RegisterDto) ,  registerController)


export default authRouter 