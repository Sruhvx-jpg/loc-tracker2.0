import { NextFunction, Request, Response } from "express"
import apiErr  from "../utils/api-error"


const validate = (Dtoclass: any) => {
    return async (req: Request, _ : Response, next: NextFunction) => {
        const {error, value} = await Dtoclass.validateAsync(req.body, {
            abortEarly: false,
            stripUnknown: true,
        })

        if(error){
            const errMsg = error.details.map((e: any) => e.message)
            return next(apiErr.badReq(errMsg.join("; ")))
        }
        
        req.body = value
        next()
    }
}

export default validate