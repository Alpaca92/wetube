import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`server listening on port http://localhost:${PORT}`)
);
