import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { Post } from "../../models/Post";
import { getAuthenticatedUser } from "../../models/User";

export default async function dislikePost(req: Request, res: Response) {
  let response: BaseResponse;
  try {
    const { post_id } = req.params;
    const user = getAuthenticatedUser(req);
    const post = await Post.findById(post_id);
    if (!post) throw new Error();
    const userLikeIndex = post.likes.findIndex(
      (like) => like.user.toString() === user.id
    );

    if (userLikeIndex >= 0) post.likes.splice(userLikeIndex, 1);

    const userDislikeIndex = post.dislikes.findIndex(
      (dislike) => dislike.user.toString() === user.id
    );

    if (userDislikeIndex >= 0) {
      post.dislikes.splice(userDislikeIndex, 1);
    } else {
      post.dislikes.push({ user: user.id });
    }

    const updatedPost = await post.save();
    response = new BaseResponse({ data: updatedPost });
    res.json(response);
  } catch (error) {
    response = new BaseResponse({
      success: false,
      statusCode: 404,
      message: "no post found",
    });

    res.status(404).json(response);
  }
}
