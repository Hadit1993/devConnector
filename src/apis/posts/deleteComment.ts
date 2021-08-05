import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { Post } from "../../models/Post";
import { getAuthenticatedUser } from "../../models/User";

export default async function deleteComment(req: Request, res: Response) {
  let response: BaseResponse;

  try {
    const user = getAuthenticatedUser(req);
    const { comment_id, post_id } = req.params;

    const post = await Post.findById(post_id);
    if (!post) throw new Error("post not found");
    const commentIndex = post.comments.findIndex(
      (value) => (value as any).id.toString() === comment_id
    );

    if (commentIndex < 0) throw new Error("no comment found");
    if (post.comments[commentIndex].user.toString() !== user.id)
      throw { statusCode: 401, message: "not authorized to delete comment" };

    post.comments.splice(commentIndex, 1);
    const updatedPost = await post.save();
    response = new BaseResponse({
      data: updatedPost,
    });

    res.json(response);
  } catch (error) {
    const statusCode = error.statusCode || 404;
    response = new BaseResponse({ success: false, statusCode });
    if (error.message) response.message = error.message;
    res.status(statusCode).json(response);
  }
}
