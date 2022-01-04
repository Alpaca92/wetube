import express from "express";

const app = express();

app.get("/", (req, res) => res.send(`<h1>This is main page</h1>`));

app.listen(5000, () => console.log(`http://localhost:5000`));
