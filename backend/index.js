import express from "express";
import cors from "cors";
import pg from "pg";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, FRONTEND_URL, PORT } from "./config.js";
import morgan from "morgan";

const pool = new pg.Pool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(morgan("dev"));
app.use(
  cors({
    origin: "https://expndeploy.onrender.com"
  })
);
app.options("*", cors());

app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW ()");
  res.send({
    pong: result.rows[0].now,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
