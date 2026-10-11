import mongoose from "mongoose";
import { DB_NAME } from "./constants";

async function connectDB() {
  try {
  } catch (error) {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`
    );

    console.error("MONGODB connection Failed : ", error);
    process.exit(1);
  }
}

export default connectDB;
