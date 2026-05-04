import {Response} from "express"

class apiRes{
    static ok(res: Response, message: string, data: any){
        return res.status(200).json({
            success: true,
            message,
            data
        })
    }
}