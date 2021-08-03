import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { ProfileModel } from "../../models/Profile";

export default async function getAllProfiles(req: Request, res: Response) {
  let response: BaseResponse;
  try {
    const profiles = await ProfileModel.find().populate("user", [
      "name",
      "avatar",
    ]);

    response = new BaseResponse({ data: profiles });
    res.json(response);
  } catch (error) {
    response = new BaseResponse({ success: false, statusCode: 400 });
    if (error.message) response.message = error.message;
    res.status(400).json(response);
  }
}
