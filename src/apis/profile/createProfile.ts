import { Request, Response } from "express";
import { validationResult } from "express-validator";
import BaseResponse from "../../models/BaseResponse";

import { ProfileModel } from "../../models/Profile";
import { getAuthenticatedUser } from "../../models/User";
import { parseValidationError, removeEmpty } from "../../utils/customValidator";

export default async function createProfile(req: Request, res: Response) {
  let response: BaseResponse;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const parsedError = parseValidationError(errors.array());
      throw { error: parsedError };
    }

    const profileFields = generateProfile(req);

    const user = getAuthenticatedUser(req);

    const profile = await ProfileModel.findByIdAndUpdate(
      {
        user: user.id,
      },
      profileFields,
      { new: true }
    ).populate("user", ["name", "avatar"]);

    if (profile) {
      response = new BaseResponse({ data: profile });
      return res.json(response);
    }

    const existingProfile = await ProfileModel.findOne({
      handle: profileFields.handle,
    });

    if (existingProfile) {
      throw { error: { handle: "handle already exists" } };
    }

    const newProfile = await new ProfileModel(
      removeEmpty(profileFields)
    ).save();
    const populatedProfile = await newProfile
      .populate({ path: "user", select: ["name", "avatar"] })
      .execPopulate();
    response = new BaseResponse({
      data: populatedProfile,
      statusCode: 201,
    });
    res.status(201).json(response);
  } catch (error) {
    response = new BaseResponse({ success: false, statusCode: 400 });
    if (error.error) response.error = error.error;
    if (error.message) response.message = error.message;
    res.status(400).json(response);
  }
}

const generateProfile = (req: Request) => {
  const user = getAuthenticatedUser(req);
  const profile: { [key: string]: any } = {};

  profile.user = user.id;
  const mainKeys = [
    "handle",
    "status",
    "skills",
    "company",
    "website",
    "location",
    "bio",
    "githubUsername",
  ];

  mainKeys.forEach((key) => {
    profile[key] = key === "skills" ? req.body[key].split(",") : req.body[key];
  });

  const social: { [key: string]: string } = {};
  const socialKeys = [
    "youtube",
    "facebook",
    "linkedin",
    "instagram",
    "twitter",
  ];

  socialKeys.forEach((key) => {
    social[key] = req.body[key];
  });

  profile.social = social;

  return removeEmpty(profile);
};
