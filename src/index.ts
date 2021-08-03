import express from "express";
import mongoose from "mongoose";
import postsRouter from "./apis/posts";
import profileRouter from "./apis/profile";
import usersRouter from "./apis/users";
import config from "./config/keys";
import BaseResponse from "./models/BaseResponse";
import passport from "passport";
import strategy from "./config/jwtStrategy";

const app = express();

const port = process.env.PORT;

mongoose
  .connect(config.mongoDbUri!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log(error));

app.use(passport.initialize());
passport.use(strategy);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", usersRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postsRouter);

app.get("/", (req, res) => {
  res.json(new BaseResponse({ data: "hello", success: false }));
});

app.listen(port, () => {
  console.log("server running on port ", port);
});
