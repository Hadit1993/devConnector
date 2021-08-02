import { Router } from "express";
import passport from "passport";
import BaseResponse from "../../models/BaseResponse";
import { getAuthenticatedUser } from "../../models/User";
import authMiddleware from "../middlewares/authMiddleware";

import { login, loginValidateEmail, loginValidatePassword } from "./login";

import {
  register,
  registerValidateConfirmPassword,
  registerValidateEmail,
  registerValidateName,
  registerValidatePassword,
} from "./register";

const usersRouter = Router();

//@route   POST api/users/register
//@desc    register user
//access   public

usersRouter.post(
  "/register",
  registerValidateName(),
  registerValidateEmail(),
  registerValidatePassword(),
  registerValidateConfirmPassword(),
  register
);

//@route   POST api/users/login
//@desc    login user / returning the JWT token
//access   public

usersRouter.post(
  "/login",
  loginValidateEmail(),
  loginValidatePassword(),
  login
);

export default usersRouter;
