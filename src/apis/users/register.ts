import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { UserModel } from "../../models/User";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { parseValidationError } from "../../utils/customValidator";

import { validationResult } from "express-validator";

export default async function register(req: Request, res: Response) {
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
    res.status(201).json(response);
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
