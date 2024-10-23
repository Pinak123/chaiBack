
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI1 = "mongodb://atlas-sql-6623bdb4261cc77a470e6ca2-v7mdt.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin"
const connect_DB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI 
    );
  
    console.log("Mongodb connected " + connectionInstance.connection.host);
  } catch (e) {
    console.log("Mongodb connection error", e);

    process.exit(1);
  }
};

export default connect_DB;
