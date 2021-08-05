import { body } from "express-validator";

const validatePost = () =>
  body("text")
    .isLength({ min: 10, max: 300 })
    .withMessage("post must be between 10 and 300 characters");

export { validatePost };
