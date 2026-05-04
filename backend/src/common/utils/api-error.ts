class apiErr extends Error {
    statusCode: number
    isOperational: boolean
    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
    }


    static unauthorized(message = "unknow error") {
        return new apiErr(0, message)
    }

    static unknownErr(message = "unknow error") {
        return new apiErr(0, message)
    }

    static badReq(message = "bad request") {
        return new apiErr(0, message)
    }

    static JWTsecNotFound(message = "jwt secret not found") {
        return new apiErr(0, message)
    }

    static emailConflict(message = "email already exists") {
        return new apiErr(0, message)
    }

    static illegalAccess(message = "email already exists") {
        return new apiErr(0, message)
    }

    static internalErr(message = "insert your error"){
        return new apiErr(0, message)
    }
}

export default apiErr