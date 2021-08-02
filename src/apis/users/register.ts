import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { UserModel } from "../../models/User";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { parseValidationError } from "../../utils/customValidator";

import { body, validationResult } from "express-validator";

async function register(req: Request, res: Response) {
  let response: BaseResponse;
  const { email, name, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const parsedError = parseValidationError(errors.array());
      throw { parsedError };
    }
    const avatar = gravatar.url(email.trim(), {
      size: "200",
      rating: "pg",
      default: "mm",
    });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      name,
      email,
      password: hash,
      avatar,
    });
    await newUser.save();

    const token = newUser.generateAuthToken();

    response = new BaseResponse({ data: { user: newUser, token } });
    res.json(response);
  } catch (error) {
    response = new BaseResponse({ success: false, statusCode: 400, error });
    if (error.parsedError) {
      response.error = error.parsedError;
    }

    if (error.message) {
      response.message = error.message;
    }

    res.status(400).json(response);
  }
}

const registerValidateName = () =>
  body("name")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("name must be between 2 and 30 characters");

const registerValidateEmail = () =>
  body("email")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) throw "email already in use";
    });

const registerValidatePassword = () =>
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters");

export {
  register,
  registerValidateName,
  registerValidateEmail,
  registerValidatePassword,
};
