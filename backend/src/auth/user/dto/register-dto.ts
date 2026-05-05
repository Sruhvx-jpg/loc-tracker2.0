import Joi from "joi";
import BaseDto from "../../../common/dto/basedto.ts";
 
class RegisterDto extends BaseDto {
  static schema = Joi.object({
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9_.]+$/)
      .min(3)
      .max(50)
      .trim()
      .required(),
 
    email: Joi.string()
      .email()
      .trim()
      .required(),
 
    password: Joi.string()
      .min(6)
      .max(200)
      .required(),
  });
}
 
export default RegisterDto;
 
export type RegisterInput = {
  username: string;
  password: string;
  email: string;  // Changed from 'gmail' to match DTO
};
 