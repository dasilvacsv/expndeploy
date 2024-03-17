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
// Configure CORS middleware
app.use(cors({
  origin: "https://expndeployfront.onrender.com" // Set the correct origin
}));


app.options("*", cors());

app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW ()");
    res.setHeader("Access-Control-Allow-Origin", "https://expndeployfront.onrender.com"); // Set the correct 'Access-Control-Allow-Origin' header
    res.status(200).json({ pong: result.rows[0].now });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
