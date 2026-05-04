class apiErr extends Error{
    statusCode:number
    isOperational: boolean
    constructor(statusCode:number, message: string){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
    }
    
    static unknownErr(message = "unknow error"){
        return new apiErr(0,message)
    }
}