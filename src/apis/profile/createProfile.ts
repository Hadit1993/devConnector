import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import BaseResponse from "../../models/BaseResponse";

import { ProfileModel } from "../../models/Profile";
import { getAuthenticatedUser } from "../../models/User";
import { parseValidationError } from "../../utils/customValidator";

async function createProfile(req: Request, res: Response) {
  let response: BaseResponse;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const parsedError = parseValidationError(errors.array());
      throw { error: parsedError };
    }

    const profileFields = generateProfile(req);
    const user = getAuthenticatedUser(req);

    const profile = await ProfileModel.findOneAndUpdate(
      {
        user: user.id,
      },
      { $set: profileFields },
      { new: true }
    );

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

    const newProfile = await new ProfileModel(profileFields).save();
    response = new BaseResponse({ data: newProfile });
    res.json(response);
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
    if (req.body[key])
      profile[key] =
        key === "skills" ? req.body[key].split(",") : req.body[key];
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
    if (req.body[key]) social[key] = req.body[key];
  });

  if (Object.keys(social).length > 0) profile.social = social;

  return profile;
};

const cpValidateHandle = () => {
  return body("handle")
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage("handle must be between 3 and 40 characters");
};

const cpValidateStatus = () => {
  return body("status")
    .trim()
    .not()
    .isEmpty()
    .withMessage("status is required");
};

const cpValidateSkills = () => {
  return body("skills")
    .trim()
    .not()
    .isEmpty()
    .withMessage("skills is required");
};

export { createProfile, cpValidateHandle, cpValidateStatus, cpValidateSkills };
