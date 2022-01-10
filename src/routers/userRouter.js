import express from "express";
import { remove, edit } from "../controllers/usersController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);

export default userRouter;
