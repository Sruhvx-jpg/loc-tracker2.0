import { NextFunction, Response, Request} from "express";
import { apiRes } from "../utils/api-response";

const store: Record<string, {reqCount: number; reqOriginTime: number}> = {}

const ipRateLimiterMiddleware =  (limit: number, windowMS: number) => {
    return (req:Request, res: Response, next: NextFunction) => {
        console.log("ip rate limiter middleware activited")
        const ip = req.ip as string
        const now = Date.now()

        if(!store[ip]){
            store[ip] = {reqCount: 1, reqOriginTime: now }
            return next()
        }

        const diff =  now - store[ip].reqOriginTime

        if(diff > windowMS){
            store[ip] = {reqCount: 1,reqOriginTime:now}
            return next()
        }
        store[ip].reqCount++

        if(store[ip].reqCount > limit){
            return apiRes.toManyReq(res ,"to many request, please try again later")
        }
    

        next()
    }
}

export default ipRateLimiterMiddleware