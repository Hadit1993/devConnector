import { body } from "express-validator";
import { UserModel } from "../../models/User";

const registerValidateName = () =>
  body("name")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("name must be between 3 and 30 characters");

const registerValidateEmail = () =>
  body("email")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) throw "email already in use";

      return true;
    });

const registerValidatePassword = () =>
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters");

const registerValidateConfirmPassword = () =>
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      const { password } = req.body;
      if (value !== password)
        throw "password confirmation does not match password";

      return true;
    });

export {
  registerValidateName,
  registerValidateEmail,
  registerValidatePassword,
  registerValidateConfirmPassword,
};
