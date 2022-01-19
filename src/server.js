import express from "express";
import logger from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(logger("dev"));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: true }));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
