import { Router } from "express"
import { validate, validateVerifyQuery } from "../../common/middleware/validate.middleware.ts"
import RegisterDto from "./dto/register-dto"
import {  getMeController, registerController, loginController } from "./user.contoller.ts"
import loginDto from "./dto/login-dto.ts"
import ipRateLimiterMiddleware from "../../common/middleware/ipRateLimit.middleware.ts"
import authenticateToken from "./user.middleware.ts"


const authRouter = Router()
const limit = 20;
const windowMs = 5 * 60 * 1000;

authRouter.post("/register", ipRateLimiterMiddleware(limit, windowMs) ,validate(RegisterDto) ,  registerController)
authRouter.post('/login', ipRateLimiterMiddleware(limit, windowMs), validate(loginDto), loginController)
authRouter.get('/getme', authenticateToken, getMeController)



export default authRouter 