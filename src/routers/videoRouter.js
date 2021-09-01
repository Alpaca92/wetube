import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  upload,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id", watch);
videoRouter.route("/:id/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;
