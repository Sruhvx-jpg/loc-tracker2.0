import { NextFunction, Request, Response } from "express"
import apiErr  from "../utils/api-error"


const validate = (Dtoclass: any) => {
    return (req: Request, _ : Response, next: NextFunction) => {
        const {error, value} = Dtoclass.validate(req.body)

        if(error){
            throw apiErr.badReq(error.join("; "))
        }
        
        req.body = value
        next()
    }
}

export default validate