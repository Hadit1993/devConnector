import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { Post } from "../../models/Post";

export default async function getPosts(req: Request, res: Response) {
  let response: BaseResponse;
  try {
    const posts = await Post.find().sort({ date: -1 });
    response = new BaseResponse({ data: posts });
    res.json(response);
  } catch (error) {
    response = new BaseResponse({
      success: false,
      statusCode: 404,
      message: "no posts found",
    });

    res.status(404).json(response);
  }
}
