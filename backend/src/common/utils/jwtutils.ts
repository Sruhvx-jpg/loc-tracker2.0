import jwt, { SignOptions } from "jsonwebtoken"
import "dotenv/config"
import apiErr from "./api-error.ts"
import * as crypto from 'crypto';


const generateAccTok = (payload: string): string => {
    const secret = process.env.JWT_ACCESS_SECRET


    const options: SignOptions = {
        expiresIn: (process.env.JWT_ACCESS_TOKEN_EXPIRESIN || "15m") as SignOptions["expiresIn"],
    };

    //remove this later
    if (!secret) {
        throw apiErr.JWTsecNotFound("jwt secret not found")
    }

    return jwt.sign(payload, secret, options)
}

const verifyAccTok = (accToken: string): Object | string => {
    const secret = process.env.JWT_ACCESS_SECRET

    //remove this later
    if (!secret) {
        throw apiErr.JWTsecNotFound("jwt secret not found")
    }

    return jwt.verify(accToken, secret)
}

const generateRefTok = (payload: string): string => {
    const secret = process.env.JWT_REFRESH_SECRET

    const options: SignOptions = {
        expiresIn: (process.env.JWT_REFRESH_TOKEN_EXPIRESIN || "15m") as SignOptions["expiresIn"],
    };

    //remove this later
    if (!secret) {
        throw apiErr.JWTsecNotFound("jwt secret not found")
    }

    return jwt.sign(payload, secret,)
}

const generateResetTok = () => {
    const rawToken = crypto.randomBytes(32).toString("hex")
    const hashedTok = crypto.createHash("sha256").update(rawToken).digest("hex")

    return {rawToken, hashedTok}
}



export {
    generateAccTok,
    generateRefTok,
    generateResetTok
}