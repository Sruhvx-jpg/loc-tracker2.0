import { Router } from "express"
import { validate, validateVerifyQuery } from "../../common/middleware/validate.middleware.ts"
import RegisterDto from "./dto/register-dto"
import {  registerController, verifyEmailController } from "./user.contoller.ts"


const authRouter = Router()


authRouter.post("/register", validate(RegisterDto) ,  registerController)
authRouter.get('/verifyemail', validateVerifyQuery, verifyEmailController)


export default authRouter 