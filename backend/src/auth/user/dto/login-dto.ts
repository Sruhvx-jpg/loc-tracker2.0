import joi from "joi";
import BaseDto from "../../../common/dto/basedto.ts";

class loginDto extends BaseDto {
    static schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
    })
}

export default loginDto