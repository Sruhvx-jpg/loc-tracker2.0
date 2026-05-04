import { Router } from "express"
import validate from "../../common/middleware/validate.middleware.ts"
import registerDto from "./dto/register-dto"
import { getMeController, loginController, registerController, verifyController } from "./user.contoller.ts"
import loginDto from "./dto/login-dto.ts"
import authenticate from "./user.middleware.ts"

const authRouter = Router()

authRouter .post("/register",validate(registerDto), registerController)
authRouter .post("/login",validate(loginDto), loginController)

authRouter .get("/verifyEmail", verifyController)
authRouter .get("/getMe", authenticate, getMeController)

export default authRouter 