import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
  logout,
  getEdit,
  postEdit,
  see,
  getChangePassword,
  postChangePassword,
} from "../controllers/usersController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middleware/middlewares";

const userRouter = express.Router();

userRouter
  .route("/github/start")
  .all(publicOnlyMiddleware)
  .get(startGithubLogin);
userRouter
  .route("/github/finish")
  .all(publicOnlyMiddleware)
  .get(finishGithubLogin);
userRouter.route("/logout").all(protectorMiddleware).get(logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.route("/:id").get(see);

export default userRouter;
