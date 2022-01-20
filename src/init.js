import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

app.listen(5000, () => console.log(`http://localhost:5000`));
