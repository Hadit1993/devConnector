import { body } from "express-validator";

const addExValidateField = (field: string) =>
  body(field).trim().not().isEmpty().withMessage(`${field} is required`);

export { addExValidateField };
