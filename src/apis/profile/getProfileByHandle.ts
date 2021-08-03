import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { ProfileModel } from "../../models/Profile";

export default async function getProfileByHandle(req: Request, res: Response) {
  let response: BaseResponse;

  try {
    const { handle } = req.params;
    const profile = await ProfileModel.findProfile({ handle });
    if (!profile)
      throw { statusCode: 404, message: "no profile found for this handle" };

    response = new BaseResponse({ data: profile });
    res.json(response);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    response = new BaseResponse({ success: false, statusCode });
    if (error.message) response.message = error.message;

    res.status(statusCode).json(response);
  }
}
