import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { UserModel } from "../../models/User";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import { parseValidationError } from "../../utils/customValidator";

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const error: { [key: string]: string } = {};
  let response: BaseResponse;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const parsedError = parseValidationError(errors.array());
      throw { error: parsedError };
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      error["email"] = "user not found";
      throw { statusCode: 404, error };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      error["password"] = "email and password do not match";
      throw { error };
    }

    const token = user.generateAuthToken();
    response = new BaseResponse({ data: { user, token } });

    res.json(response);
  } catch (error) {
    response = new BaseResponse({
      success: false,
      statusCode: error.statusCode || 400,
    });
    if (error.error) {
      response.error = error.error;
    } else {
      if (error.message) response.message = error.message;
    }

    res.status(error.statusCode || 400).json(response);
  }
}

const loginValidateEmail = () => {
  return body("email")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail();
};

const loginValidatePassword = () => {
  return body("password").not().isEmpty().withMessage("password is invalid");
};

export { login, loginValidateEmail, loginValidatePassword };
