import { Request, Response } from "express";
import { validationResult } from "express-validator";
import BaseResponse from "../../models/BaseResponse";
import { ProfileModel } from "../../models/Profile";
import { getAuthenticatedUser } from "../../models/User";
import { parseValidationError, removeEmpty } from "../../utils/customValidator";

export default async function addEducation(req: Request, res: Response) {
  let response: BaseResponse;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const parsedError = parseValidationError(errors.array());
      throw { error: parsedError };
    }
    const user = getAuthenticatedUser(req);
    const profile = await ProfileModel.findProfile({ user: user.id });
    if (!profile) throw { statusCode: 404, message: "no profile found" };
    const education = generateEducation(req);
    profile.education.unshift(education);

    const updatedProfile = await profile.save();
    response = new BaseResponse({ data: updatedProfile });
    res.json(response);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    response = new BaseResponse({ success: false, statusCode });
    if (error.error) response.error = error.error;
    if (error.message) response.message = error.message;

    res.status(statusCode).json(response);
  }
}

const generateEducation = (req: Request) => {
  const education: { [key: string]: any } = {};
  const keys = [
    "school",
    "degree",
    "fieldOfStudy",
    "from",
    "to",
    "current",
    "description",
  ];

  keys.forEach((key) => {
    education[key] = req.body[key];
  });

  return removeEmpty(education);
};
