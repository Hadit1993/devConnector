import { Request, Response } from "express";
import { validationResult } from "express-validator";
import BaseResponse from "../../models/BaseResponse";
import { Post } from "../../models/Post";
import { getAuthenticatedUser } from "../../models/User";
import { parseValidationError } from "../../utils/customValidator";

export default async function addComment(req: Request, res: Response) {
  let response: BaseResponse;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const parsedError = parseValidationError(errors.array());
      throw { error: parsedError };
    }
    const { post_id } = req.params;
    const user = getAuthenticatedUser(req);
    const post = await Post.findById(post_id);
    if (!post) throw new Error("no post found");
    const { text, name, avatar } = req.body;
    post.comments.unshift({
      user: user.id,
      text,
      name,
      avatar,
    });

    const updatedPost = await post.save();
    response = new BaseResponse({ data: updatedPost });
    res.json(response);
  } catch (error) {
    response = new BaseResponse({
      success: false,
      statusCode: 404,
    });
    if (error.error) response.error = error.error;
    if (error.message) response.message = error.message;

    res.status(404).json(response);
  }
}
