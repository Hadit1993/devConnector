import { Document, model, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/keys";
import { Request } from "express";

interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  date?: Date;
}

interface IUser extends User {
  generateAuthToken(): string;
}

const UserSchema = new Schema<User, Model<User>, User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
  },

  date: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;

  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    date: user.date,
  };
  return jwt.sign(payload, config.secretKey!, { expiresIn: 3600 });
};

UserSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();
  delete (userObj as any).password;
  delete userObj.__v;

  return userObj;
};

const UserModel = model<IUser>("User", UserSchema);

const getAuthenticatedUser = (req: Request) => {
  return req.user as IUser & Document<any, any, IUser>;
};

export { UserModel, getAuthenticatedUser, User };
