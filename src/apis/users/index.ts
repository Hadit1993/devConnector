import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import {
  loginValidateEmail,
  loginValidatePassword,
} from "../../validation/users/login";

import {
  registerValidateName,
  registerValidateEmail,
  registerValidatePassword,
  registerValidateConfirmPassword,
} from "../../validation/users/register";
import deleteUser from "./deleteUser";
import login from "./login";
import register from "./register";

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

//@route   DELETE api/users
//@desc    delete the user and its profile
//access   private

usersRouter.delete("/", authMiddleware, deleteUser);

export default usersRouter;
