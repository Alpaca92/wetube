import mongoose from "mongoose";

const URL = `mongodb://127.0.0.1:27017`;

mongoose.connect(`${URL}/wetube`);

mongoose.connection.on("error", (error) => console.log(`DB Error: ${error}`));
mongoose.connection.once("open", () => console.log("Connected to DB ✔"));
