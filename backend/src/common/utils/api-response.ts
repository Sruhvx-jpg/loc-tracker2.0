import {Response} from "express"

export class apiRes{
    static apiResPlate(res: Response, message: String){
        return res.json({
            success: true,
            message,
           
        })

    }

    static registerApiRes(res: Response, message: string,payload: any){
        return res.json({
            message,
            payload
        })
    }

    static created(message : String , payload: any){
        return {
            status: 200,
           message , 
           payload,
        }
    }

    static success(res: Response ,message: String, payload: any){
        return res.json({
            status: 200,
            message,
            payload
        })
    }
}