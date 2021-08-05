import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { Post } from "../../models/Post";
import { getAuthenticatedUser } from "../../models/User";

export default async function deletePost(req: Request, res: Response) {
  let response: BaseResponse;

  try {
    const { post_id } = req.params;
    const user = getAuthenticatedUser(req);
    const post = await Post.findById(post_id);
    if (!post) throw new Error();
    if (post.user !== user.id)
      throw { statusCode: 401, message: "not authorized to delete the post" };
    await post.delete();
    response = new BaseResponse({ data: post });
    res.json(response);
  } catch (error) {
    const statusCode = error.statusCode || 404;
    const message = error.message || "no post found";
    response = new BaseResponse({
      success: false,
      statusCode,
      message,
    });

    res.status(statusCode).json(response);
  }
}
