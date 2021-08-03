import { body } from "express-validator";

const loginValidateEmail = () => {
  return body("email")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail();
};

const loginValidatePassword = () => {
  return body("password").not().isEmpty().withMessage("password is invalid");
};

export { loginValidateEmail, loginValidatePassword };
