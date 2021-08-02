import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  cpValidateHandle,
  cpValidateSkills,
  cpValidateStatus,
  createProfile,
} from "./createProfile";
import getProfile from "./getProfile";

const profileRouter = Router();

//@route     api/profile
//@GET
//@desc    get current user profile
//access   private
//POST
//@desc create user profile
//access   private

profileRouter
  .route("/")
  .get(authMiddleware, getProfile)
  .post(
    authMiddleware,
    cpValidateHandle(),
    cpValidateStatus(),
    cpValidateSkills(),
    createProfile
  );

export default profileRouter;
