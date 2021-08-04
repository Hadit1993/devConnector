import { Request, Response } from "express";
import BaseResponse from "../../models/BaseResponse";
import { ProfileModel } from "../../models/Profile";
import { getAuthenticatedUser } from "../../models/User";

export default async function deleteUser(req: Request, res: Response) {
  let response: BaseResponse;

  try {
    const user = getAuthenticatedUser(req);
    await user.delete();
    await ProfileModel.findOneAndDelete({ user: user.id });
    response = new BaseResponse({});
    res.json(response);
  } catch (error) {
    response = new BaseResponse({ success: false, statusCode: 400 });
    res.status(400).json(response);
  }
}
