import { Request, Response } from "express";
import { Document } from "mongoose";

import BaseResponse from "../../models/BaseResponse";
import { ProfileModel } from "../../models/Profile";
import { getAuthenticatedUser } from "../../models/User";

export default async function deleteExperience(req: Request, res: Response) {
  let response: BaseResponse;

  try {
    const { exp_id } = req.params;
    const user = getAuthenticatedUser(req);
    const profile = await ProfileModel.findOne({ user: user.id });
    if (!profile) throw { statusCode: 404, message: "no profile found" };
    const removeIndex = profile.experience.findIndex(
      (val) => val.id === exp_id
    );
    if (removeIndex < 0)
      throw {
        statusCode: 404,
        message: "no experience found",
      };
    profile.experience.splice(removeIndex, 1);
    const updatedProfile = await profile.save();
    const finalProfile = await updatedProfile
      .populate({ path: "user", select: ["name", "avatar"] })
      .execPopulate();
    response = new BaseResponse({ data: finalProfile });
    res.json(response);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    response = new BaseResponse({ success: false, statusCode });
    if (error.message) response.message = error.message;
    res.status(statusCode).json(response);
  }
}
