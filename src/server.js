import express from "express";
import session from "express-session";
import logger from "morgan";
import { localsMiddleware } from "./middleware/localMiddleware";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(logger("dev"));
app.use(
  session({
    secret: "secret string",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(localsMiddleware);
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
