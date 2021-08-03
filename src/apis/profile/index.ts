import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import { addExValidateField } from "../../validation/profile/addExperience";
import {
  cpValidateHandle,
  cpValidateStatus,
  cpValidateSkills,
  cpValidateUrl,
} from "../../validation/profile/createProfile";
import addEducation from "./addEducation";
import addExperience from "./addExperience";
import createProfile from "./createProfile";
import getAllProfiles from "./getAllProfiles";

import getProfile from "./getProfile";
import getProfileByHandle from "./getProfileByHandle";
import getProfileByUserId from "./getProfileByUserId";

const profileRouter = Router();

//@route     api/profile
//@GET
//@desc    get current user profile
//access   private
//POST
//@desc create/update user profile
//access   private

profileRouter
  .route("/")
  .get(authMiddleware, getProfile)
  .post(
    authMiddleware,
    cpValidateHandle(),
    cpValidateStatus(),
    cpValidateSkills(),
    cpValidateUrl("youtube"),
    cpValidateUrl("facebook"),
    cpValidateUrl("linkedin"),
    cpValidateUrl("instagram"),
    cpValidateUrl("twitter"),
    createProfile
  );

//@route   GET api/profile/handle/:handle
//@desc    get current user profile by handle
//access   public

profileRouter.get("/handle/:handle", getProfileByHandle);

//@route   GET api/profile/user/:user_id
//@desc    get current user profile by user id
//access   public

profileRouter.get("/user/:user_id", getProfileByUserId);

//@route   GET api/profile/all
//@desc    get all profiles
//access   public

profileRouter.get("/all", getAllProfiles);

profileRouter.post("");

//@route   POST api/profile/experience
//@desc    add experience to profile
//access   private

profileRouter.post(
  "/experience",
  authMiddleware,
  addExValidateField("title"),
  addExValidateField("company"),
  addExValidateField("from"),
  addExperience
);

//@route   POST api/profile/education
//@desc    add education to profile
//access   private

profileRouter.post(
  "/education",
  authMiddleware,
  addExValidateField("school"),
  addExValidateField("degree"),
  addExValidateField("fieldOfStudy"),
  addExValidateField("from"),
  addEducation
);

export default profileRouter;
