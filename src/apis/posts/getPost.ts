import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { Post } from "../../models/Post";

export default async function getPost(req: Request, res: Response) {
  let response: BaseResponse;
  try {
    const { post_id } = req.params;
    const post = await Post.findById(post_id);
    if (!post) throw new Error();
    response = new BaseResponse({ data: post });
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
