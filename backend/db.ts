import {Pool} from "pg";
import {config} from "dotenv";
config();

const pool = new Pool({
  user: "postgres",
  host: process.env.HOST || "localhost",
  database: "collections",
  password: "qwerty",
  port: 5432,
});

export default pool;
