import express from "express";
import bodyParser from "body-parser";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import fs from "fs";

console.log("cwd:", process.cwd());
console.log("env exists:", fs.existsSync(".env"));

const app = express();
const port = 3000;

dotenv.config();

console.log("Current directory:", process.cwd());

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { loginError: false });
});

app.get('/guest', (req, res) => {
res.redirect('/game');
});

app.get("/game", (req, res) => {
  res.render("game");
});

app.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send("The passwors don´t match");
  }

  try {
    const existingUser = await db.query(
      "SELECT * FROM userdata WHERE username = $1",
      [username],
    );

    if (existingUser.rows.length > 0) {
      return res.send("Username already exists");
    }
    await db.query(
      "INSERT INTO userdata (username, password) VALUES ($1, $2)",
      [username, password],
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("User registration failed.");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await db.query(
    "SELECT * FROM userdata WHERE username=$1 AND password=$2",
    [username, password],
  );

  if (result.rows.length > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Incorrect Login" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
