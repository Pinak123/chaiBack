//require('dotenv').config({path :'./env'});   /// alternate way
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connect_DB from "./db/index.js";
import app from "./app.js";
dotenv.config({ path: "./env" });

connect_DB()
.then(()=> {
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log("Server listening on port " + process.env.PORT);
    });
})
.catch(err => {

});
