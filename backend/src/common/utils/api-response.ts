import {Response} from "express"

export class apiRes{
    static apiResPlate(res: Response, message: String){
        return res.json({
            success: true,
            message,
           
        })

    }
    static created(message : String , payload: any){
        return {
            status: 200,
           message , 
           payload
        }
    }
}