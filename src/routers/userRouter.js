import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
  remove,
  edit,
  see,
  logout,
} from "../controllers/usersController";

const userRouter = express.Router();

userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.get("/:id", see);

export default userRouter;
