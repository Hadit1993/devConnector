import { Request, Response } from "express";
import { validationResult } from "express-validator";

import BaseResponse from "../../models/BaseResponse";
import { Post } from "../../models/Post";
import { ProfileModel } from "../../models/Profile";
import { getAuthenticatedUser } from "../../models/User";
import { parseValidationError } from "../../utils/customValidator";

export default async function createPost(req: Request, res: Response) {
  let response: BaseResponse;

  try {
    const user = getAuthenticatedUser(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const parsedError = parseValidationError(errors.array());
      throw { error: parsedError };
    }

    const { text, name, avatar } = req.body;
    const newPost = new Post({ text, name, avatar, user: user.id });
    const post = await newPost.save();
    response = new BaseResponse({ data: post });
    res.status(201).json(response);
  } catch (error) {
    response = new BaseResponse({ success: false, statusCode: 400 });
    if (error.error) response.error = error.error;
    if (error.message) response.message = error.message;
    res.status(400).json(response);
  }
}
