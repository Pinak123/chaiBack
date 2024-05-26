
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI1 = "mongodb+srv://pinakss7:SAMARTHA@cluster0.vcojfb2.mongodb.net?retryWrites=true&w=majority&appName=Cluster0"
const connect_DB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
  
    console.log("Mongodb connected");
  } catch (e) {
    console.log("Mongodb connection error", e);

    process.exit(1);
  }
};

export default connect_DB;
