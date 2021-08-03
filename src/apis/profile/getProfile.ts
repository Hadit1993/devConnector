import { Request, Response } from "express";
import { use } from "passport";
import BaseResponse from "../../models/BaseResponse";
import { ProfileModel } from "../../models/Profile";
import { getAuthenticatedUser } from "../../models/User";

export default async function getProfile(req: Request, res: Response) {
  const user = getAuthenticatedUser(req);
  let response: BaseResponse;

  try {
    const profile = await ProfileModel.findProfile({ user: user.id });
    if (!profile) {
      throw { statusCode: 404, message: "no profile found" };
    }

    response = new BaseResponse({ data: profile });
    res.json(response);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    response = new BaseResponse({
      success: false,
      statusCode,
    });

    if (error.message) {
      response.message = error.message;
    }

    res.status(statusCode).json(response);
  }
}
