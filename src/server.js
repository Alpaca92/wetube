import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "hello",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((err, sessions) => {
    console.log(sessions);
    next();
  });
});

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
