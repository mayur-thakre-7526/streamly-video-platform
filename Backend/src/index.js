import MongoDB from "./db/db.connection.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

MongoDB();
