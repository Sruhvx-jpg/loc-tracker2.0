import Joi from "joi";

class BaseDto {
  static schema = Joi.object({});

  static validate<T>(data: T) {
    const { error, value } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return { errors, value: null };
    }

    return { errors: null, value };
  }
}

export default BaseDto;