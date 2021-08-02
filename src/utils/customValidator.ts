import { ValidationError } from "express-validator";

const parseValidationError = (errors: ValidationError[]) => {
  const parsedError: { [key: string]: string } = {};
  errors.forEach((error) => {
    parsedError[error.param] = error.msg;
  });

  return parsedError;
};

export { parseValidationError };
