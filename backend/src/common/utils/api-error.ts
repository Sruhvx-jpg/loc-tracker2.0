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
        return new apiErr(409, message)
    }

    static userNameConflict(message = "User's name is already in use") {
        return new apiErr(409, message)
    }


    static illegalAccess(message = "email already exists") {
        return new apiErr(0, message)
    }

    static internalErr(message = "insert your error") {
        return new apiErr(0, message)
    }

    static emailAlreadyVerified(message = "Your email is already verified") {
        return new apiErr(0, message)
    }

    static invalidToken(message = "Your email is already verified") {
        return new apiErr(0, message)
    }

    static emailNotVerified(message = "email is not verified,please verify the email first"){
        return new apiErr(0, message)
    }

    static invalidCredentials(message = "invalid credentials"){
        return new apiErr(0, message)
    }

    static toManyEmailVerReq(message = "to many verification request"){
        return new apiErr(0, message)
    }

    static NotFound(message = " not found"){
        throw new apiErr(404, message)
    }
}

export default apiErr