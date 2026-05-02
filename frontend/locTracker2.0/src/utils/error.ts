class ErrorUtil extends Error {
    statusCode: number
    isOperational: boolean
    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
    }

    static navigatorNotFOund(message = "Geolocation supported unuavailable on client side") {
        return new ErrorUtil(404, message)
    }

    static permDenied(message = "Geolocation supported unuavailable on client side") {
        return new ErrorUtil(403, message)
    }
}

export default ErrorUtil