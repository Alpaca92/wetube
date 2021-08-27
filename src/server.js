import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 5000;
const app = express();

const logger = morgan("dev");
app.use(logger);

app.set("views", "./src/views");
app.set("view engine", "pug");
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, () =>
  console.log(`server listening on port http://localhost:${PORT}`)
);
