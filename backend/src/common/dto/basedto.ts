import joi from "joi";

class BaseDto{
    static Schema = joi.object({})

    
    static async validateAsync(data: any){
        try {
            const {error, value} = await this.Schema.validateAsync(data, {
                abortEarly: false,
                stripUnknown: true
            })

            return {error: null, value}
        } catch (error: any) {
            const err = await error.details.map((d: any) => d.message).join(", ")
            return {error, value: null}
        }
    }
}

export default BaseDto