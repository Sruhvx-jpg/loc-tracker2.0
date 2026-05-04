import joi from "joi";
import BaseDto from "../../../common/dto/basedto.ts";

class loginDto extends BaseDto {
    static Schema = joi.object({
        email: joi.string(),
        password: joi.string(),
    })
}

export default loginDto