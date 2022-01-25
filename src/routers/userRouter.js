import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
  logout,
  getEdit,
  postEdit,
  see,
} from "../controllers/usersController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
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
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);

userRouter.route("/:id").get(see);

export default userRouter;
