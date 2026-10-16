import connectDB from "./db/db.connection.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

// connectDB promise return karta hai

connectDB()
  .then(() => {
    // first Listening for errors
    app.on("error", (error) => {
      console.error("Error : ", error);
      throw error;
    });

    // creating Server
    const port = process.env.port || 8000;

    app.listen(port, () => {
      console.log(`Server is running on port, ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed !!!");
  });
