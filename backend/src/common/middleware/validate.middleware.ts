import { NextFunction, Request, Response } from "express"
import apiErr from "../utils/api-error"
 
export const validate = (DtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { errors, value } = DtoClass.validate(req.body);
 
    console.log("Validation errors:", errors);
    console.log("Validation value:", value);
    
    if (errors) {
      // Convert errors array to readable format
      const errorMessages = errors.map((err: any) => `${err.field}: ${err.message}`).join(", ");
      throw apiErr.badReq(errorMessages);
    }
    
    // Set the validated and cleaned body
    req.body = value;
    next();
  };
};
 