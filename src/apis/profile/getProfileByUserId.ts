import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { ProfileModel } from "../../models/Profile";

export default async function getProfileByUserId(req: Request, res: Response) {
  let response: BaseResponse;

  try {
    const { user_id } = req.params;
    const profile = await ProfileModel.findProfile({ user: user_id });
    if (!profile)
      throw { statusCode: 404, message: "no profile found for this user id" };

    response = new BaseResponse({ data: profile });
    res.json(response);
  } catch (error) {
    response = new BaseResponse({
      success: false,
      statusCode: 404,
      message: "no profile found for this user id",
    });

    res.status(404).json(response);
  }
}
