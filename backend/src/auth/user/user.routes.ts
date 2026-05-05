import { Router } from "express"
import { validate, validateVerifyQuery } from "../../common/middleware/validate.middleware.ts"
import RegisterDto from "./dto/register-dto"
import {  registerController, verifyEmailController } from "./user.contoller.ts"
import loginDto from "./dto/login-dto.ts"
import { login } from "./user.service.ts"
import ipRateLimiterMiddleware from "../../common/middleware/ipRateLimit.middleware.ts"


const authRouter = Router()
const limit = 5;
const windowMs = 5 * 60 * 1000;

authRouter.post("/register", ipRateLimiterMiddleware(limit, windowMs) ,validate(RegisterDto) ,  registerController)
authRouter.get('/verifyemail', validateVerifyQuery, verifyEmailController)
authRouter.get('/login', ipRateLimiterMiddleware(limit, windowMs),validate(loginDto), login)

export default authRouter 