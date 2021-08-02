import { NextFunction, Request, Response } from "express";
import passport from "passport";
import BaseResponse from "../../models/BaseResponse";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate("jwt", { session: false }, (_, user, __) => {
    if (user) {
      req.user = user;
      return next();
    }

    const response = new BaseResponse({
      success: false,
      statusCode: 401,
      message: "authentication failed",
    });

    res.status(401).json(response);
  })(req, res, next);
}
