import { body } from "express-validator";

const validateComment = () =>
  body("text")
    .isLength({ min: 10, max: 300 })
    .withMessage("comment must be between 10 and 300 characters");

export { validateComment };
