import { ExtractJwt, Strategy } from "passport-jwt";
import { UserModel } from "../models/User";
import config from "./keys";

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey,
  },
  async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.id);
      if (user) return done(null, user);

      throw new Error("user not found");
    } catch (error) {
      console.log(error);
      return done(error, null);
    }
  }
);

export default strategy;
