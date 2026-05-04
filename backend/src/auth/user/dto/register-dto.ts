import Joi from "joi";
import BaseDto from "../../../common/dto/basedto.ts";

class registerDto extends BaseDto {
    static schema = Joi.object({
        user: Joi.string().alphanum().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(1).max(200).required()
    })
}

export default registerDto