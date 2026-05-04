import { Types } from "mongoose"
import { sendVerificationEmail } from "../../common/service/nodemailer.ts"
import apiErr from "../../common/utils/api-error.ts"
import { generateResetTok, generateAccTok, generateRefTok } from "../../common/utils/jwtutils"
import mongoUser from "../../Database/userModel.ts"
import { RegisterInput } from "./types/register.typ.ts"
import crypto from "crypto"



const register = async ({ username, gmail, password }: RegisterInput) => {
    const existing = await mongoUser.findOne({
        $or:
            [
                { username: username },
                { "email.address": gmail }
            ]
    })

    if (existing) {
        throw apiErr.emailConflict("user name or email is aready in use")
    }

    const { rawToken, hashedTok } = generateResetTok()

    const user = await mongoUser.create({
        username,
        password,
        email: {
            address: gmail,
            validated: false,
        },
        resToken: hashedTok,
    })

    try {
        await sendVerificationEmail(
            user.email.address,
            user.username,
            rawToken
        );
    } catch (err) {
        await mongoUser.findByIdAndDelete(user._id);
        throw apiErr.internalErr("Failed to send verification email")
    }

    return {
        message: "User registered. Please verify your email.",
    };
}

const verifyEmail = async (token: string) => {
    if (!token) {
        throw apiErr.badReq("Invalid token")
    }



    const hashedTok = crypto.createHash("sha256").update(token).digest("hex")

    const user = await mongoUser.findOne({ resToken: hashedTok })

    if (!user) {
        throw apiErr.badReq("Token invalid or expired")
    }

    if (user.email.validated) {
        throw apiErr.badReq("Email already verified")
    }


    user.email.validated = true
    user.resToken = undefined


    const accessToken = generateAccTok(user._id.toString())
    const refreshToken = generateRefTok(user._id.toString())

    user.refToken = refreshToken
    await user.save();

    return {
        message: "Email verified successfully",
        accessToken,
        refreshToken
    }
}

const login = async (email: string, password: string) => {
    const user = await mongoUser.findOne({ "email.address": email })

    if (!user) {
        throw apiErr.unauthorized("Invalid credentials")
    }

    if (!user.email.validated) {
        throw apiErr.unauthorized("Please verify your email first")
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        throw apiErr.unauthorized("Invalid credentials")
    }

    const accessToken = generateAccTok(user._id.toString())
    const refreshToken = generateRefTok(user._id.toString())

    user.refToken = refreshToken
    await user.save()

    return {
        message: "Login successful",
        accessToken,
        refreshToken,
    }
}

export {register, verifyEmail, login}