//require('dotenv').config({path :'./env'});   /// alternate way
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connect_DB from "./db/index.js";

dotenv.config({ path: "./env" });

connect_DB();
