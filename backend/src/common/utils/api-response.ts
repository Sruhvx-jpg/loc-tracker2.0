import {Response} from "express"

export class apiRes{
    static apiResPlate(res: Response, message: String,content: string | object,statusCode: number){
        return res.status(statusCode).json({
            success: true,
            message,
            content
        })
    }
}